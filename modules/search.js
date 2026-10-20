/**
 * GU Global Search — integração com a barra existente
 * Não cria input, não substitui a barra e não altera o layout.
 *
 * IMPORTANTE:
 * Mantenha o GLOBAL_PRODUCTS_DATABASE existente acima deste código.
 */
(function () {
    if (window.GU_SEARCH_LOADED) {
        console.warn("[GU-Search] O módulo já foi inicializado.");
        return;
    }

    window.GU_SEARCH_LOADED = true;

    const SEARCH_URL = "/server-service-list?search=";
    const LOG_PREFIX = "[GU-Search]";

    function log(message, type = "info") {
        if (window.GU?.flags?.debugMode === false) return;

        if (type === "warn") {
            console.warn(LOG_PREFIX, message);
        } else {
            console.log(LOG_PREFIX, message);
        }
    }

    function normalizeText(value) {
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, " ")
            .trim();
    }

    /*
     * Procura a barra que já existe no painel.
     * Não cria uma nova se nenhum campo for encontrado.
     */
    function findExistingSearchInput() {
        const selectors = [
            'input[type="search"]',
            'input[placeholder*="buscar" i]',
            'input[placeholder*="pesquisar" i]',
            'input[placeholder*="search" i]',
            'input[name="search"]',
            'input[name="query"]',
            'input[id*="search" i]',
            'input[class*="search" i]'
        ];

        const candidates = [...new Set(
            selectors.flatMap(selector =>
                [...document.querySelectorAll(selector)]
            )
        )];

        const input = candidates.find(element => {
            if (!(element instanceof HTMLInputElement)) return false;
            if (element.disabled || element.type === "hidden") return false;
            if (element.id === "gu-global-search-input") return false;
            if (element.closest("#gu-global-search-wrapper")) return false;

            const style = window.getComputedStyle(element);

            return style.display !== "none" &&
                   style.visibility !== "hidden" &&
                   element.getClientRects().length > 0;
        });

        return input || null;
    }

    function getCatalog() {
        if (Array.isArray(window.GLOBAL_PRODUCTS_DATABASE)) {
            return window.GLOBAL_PRODUCTS_DATABASE;
        }

        if (Array.isArray(window.GU_SEARCH_CATALOG)) {
            return window.GU_SEARCH_CATALOG;
        }

        return [];
    }

    function getItemText(item) {
        if (typeof item === "string") return item;

        if (!item || typeof item !== "object") return "";

        return [
            item.title,
            item.name,
            item.product,
            item.service,
            item.category,
            ...(Array.isArray(item.aliases) ? item.aliases : []),
            ...(Array.isArray(item.keywords) ? item.keywords : [])
        ].filter(Boolean).join(" ");
    }

    function searchCatalog(query) {
        const normalizedQuery = normalizeText(query);

        if (!normalizedQuery) return [];

        const terms = normalizedQuery.split(/\s+/);
        const catalog = getCatalog();

        return catalog.filter(item => {
            const searchableText = normalizeText(getItemText(item));

            return terms.every(term => searchableText.includes(term));
        });
    }

    function submitSearch(input) {
        const query = input.value.trim();

        if (!query) return;

        /*
         * Utiliza a rota de pesquisa já definida no módulo anterior.
         * O catálogo serve para complementar a busca, sem criar outra barra.
         */
        const matches = searchCatalog(query);

        if (matches.length > 0) {
            const first = matches[0];
            const title = typeof first === "string"
                ? first
                : (first.title || first.name || first.product ||
                   first.service || query);

            log(`Correspondência encontrada: ${title}`);
        }

        window.location.href = SEARCH_URL + encodeURIComponent(query);
    }

    function connectExistingSearch() {
        if (window.GU?.flags?.globalSearch === false) {
            log("Pesquisa global desativada pela Feature Flag.");
            return true;
        }

        const input = findExistingSearchInput();

        if (!input) {
            return false;
        }

        if (input.dataset.guSearchConnected === "true") {
            return true;
        }

        input.dataset.guSearchConnected = "true";

        /*
         * Não altera o placeholder, o CSS, o tamanho ou a posição
         * do campo existente.
         */
        input.addEventListener("keydown", function (event) {
            if (event.key !== "Enter") return;

            event.preventDefault();
            submitSearch(input);
        });

        /*
         * Expõe a busca para outros módulos, se necessário.
         */
        window.GU = window.GU || {};
        window.GU.Search = {
            init: connectExistingSearch,
            search: searchCatalog,
            normalizeText,
            getCatalog,
            version: "6.0.0"
        };

        log("Barra de pesquisa existente conectada.");
        return true;
    }

    function init() {
        if (connectExistingSearch()) return;

        /*
         * O painel pode renderizar a barra depois, via AJAX.
         * Observa a página, mas nunca insere um novo campo.
         */
        const observer = new MutationObserver(() => {
            if (connectExistingSearch()) {
                observer.disconnect();
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        log(
            "Barra existente ainda não localizada. Aguardando o painel renderizá-la.",
            "warn"
        );
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
