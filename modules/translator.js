/**
 * GU-Core: Módulo Tradutor Global (PT-BR)
 * Utiliza TreeWalker para varrer TextNodes de forma segura sem quebrar o layout,
 * preços, inputs ou tags protegidas.
 */

(function () {
    window.GU = window.GU || {};
    
    window.GU.Translator = {
        dictionary: {},
        isTranslated: false,

        init: async function () {
            window.GU.log("[GU-Translator] Inicializando módulo de tradução...");
            await this.loadDictionary();
            if (Object.keys(this.dictionary).length > 0) {
                this.translateDOM(document.body);
                this.observeDOM();
            }
        },

        loadDictionary: async function () {
            try {
                const response = await fetch(`${window.GU.baseURL}/data/pt-br.json?v=${window.GU.version}`);
                this.dictionary = await response.json();
                window.GU.log("[GU-Translator] Dicionário PT-BR carregado com sucesso.");
            } catch (error) {
                window.GU.log("[GU-Translator] Erro ao carregar dicionário JSON: " + error, "error");
            }
        },

        translateText: function (text) {
            const trimmed = text.trim();
            if (!trimmed) return text;
            
            // Se houver correspondência exata no dicionário
            if (this.dictionary[trimmed]) {
                return text.replace(trimmed, this.dictionary[trimmed]);
            }
            return text;
        },

        translateDOM: function (rootNode) {
            const walker = document.createTreeWalker(
                rootNode,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function (node) {
                        // Ignorar tags onde tradução é proibida
                        const parent = node.parentNode;
                        if (!parent) return NodeFilter.FILTER_REJECT;
                        
                        const tagName = parent.tagName ? parent.tagName.toLowerCase() : '';
                        if (['script', 'style', 'code', 'pre', 'textarea'].includes(tagName)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        
                        // Ignorar elementos marcados com data-no-translate
                        if (parent.closest && parent.closest('[data-no-translate]')) {
                            return NodeFilter.FILTER_REJECT;
                        }

                        // Ignorar nós que são apenas espaços vazios
                        if (!node.nodeValue.trim()) {
                            return NodeFilter.FILTER_SKIP;
                        }

                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            let node;
            while (node = walker.nextNode()) {
                const original = node.nodeValue;
                const translated = this.translateText(original);
                if (original !== translated) {
                    node.nodeValue = translated;
                }
            }

            // Traduzir atributos comuns (placeholder, title, aria-label)
            const elements = rootNode.querySelectorAll('[placeholder], [title], [aria-label]');
            elements.forEach(el => {
                ['placeholder', 'title', 'aria-label'].forEach(attr => {
                    const val = el.getAttribute(attr);
                    if (val && this.dictionary[val.trim()]) {
                        el.setAttribute(attr, this.dictionary[val.trim()]);
                    }
                });
            });
        },

        // Observer seguro para conteúdos carregados via AJAX no painel Laravel
        observeDOM: function () {
            let timeout = null;
            const observer = new MutationObserver((mutations) => {
                // Debounce para evitar processamento excessivo de CPU
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(() => {
                    mutations.forEach(mutation => {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                this.translateDOM(node);
                            }
                        });
                    });
                }, 300);
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            window.GU.log("[GU-Translator] MutationObserver ativo para conteúdo AJAX.");
        }
    };

    // Auto-executar se ativado na flag
    if (window.GU.flags && window.GU.flags.translator) {
        window.GU.Translator.init();
    }
})();
