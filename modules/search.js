```javascript
/**
 * GU Global Search v9.0
 * General Unlocking GSM
 * Usa exclusivamente #globalCyberSearch.
 * Indexa categorias renderizadas por iframes ocultos.
 */
(function () {
    "use strict";

    // Não inicializa a busca dentro dos iframes de coleta.
    if (window !== window.top) return;

    if (window.GU_SEARCH_V9_LOADED) return;
    window.GU_SEARCH_V9_LOADED = true;

    const PREFIX = "[GU-Search]";
    const ROUTES = [
        { url: "/imei/service", category: "IMEI" },
        { url: "/server/service", category: "Servidor" },
        { url: "/remote/service", category: "Remoto" }
    ];

    const PRODUCT_PREFIX = "/service/";
    const MAX_RESULTS = 15;
    const LOAD_TIMEOUT = 15000;

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

    function isProductUrl(url) {
        try {
            const parsed = new URL(url, location.origin);

            return parsed.origin === location.origin &&
                parsed.pathname.startsWith(PRODUCT_PREFIX);
        } catch (_) {
            return false;
        }
    }

    function addProduct(item) {
        if (!item || !item.name || !item.url) return;

        const name = String(item.name).replace(/\s+/g, " ").trim();
        if (name.length < 2 || !isProductUrl(item.url)) return;

        const url = new URL(item.url, location.origin).href;
        const key = normalize(name) + "|" + url;

        if (products.some(product => product.key === key)) return;

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

            if (url) {
                try {
                    url = new URL(url, location.origin).href;
                } catch (_) {
                    return;
                }
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

    function categoryFromPath(path) {
        if (path.startsWith("/imei/")) return "IMEI";
        if (path.startsWith("/remote/")) return "Remoto";
        if (path.startsWith("/server/")) return "Servidor";
        return "Serviço";
    }

    function importLinks(root, category) {
        let count = 0;

        root.querySelectorAll("a[href]").forEach(link => {
            const href = link.href || link.getAttribute("href");
            if (!href || !isProductUrl(href)) return;

            const name = (link.innerText || link.textContent || "")
                .replace(/\s+/g, " ")
                .trim();

            if (!name) return;

            const before = products.length;

            addProduct({
                name,
                url: href,
                category
            });

            if (products.length > before) count++;
        });

        return count;
    }

    function importCurrentPage() {
        const category = categoryFromPath(location.pathname);
        const count = importLinks(document, category);

        log("Página atual:", location.pathname, "-", count, "produtos novos");
    }

    // Aguarda os cartões dinâmicos aparecerem e estabilizarem.
    function waitForProducts(doc) {
        return new Promise(resolve => {
            const started = Date.now();
            let previousCount = -1;
            let stableChecks = 0;
            let finished = false;

            const observer = new MutationObserver(check);
            const interval = setInterval(check, 250);

            function finish() {
                if (finished) return;
                finished = true;

                clearInterval(interval);
                observer.disconnect();

                resolve(doc.querySelectorAll('a[href*="/service/"]').length);
            }

            function check() {
                if (finished) return;

                const count = doc.querySelectorAll('a[href*="/service/"]').length;

                if (count > 0 && count === previousCount) {
                    stableChecks++;
                } else {
                    stableChecks = 0;
                }

                previousCount = count;

                if (count > 0 && stableChecks >= 3) {
                    finish();
                    return;
                }

                if (Date.now() - started >= LOAD_TIMEOUT) {
                    finish();
                }
            }

            if (doc.documentElement) {
                observer.observe(doc.documentElement, {
                    childList: true,
                    subtree: true
                });
            }

            check();
        });
    }

    function loadRouteInIframe(route) {
        return new Promise(resolve => {
            const iframe = document.createElement("iframe");
            let finished = false;

            // Fora da tela, mas com dimensões para permitir a renderização.
            Object.assign(iframe.style, {
                position: "fixed",
                left: "-20000px",
                top: "0",
                width: "1280px",
                height: "900px",
                opacity: "0",
                pointerEvents: "none",
                border: "0"
            });

            iframe.setAttribute("aria-hidden", "true");
            iframe.tabIndex = -1;

            const fallback = setTimeout(() => {
                finish(new Error("Tempo limite ao carregar " + route.url));
            }, LOAD_TIMEOUT + 10000);

            function finish(error) {
                if (finished) return;
                finished = true;

                clearTimeout(fallback);

                if (iframe.parentNode) iframe.remove();

                if (error) {
                    resolve({
                        route,
                        count: 0,
                        error
                    });
                }
            }

            iframe.onload = async () => {
                try {
                    const doc = iframe.contentDocument;

                    if (!doc) {
                        finish(new Error("Não foi possível acessar o documento"));
                        return;
                    }

                    await waitForProducts(doc);

                    const count = importLinks(doc, route.category);

                    log(route.url, "-", count, "produtos novos");

                    if (!finished) {
                        finished = true;
                        clearTimeout(fallback);
                        iframe.remove();

                        resolve({ route, count });
                    }
                } catch (error) {
                    finish(error);
                }
            };

            iframe.onerror = () => {
                finish(new Error("Falha ao abrir a página"));
            };

            iframe.src = new URL(route.url, location.origin).href;
            document.body.appendChild(iframe);
        });
    }

    async function loadRoutes() {
        if (requestStarted) return;
        requestStarted = true;

        const results = await Promise.all(
            ROUTES.map(route => loadRouteInIframe(route))
        );

        results.forEach(result => {
            if (result.error) {
                console.warn(
                    PREFIX,
                    "Falha ao ler " + result.route.url,
                    result.error
                );
            }
        });

        log("Total de itens indexados:", products.length);

        if (input && input.value.trim()) {
            render(input.value);
        }
    }

    function ensurePanel() {
        if (panel && panel.isConnected) return;

        panel = document.getElementById("gu-global-search-results");

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
  const normalize = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const aliases = {
    "phoenix": ["phoenix service tool"],
    "unlocktool": ["unlock tool"],
    "tsm": ["tsm tool", "tsm tool pro"],
    "amt": ["android multi tool"],
    "tfm": ["tfm pro tool"],
    "awt": ["android win tool"],
    "eft": ["eft pro", "eft dongle"],
    "z3x": ["z3x samstool"],
    "dft": ["dft pro tool"],
    "octoplus": ["octoplus samsung tool"],
    "sst": ["samsung service tool"],
    "frpfile": ["frpfile finder"],
    "borneo": ["borneo schematics"],
    "mdm": ["mdm fix tool", "apple mdm checker"],
    "fmi": ["find my iphone", "apple activation lock"],
    "icloud": ["apple activation lock", "icloud checker"],
    "xiaomi": ["micloud", "xiaomi find"],
    "imei": ["imei checker", "imei sn checker"],
    "blacklist": ["gsma blacklist checker"],
    "virtualbox": ["virtual box"],
    "anydesk": ["any desk"],
    "motorola": ["motorola unlock codes", "motorola info"],
    "samsung": ["samsung info", "samsung imei", "kg bypass"],
    "chimera": ["chimera tool"],
    "hydra": ["hydra tool"],
    "pandora": ["pandora tool"],
    "kg": ["kg bypass", "kgfixtool"],
    "kgfix": ["kgfixtool"],
    "grifftool": ["griffin unlocker"],
    "celltool": ["celltool io"],
    "apple": ["iphone", "icloud", "fmi", "mdm"],
    "iphone": ["ios passcode", "hello screen", "carrier sim lock"],
    "macbook": ["macbook icloud checker"],
    "huawei": ["huawei info"],
    "oneplus": ["oneplus info"],
    "pixel": ["google pixel info"],
    "zte": ["zte info"],
    "honor": ["honor imei sn checker"]
  };

  const raw = normalize(query);
  if (!raw) return [];

  const terms = raw.split(/\s+/).filter(Boolean);
  const expanded = new Set(terms);

  for (const term of terms) {
    for (const alias of aliases[term] || []) {
      expanded.add(normalize(alias));
    }
  }

  const catalog = Array.isArray(products) ? products : [];

  return catalog
    .map((product) => {
      const name = normalize(product.name);
      const category = normalize(product.category);
      const keywords = normalize(
        Array.isArray(product.keywords)
          ? product.keywords.join(" ")
          : product.keywords
      );
      const description = normalize(product.description);
      const haystack = `${name} ${category} ${keywords} ${description}`;

      let score = 0;
      let matched = 0;

      for (const term of expanded) {
        const words = term.split(/\s+/).filter(Boolean);

        const found = words.every((word) =>
          haystack.split(/\s+/).some((item) =>
            item === word ||
            item.startsWith(word) ||
            word.startsWith(item)
          )
        );

        if (found) {
          matched++;
          if (name === term) score += 100;
          else if (name.startsWith(term)) score += 50;
          else if (name.includes(term)) score += 30;
          else score += 10;
        }
      }

      const originalMatches = terms.filter((term) =>
        haystack.split(/\s+/).some((word) =>
          word === term ||
          word.startsWith(term) ||
          term.startsWith(word)
        )
      ).length;

      if (originalMatches === 0 && matched === 0) return null;

      score += originalMatches * 20;

      return { product, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
    .map((item) => item.product);
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
                : "Carregando serviços ou nenhum produto disponível.";

            message.style.padding = "14px";
            panel.appendChild(message);
            return;
        }

        results.forEach((product, index) => {
            const item = document.createElement("a");

            item.href = product.url;
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

            item.addEventListener("click", () => {
                panel.style.display = "none";
            });

            panel.appendChild(item);
        });
    }

    function highlight() {
        if (!panel) return;

        [...panel.querySelectorAll('a[role="option"]')].forEach((item, index) => {
            item.style.background = index === activeIndex
                ? "#183c27"
                : "transparent";
        });
    }

    function connect() {
        if (window.GU?.flags?.globalSearch === false) return false;

        const found = document.getElementById("globalCyberSearch");

        if (!(found instanceof HTMLInputElement)) return false;

        if (found.dataset.guSearchV9 === "true") {
            input = found;
            return true;
        }

        input = found;
        input.dataset.guSearchV9 = "true";

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

            const items = [...panel.querySelectorAll('a[role="option"]')];

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

                if (chosen?.href) {
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
        version: "9.0.0"
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
```
