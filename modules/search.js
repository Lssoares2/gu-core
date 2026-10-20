
/**
 * GU Global Search v8.0
 * General Unlocking GSM
 * Usa exclusivamente a barra #globalCyberSearch.
 */
(function () {
    "use strict";

    if (window.GU_SEARCH_V8_LOADED) return;
    window.GU_SEARCH_V8_LOADED = true;

    const PREFIX = "[GU-Search]";
    const ROUTES = [
        { url: "/imei/service", category: "IMEI" },
        { url: "/server/service", category: "Servidor" },
        { url: "/remote/service", category: "Remoto" }
    ];

    const PRODUCT_PREFIX = "/service/";
    const MAX_RESULTS = 15;

    let input = null;
    let panel = null;
    let products = [];
    let timer = null;
    let activeIndex = -1;
    let requestStarted = false;

    const normalize = value => String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

    function log(...args) {
        if (window.GU?.flags?.debugMode !== false) {
            console.log(PREFIX, ...args);
        }
    }

    function getName(item) {
        if (typeof item === "string") return item;

        return [
            item?.title,
            item?.name,
            item?.product,
            item?.service,
            item?.category,
            ...(Array.isArray(item?.aliases) ? item.aliases : []),
            ...(Array.isArray(item?.keywords) ? item.keywords : [])
        ].filter(Boolean).join(" ").trim();
    }

    function addProduct(item) {
        if (!item || !item.name) return;

        const name = String(item.name).replace(/\s+/g, " ").trim();
        if (name.length < 2) return;

        const url = item.url || "";
        const key = normalize(name) + "|" + url;

        if (products.some(p => p.key === key)) return;

        products.push({
            key,
            name,
            url,
            category: item.category || "Serviço",
            keywords: item.keywords || "",
            description: item.description || ""
        });
    }

    function importStaticCatalog() {
        const catalog = Array.isArray(window.GLOBAL_PRODUCTS_DATABASE)
            ? window.GLOBAL_PRODUCTS_DATABASE
            : Array.isArray(window.GU_SEARCH_CATALOG)
                ? window.GU_SEARCH_CATALOG
                : [];

        catalog.forEach(item => {
            const name = getName(item);
            if (!name) return;

            let url = typeof item === "object"
                ? (item.url || item.href || item.link || "")
                : "";

            if (url && !/^https?:\/\//i.test(url)) {
                url = new URL(url, location.origin).href;
            }

            addProduct({
                name,
                url,
                category: item?.category || "Catálogo",
                keywords: item?.keywords || "",
                description: item?.description || ""
            });
        });
    }

    function isProductUrl(url) {
        try {
            const parsed = new URL(url, location.origin);

            return parsed.origin === location.origin &&
                parsed.pathname.startsWith(PRODUCT_PREFIX);
        } catch (_) {
            return false;
        }
    }

    function importLinks(root, category) {
        root.querySelectorAll("a[href]").forEach(link => {
            const href = link.href;
            const name = (link.innerText || link.textContent || "")
                .replace(/\s+/g, " ")
                .trim();

            if (!name || !isProductUrl(href)) return;

            addProduct({
                name,
                url: href,
                category
            });
        });
    }

    function importCurrentPage() {
        importLinks(document, categoryFromPath(location.pathname));

        // Importa também produtos em tabelas e cartões que tenham links
        // para a rota individual /service/...
        document.querySelectorAll("tr, .card, [class*='service'], [class*='product']")
            .forEach(container => {
                const link = container.querySelector("a[href]");
                if (!link || !isProductUrl(link.href)) return;

                const name = (link.innerText || link.textContent || "")
                    .replace(/\s+/g, " ")
                    .trim();

                if (name) {
                    addProduct({
                        name,
                        url: link.href,
                        category: categoryFromPath(location.pathname)
                    });
                }
            });
    }

    function categoryFromPath(path) {
        if (path.startsWith("/imei/")) return "IMEI";
        if (path.startsWith("/remote/")) return "Remoto";
        if (path.startsWith("/server/")) return "Servidor";
        return "Serviço";
    }

    function importHTML(html, category) {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const before = products.length;

        importLinks(doc, category);

        // Algumas páginas apresentam os produtos em tabelas sem cartões.
        doc.querySelectorAll("tr, .card, [class*='service'], [class*='product']")
            .forEach(container => {
                const link = container.querySelector("a[href]");
                if (!link) return;

                const href = new URL(link.getAttribute("href"), location.origin).href;
                if (!isProductUrl(href)) return;

                const name = (link.innerText || link.textContent || "")
                    .replace(/\s+/g, " ")
                    .trim();

                if (name) addProduct({ name, url: href, category });
            });

        return products.length - before;
    }

    async function loadRoutes() {
        if (requestStarted) return;
        requestStarted = true;

        const results = await Promise.allSettled(
            ROUTES.map(async route => {
                const response = await fetch(route.url, {
                    credentials: "same-origin",
                    headers: { "Accept": "text/html" }
                });

                if (!response.ok) {
                    throw new Error("HTTP " + response.status);
                }

                const html = await response.text();
                const count = importHTML(html, route.category);

                log(route.url, "-", count, "produtos identificados");
            })
        );

        results.forEach((result, index) => {
            if (result.status === "rejected") {
                console.warn(
                    PREFIX,
                    "Falha ao ler " + ROUTES[index].url,
                    result.reason
                );
            }
        });

        log("Total de itens indexados:", products.length);

        if (input && input.value.trim()) {
            render(input.value);
        }
    }

    function ensurePanel() {
        if (panel) return;

        panel = document.createElement("div");
        panel.id = "gu-global-search-results";
        panel.setAttribute("role", "listbox");

        Object.assign(panel.style, {
            position: "fixed",
            display: "none",
            zIndex: "2147483647",
            overflowY: "auto",
            maxHeight: "380px",
            background: "#101714",
            color: "#ffffff",
            border: "1px solid #00ff66",
            borderRadius: "8px",
            boxShadow: "0 8px 28px rgba(0,0,0,.45)",
            fontFamily: "inherit",
            fontSize: "14px"
        });

        document.body.appendChild(panel);
    }

    function positionPanel() {
        if (!input || !panel) return;

        const rect = input.getBoundingClientRect();

        Object.assign(panel.style, {
            left: Math.max(4, rect.left) + "px",
            top: Math.min(rect.bottom + 5, window.innerHeight - 60) + "px",
            width: Math.min(rect.width, window.innerWidth - 8) + "px"
        });
    }

    function search(query) {
        const q = normalize(query);
        if (!q) return [];

        const terms = q.split(/\s+/);

        return products.map(product => {
            const name = normalize(product.name);
            const all = normalize([
                product.name,
                product.category,
                product.keywords,
                product.description
            ].join(" "));

            const matched = terms.filter(term => all.includes(term)).length;
            if (matched !== terms.length) return null;

            let score = matched * 10;

            if (name === q) score += 100;
            if (name.startsWith(q)) score += 50;
            if (name.includes(q)) score += 25;

            return { ...product, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_RESULTS);
    }

    function render(query) {
        ensurePanel();
        panel.replaceChildren();
        activeIndex = -1;

        if (!query.trim()) {
            panel.style.display = "none";
            return;
        }

        const results = search(query);
        positionPanel();
        panel.style.display = "block";

        if (!results.length) {
            const message = document.createElement("div");

            message.textContent = products.length
                ? "Nenhum produto correspondente encontrado."
                : "Nenhum produto foi carregado. Verifique o catálogo e as requisições.";

            message.style.padding = "14px";
            panel.appendChild(message);
            return;
        }

        results.forEach((product, index) => {
            const item = document.createElement("a");

            item.href = product.url || "#";
            item.setAttribute("role", "option");

            Object.assign(item.style, {
                display: "block",
                padding: "11px 14px",
                color: "#ffffff",
                textDecoration: "none",
                borderBottom: "1px solid #26352b"
            });

            const name = document.createElement("div");
            name.textContent = product.name;
            name.style.fontWeight = "600";

            const category = document.createElement("small");
            category.textContent = product.category;
            category.style.color = "#00ff66";

            item.append(name, category);

            item.addEventListener("mouseenter", () => {
                activeIndex = index;
                highlight();
            });

            item.addEventListener("click", event => {
                if (!product.url) {
                    event.preventDefault();
                    return;
                }

                panel.style.display = "none";
            });

            panel.appendChild(item);
        });
    }

    function highlight() {
        if (!panel) return;

        [...panel.children].forEach((item, index) => {
            item.style.background = index === activeIndex
                ? "#183c27"
                : "transparent";
        });
    }

    function connect() {
        if (window.GU?.flags?.globalSearch === false) return false;

        // Usa o ID confirmado pelo Console, sem selecionar #search-input.
        const found = document.getElementById("globalCyberSearch");

        if (!(found instanceof HTMLInputElement)) return false;

        if (found.dataset.guSearchV8 === "true") return true;

        input = found;
        input.dataset.guSearchV8 = "true";

        ensurePanel();

        input.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => render(input.value), 100);
        });

        input.addEventListener("focus", () => {
            if (input.value.trim()) render(input.value);
        });

        input.addEventListener("keydown", event => {
            if (!panel || panel.style.display === "none") return;

            const items = [...panel.querySelectorAll("a[href]")];

            if (event.key === "ArrowDown" && items.length) {
                event.preventDefault();
                activeIndex = Math.min(activeIndex + 1, items.length - 1);
                highlight();
            } else if (event.key === "ArrowUp" && items.length) {
                event.preventDefault();
                activeIndex = Math.max(0, activeIndex - 1);
                highlight();
            } else if (event.key === "Enter" && items.length) {
                event.preventDefault();

                const chosen = items[activeIndex >= 0 ? activeIndex : 0];
                if (chosen?.href && chosen.getAttribute("href") !== "#") {
                    location.href = chosen.href;
                }
            } else if (event.key === "Escape") {
                panel.style.display = "none";
            }
        });

        document.addEventListener("click", event => {
            if (event.target !== input && !panel.contains(event.target)) {
                panel.style.display = "none";
            }
        });

        window.addEventListener("resize", positionPanel);
        window.addEventListener("scroll", positionPanel, true);

        log("Barra #globalCyberSearch conectada.");

        return true;
    }

    function init() {
        importStaticCatalog();
        importCurrentPage();

        if (!connect()) {
            const observer = new MutationObserver(() => {
                if (connect()) observer.disconnect();
            });

            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }

        loadRoutes();
    }

    window.GU = window.GU || {};
    window.GU.Search = {
        init,
        search,
        normalizeText: normalize,
        getCatalog: () => products.slice(),
        version: "8.0.0"
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
