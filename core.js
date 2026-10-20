
/**
 * GU-Core — General Unlocking GSM
 * Carregamento modular sem duplicar a pesquisa do painel.
 */
(function () {
    "use strict";

    if (window.GU_CORE_LOADED) {
        console.warn("[GU-Core] O core já foi carregado.");
        return;
    }

    window.GU_CORE_LOADED = true;

    const VERSION = "1.0.3";
    const BASE_URL = "https://lssoares2.github.io/gu-core";

    window.GU = {
        version: VERSION,
        baseURL: BASE_URL,

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

            const alreadyLoaded = [...document.querySelectorAll(
                'link[rel="stylesheet"]'
            )].some(link => {
                try {
                    const loadedURL = new URL(link.href);
                    const targetURL = new URL(url);

                    return loadedURL.origin === targetURL.origin &&
                        loadedURL.pathname === targetURL.pathname;
                } catch (_) {
                    return false;
                }
            });

            if (alreadyLoaded) {
                this.log(`CSS já solicitado: ${path}`);
                return;
            }

            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = url;

            link.onload = () => {
                this.log(`CSS carregado: ${path}`);
            };

            link.onerror = () => {
                this.log(`Falha ao carregar CSS: ${path}`, "error");
            };

            document.head.appendChild(link);
        },

        loadJS: function (path) {
            const url = `${this.baseURL}/${path}`;

            const alreadyLoaded = [...document.scripts].some(script => {
                if (!script.src) return false;

                try {
                    const loadedURL = new URL(script.src);
                    const targetURL = new URL(url);

                    return loadedURL.origin === targetURL.origin &&
                        loadedURL.pathname === targetURL.pathname;
                } catch (_) {
                    return false;
                }
            });

            if (alreadyLoaded) {
                this.log(`Módulo já solicitado: ${path}`);
                return;
            }

            const script = document.createElement("script");
            script.src = `${url}?v=${this.version}`;
            script.dataset.guModule = path;
            script.dataset.guVersion = this.version;
            script.async = false;

            script.onload = () => {
                this.log(`Módulo carregado: ${path}`);
            };

            script.onerror = () => {
                this.log(`Falha ao carregar módulo: ${path}`, "error");
            };

            document.head.appendChild(script);
        },

        init: function () {
            this.log(`Iniciando módulos — versão ${this.version}...`);

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
