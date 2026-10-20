/**
 * GU-Core: Central Loader Engine
 */
(function () {
    window.GU = window.GU || {};

    window.GU.flags = {
        debugMode: true,
        themeNeon: true,
        translator: true,
        globalSearch: true
    };

    window.GU.log = function (msg, level = 'info') {
        if (window.GU.flags.debugMode) {
            console[level](`[GU-Core] ${msg}`);
        }
    };

    window.GU.loadJS = function (filePath) {
        const script = document.createElement('script');
        script.src = `https://lssoares2.github.io/gu-core/${filePath}?v=${new Date().getTime()}`;
        script.async = true;
        document.head.appendChild(script);
    };

    window.GU.init = function () {
        window.GU.log("Inicializando GU-Core Ecosystem...");

        if (window.GU.flags.globalSearch) {
            window.GU.loadJS("modules/search.js");
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.GU.init());
    } else {
        window.GU.init();
    }
})();
