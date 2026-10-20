
/**
 * GU-Core: Frontend Extension Layer
 * Version: 1.0.0
 * Architecture: Modular (GitHub Pages -> Laravel Header Coder)
 */

(function () {
    // 1. PREVENÇÃO DE DUPLICIDADE
    if (window.GU_CORE_LOADED) {
        console.warn(
            "[GU-Core] Tentativa de carregamento duplicado interceptada."
        );
        return;
    }

    window.GU_CORE_LOADED = true;

    // 2. NAMESPACE E CONFIGURAÇÃO
    window.GU = {
        version: "1.0.1",
        baseURL: "https://lssoares2.github.io/gu-core",

        // FEATURE FLAGS
        flags: {
            debugMode: true,
            themeNeon: true,
            translator: true,
            globalSearch: true, // PESQUISA GLOBAL ATIVADA
            uiFixes: false
        },

        // 3. SISTEMA DE LOGS
        log: function (msg, type = "info") {
            if (!this.flags.debugMode) return;

            const prefix = "[GU-Core]";

            if (type === "warn") {
                console.warn(prefix, msg);
            } else if (type === "error") {
                console.error(prefix, msg);
            } else {
                console.log(prefix, msg);
            }
        },

        // 4. CARREGADOR DE CSS
        loadCSS: function (path) {
            const link = document.createElement("link");

            link.rel = "stylesheet";
            link.href = `${this.baseURL}/${path}?v=${this.version}`;

            link.onerror = () => {
                this.log(`Falha ao carregar CSS: ${path}`, "error");
            };

            document.head.appendChild(link);
            this.log(`CSS solicitado: ${path}`);
        },

        // 5. CARREGADOR DE JAVASCRIPT
        loadJS: function (path) {
            const script = document.createElement("script");

            script.src = `${this.baseURL}/${path}?v=${this.version}`;
            script.defer = true;

            script.onload = () => {
                this.log(`Módulo carregado: ${path}`);
            };

            script.onerror = () => {
                this.log(`Falha ao carregar módulo: ${path}`, "error");
            };

            document.head.appendChild(script);
            this.log(`Carregamento solicitado: ${path}`);
        },

        // 6. INICIALIZAÇÃO DOS MÓDULOS
        init: function () {
            this.log("Iniciando carregamento de módulos...");

            if (this.flags.themeNeon) {
                this.loadCSS("assets/theme-neon.css");
            }

            if (this.flags.translator) {
                this.loadJS("modules/translator.js");
            }

            if (this.flags.globalSearch) {
                this.loadJS("modules/search.js");
                this.log("Pesquisa global ativada.");
            }

            if (this.flags.uiFixes) {
                this.loadJS("modules/ui-fixes.js");
            }

            this.log("Sistema pronto e aguardando.");
        }
    };

    // 7. INICIAR GU-CORE
    window.GU.init();

})();
