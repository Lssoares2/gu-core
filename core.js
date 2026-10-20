/**
 * GU-Core — General Unlocking GSM
 * Carregamento modular sem duplicar a pesquisa do painel.
 */
(function () {
    if (window.GU_CORE_LOADED) {
        console.warn("[GU-Core] O core já foi carregado.");
        return;
    }

    window.GU_CORE_LOADED = true;

    window.GU = {
        version: "1.0.2",
        baseURL: "https://lssoares2.github.io/gu-core",

        flags: {
            debugMode: true,
            themeNeon: true,
            translator: true,
            globalSearch: true,
            uiFixes: false
        },

        log: function (message, type = "info") {
            if (!this.flags.debugMode) return;

            const prefix = "[GU-Core]";

            if (type === "error") {
                console.error(prefix, message);
            } else if (type === "warn") {
                console.warn(prefix, message);
            } else {
                console.log(prefix, message);
            }
        },

        loadCSS: function (path) {
            const url = `${this.baseURL}/${path}?v=${this.version}`;

            // Evita inserir o mesmo CSS mais de uma vez.
            if ([...document.querySelectorAll('link[rel="stylesheet"]')]
                .some(link => link.href.startsWith(`${this.baseURL}/${path}`))) {
                this.log(`CSS já carregado: ${path}`);
                return;
            }

            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = url;

            link.onerror = () => {
                this.log(`Falha ao carregar CSS: ${path}`, "error");
            };

            document.head.appendChild(link);
            this.log(`CSS solicitado: ${path}`);
        },

        loadJS: function (path) {
            const url = `${this.baseURL}/${path}`;

            // Evita carregar novamente um módulo já inserido.
            if ([...document.scripts].some(script =>
                script.src.startsWith(url)
            )) {
                this.log(`Módulo já solicitado: ${path}`);
                return;
            }

            const script = document.createElement("script");
            script.src = `${url}?v=${this.version}`;

            script.onload = () => {
                this.log(`Módulo carregado: ${path}`);
            };

            script.onerror = () => {
                this.log(`Falha ao carregar módulo: ${path}`, "error");
            };

            document.head.appendChild(script);
        },

        init: function () {
            this.log("Iniciando módulos...");

            if (this.flags.themeNeon) {
                this.loadCSS("assets/theme-neon.css");
            }

            if (this.flags.translator) {
                this.loadJS("modules/translator.js");
            }

            if (this.flags.globalSearch) {
                this.loadJS("modules/search.js");
            }

            if (this.flags.uiFixes) {
                this.loadJS("modules/ui-fixes.js");
            }

            this.log("Inicialização concluída.");
        }
    };

    window.GU.init();
})();
