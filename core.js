/**
 * GU-Core: Frontend Extension Layer
 * Version: 1.0.0
 * Architecture: Modular (GitHub Pages -> Laravel Header Coder)
 */

(function () {
    // 1. PREVENÇÃO DE DUPLICIDADE
    // Se o painel carregar o script duas vezes, evitamos rodar tudo de novo.
    if (window.GU_CORE_LOADED) {
        console.warn("[GU-Core] Tentativa de carregamento duplicado interceptada.");
        return;
    }
    window.GU_CORE_LOADED = true;

    // 2. NAMESPACE E CONFIGURAÇÃO
    // Criamos um objeto global seguro para não conflitar com o Laravel/jQuery
    window.GU = {
        version: "1.0.0",
        baseURL: "https://lssoares2.github.io/gu-core",
        
        // FEATURE FLAGS (Liga / Desliga módulos inteiros aqui)
        flags: {
            debugMode: true,      // Mostra logs no console
            themeNeon: true,      // Carrega o CSS Cyberpunk (em breve)
            translator: true,    // Tradutor Global (agora ativo)
            globalSearch: false,  // Pesquisa avançada (em breve)
            uiFixes: false        // Correções de layout (em breve)
        },

        // Função interna para logs
        log: function (msg, type = "info") {
            if (!this.flags.debugMode) return;
            const prefix = "[GU-Core]";
            if (type === "warn") console.warn(prefix, msg);
            else if (type === "error") console.error(prefix, msg);
            else console.log(prefix, msg);
        },

        // 3. CARREGADOR DE DEPENDÊNCIAS (CSS e JS)
        loadCSS: function (path) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = `${this.baseURL}/${path}?v=${this.version}`;
            document.head.appendChild(link);
            this.log(`CSS Injetado: ${path}`);
        },

        loadJS: function (path) {
            const script = document.createElement("script");
            script.src = `${this.baseURL}/${path}?v=${this.version}`;
            script.defer = true;
            document.head.appendChild(script);
            this.log(`JS Injetado: ${path}`);
        },

        // 4. INICIALIZAÇÃO
        init: function () {
            this.log("Iniciando carregamento de módulos...");

            // Aqui o Core decide o que carregar baseado nas flags
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
            
            this.log("Sistema pronto e aguardando.");
        }
    };

    // Dar a partida!
    window.GU.init();

})();
