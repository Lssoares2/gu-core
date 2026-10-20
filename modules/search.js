
/**
 * GU Global Search v7.0
 * General Unlocking GSM
 * Pesquisa na barra original, sem criar um segundo input.
 */
(function () {
    if (window.GU_SEARCH_LOADED) {
        console.warn("[GU-Search] Módulo já carregado.");
        return;
    }
    window.GU_SEARCH_LOADED = true;

    const LOG = "[GU-Search]";
    const SOURCES = [
        { url: "/imei/service", category: "IMEI" },
        { url: "/server/service", category: "Servidor" },
        { url: "/remote/service", category: "Remoto" }
    ];

    const normalize = value => String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

    let input = null;
    let dropdown = null;
    let products = [];
    let selectedIndex = -1;
    let searchTimer = null;
    let fetchStarted = false;

    function log(message) {
        if (window.GU?.flags?.debugMode !== false) {
            console.log(LOG, message);
        }
    }

    function findInput() {
        // Prioriza explicitamente a barra principal do site.
        const selectors = [
            'input[placeholder*="BUSCAR EM TODOS OS SERVIÇOS" i]',
            'input[placeholder*="UNLOCKTOOL" i]',
            'input[placeholder*="buscar" i]',
            'input[placeholder*="pesquisar" i]',
            'input[type="search"]',
            'input[name="search"]',
            'input[id*="search" i],
            'input[class*="search" i]'
        ];

        for (const selector of selectors) {
            const found = [...document.querySelectorAll(selector)].find(el => {
                if (!(el instanceof HTMLInputElement)) return false;
                if (el.disabled || el.type === "hidden") return false;
                if (el.closest("#gu-search-suggestions")) return false;

                const style = getComputedStyle(el);
                return style.display !== "none" &&
                    style.visibility !== "hidden" &&
                    el.getClientRects().length > 0;
            });

            if (found) return found;
        }

        return null;
    }

    function getItemName(item) {
        if (typeof item === "string") return item;

        return [
            item?.title,
            item?.name,
            item?.product,
            item?.service,
            item?.category,
            ...(Array.isArray(item?.aliases) ? item.aliases : []),
            ...(Array.isArray(item?.keywords) ? item.keywords : [])
        ].filter(Boolean).join(" ");
    }

    function getStaticProducts() {
        const catalog = Array.isArray(window.GLOBAL_PRODUCTS_DATABASE)
            ? window.GLOBAL_PRODUCTS_DATABASE
            : Array.isArray(window.GU_SEARCH_CATALOG)
                ? window.GU_SEARCH_CATALOG
                : [];

        return catalog.map(item => ({
            name: getItemName(item),
            url: typeof item === "object"
                ? (item.url || item.href || item.link || "")
                : "",
            category: item?.category || "Catálogo",
            source: "static"
        })).filter(item => item.name);
    }

    function addProduct(list, item) {
        if (!item.name || item.name.length < 2) return;

        const key = normalize(item.name) + "|" + item.url;
        if (list.some(existing =>
            normalize(existing.name) + "|" + existing.url === key
        )) return;

        list.push(item);
    }

    function extractProducts(html, source) {
        const parsed = new DOMParser().parseFromString(html, "text/html");
        const found = [];

        // Primeiro tenta identificar os cartões de produto/serviço.
        const cardSelector = [
            ".service-card",
            ".product-card",
            ".service-item",
            ".product-item",
            ".services-item",
            ".server-item",
            ".imei-item",
            "[class*='service-card']",
            "[class*='product-card']"
        ].join(",");

        parsed.querySelectorAll(cardSelector).forEach(card => {
            const link = card.querySelector("a[href]");
            const heading = card.querySelector(
                "h1,h2,h3,h4,.title,.name,[class*='title'],[class*='name']"
            );

            const name = (
                heading?.textContent ||
                link?.textContent ||
                ""
            ).replace(/\s+/g, " ").trim();

            const href = link?.getAttribute("href") || "";

            if (name && href && !href.startsWith("javascript:")) {
                found.push({
                    name,
                    url: new URL(href, location.origin).href,
                    category: source.category,
                    source: "live"
                });
            }
        });

        // Fallback para páginas que usam tabelas/listas em vez de cards.
        if (found.length === 0) {
            const main = parsed.querySelector(
                "main, #main, .main-content, .service-list, .services-list, .container"
            ) || parsed.body;

            main.querySelectorAll("a[href]").forEach(link => {
                const name = link.textContent.replace(/\s+/g, " ").trim();
                const href = link.getAttribute("href") || "";
                const parent = link.closest("tr, li, .card, .row");

                if (!parent || name.length < 3 || name.length > 180) return;
                if (!href || href.startsWith("#") ||
                    href.startsWith("javascript:")) return;

                const text = parent.textContent.replace(/\s+/g, " ").trim();

                // Evita adicionar menus, rodapé e links de autenticação.
                if (/log in|login|register|create account|privacy policy/i.test(name)) {
                    return;
                }

                found.push({
                    name,
                    url: new URL(href, location.origin).href,
                    category: source.category,
                    source: "live",
                    description: text
                });
            });
        }

        return found;
    }

    async function loadLiveProducts() {
        if (fetchStarted) return;
        fetchStarted = true;

        const results = await Promise.allSettled(
            SOURCES.map(async source => {
                const response = await fetch(source.url, {
                    credentials: "same-origin",
                    headers: { "X-Requested-With": "XMLHttpRequest" }
                });

                if (!response.ok) {
                    throw new Error(
                        source.url + " respondeu HTTP " + response.status
                    );
                }

                const html = await response.text();
                return extractProducts(html, source);
            })
        );

        const updated = [...products];

        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                result.value.forEach(item => addProduct(updated, item));
                log(
                    SOURCES[index].url + ": " +
                    result.value.length + " itens identificados."
                );
            } else {
                console.warn(
                    LOG + " Não foi possível carregar " +
                    SOURCES[index].url,
                    result.reason
                );
            }
        });

        products = updated;

        // Atualiza a lista se o usuário ainda estiver pesquisando.
        if (input?.value.trim()) {
            renderResults(input.value);
        }
    }

    function ensureDropdown() {
        if (dropdown) return;

        dropdown = document.createElement("div");
        dropdown.id = "gu-search-suggestions";

        Object.assign(dropdown.style, {
            position: "fixed",
            display: "none",
            zIndex: "2147483647",
            maxHeight: "360px",
            overflowY: "auto",
            background: "#101714",
            color: "#fff",
            border: "1px solid #00ff66",
            borderRadius: "8px",
            boxShadow: "0 8px 28px rgba(0,0,0,.45)",
            fontFamily: "inherit",
            fontSize: "14px"
        });

        document.body.appendChild(dropdown);
    }

    function positionDropdown() {
        if (!input || !dropdown) return;

        const rect = input.getBoundingClientRect();

        Object.assign(dropdown.style, {
            left: rect.left + "px",
            top: rect.bottom + 5 + "px",
            width: rect.width + "px"
        });
    }

    function rankProducts(query) {
        const normalizedQuery = normalize(query);
        const terms = normalizedQuery.split(/\s+/).filter(Boolean);

        if (!terms.length) return [];

        return products.map(item => {
            const name = normalize(item.name);
            const description = normalize(item.description || "");
            const category = normalize(item.category || "");
            const searchable = name + " " + description + " " + category;

            const matched = terms.filter(term =>
                searchable.includes(term)
            ).length;

            if (matched !== terms.length) return null;

            let score = matched * 10;

            if (name === normalizedQuery) score += 100;
            if (name.startsWith(normalizedQuery)) score += 50;
            if (name.includes(normalizedQuery)) score += 25;
            if (item.source === "live") score += 5;

            return { ...item, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12);
    }

    function renderResults(query) {
        ensureDropdown();
        dropdown.replaceChildren();
        selectedIndex = -1;

        if (!query.trim()) {
            dropdown.style.display = "none";
            return;
        }

        const results = rankProducts(query);

        positionDropdown();
        dropdown.style.display = "block";

        if (!results.length) {
            const message = document.createElement("div");
            message.textContent = products.length
                ? "Nenhum produto encontrado no catálogo carregado."
                : "Carregando catálogo de serviços...";

            message.style.padding = "14px";
            message.style.color = "#c8d3cc";
            dropdown.appendChild(message);
            return;
        }

        results.forEach((item, index) => {
            const result = document.createElement("a");
            result.href = item.url || (
                item.category === "IMEI" ? "/imei/service" :
                item.category === "Remoto" ? "/remote/service" :
                "/server/service"
            );

            Object.assign(result.style, {
                display: "block",
                padding: "11px 14px",
                color: "#fff",
                textDecoration: "none",
                borderBottom: "1px solid #26352b",
                cursor: "pointer"
            });

            const title = document.createElement("div");
            title.textContent = item.name;
            title.style.fontWeight = "600";

            const category = document.createElement("small");
            category.textContent = item.category || "Serviço";
            category.style.color = "#00ff66";

            result.append(title, category);

            result.addEventListener("mouseenter", () => {
                selectedIndex = index;
                highlightSelection();
            });

            result.addEventListener("click", () => {
                if (item.url) {
                    window.location.href = item.url;
                }
            });

            dropdown.appendChild(result);
        });
    }

    function highlightSelection() {
        if (!dropdown) return;

        [...dropdown.children].forEach((element, index) => {
            element.style.background = index === selectedIndex
                ? "#183c27"
                : "transparent";
        });
    }

    function connect() {
        if (window.GU?.flags?.globalSearch === false) return false;

        const found = findInput();
        if (!found) return false;

        if (input === found && found.dataset.guSearchConnected === "true") {
            return true;
        }

        input = found;
        input.dataset.guSearchConnected = "true";

        ensureDropdown();

        input.addEventListener("input", () => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                renderResults(input.value);
            }, 120);
        });

        input.addEventListener("focus", () => {
            if (input.value.trim()) renderResults(input.value);
        });

        input.addEventListener("keydown", event => {
            if (!dropdown || dropdown.style.display === "none") {
                if (event.key === "Enter" && input.value.trim()) {
                    renderResults(input.value);
                }
                return;
            }

            const items = [...dropdown.querySelectorAll("a")];

            if (event.key === "ArrowDown" && items.length) {
                event.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                highlightSelection();
            } else if (event.key === "ArrowUp" && items.length) {
                event.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                highlightSelection();
            } else if (event.key === "Enter" && items.length) {
                event.preventDefault();
                const target = items[selectedIndex >= 0 ? selectedIndex : 0];
                if (target) window.location.href = target.href;
            } else if (event.key === "Escape") {
                dropdown.style.display = "none";
            }
        });

        document.addEventListener("click", event => {
            if (!dropdown.contains(event.target) && event.target !== input) {
                dropdown.style.display = "none";
            }
        });

        window.addEventListener("resize", positionDropdown);
        window.addEventListener("scroll", positionDropdown, true);

        log("Barra original conectada.");
        loadLiveProducts();

        return true;
    }

    function init() {
        // Preserva o catálogo estático, se já estiver definido.
        products = getStaticProducts();

        if (connect()) return;

        const observer = new MutationObserver(() => {
            if (connect()) observer.disconnect();
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    window.GU = window.GU || {};
    window.GU.Search = {
        init,
        normalizeText: normalize,
        version: "7.0.0",
        getCatalog: () => products,
        search: query => rankProducts(query)
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
