/**
 * General Unlocking - Enterprise i18n Engine (v3.0)
 * Arquiteto: Sênior Full-Stack / Especialista DOM & UX
 */
(function () {
    'use strict';

    // Dicionário Expandido e Normalizado (Chaves em lowercase para match infalível)
    const rawDictionary = {
        "Dashboard": "Painel",
        "Order History": "Histórico de Pedidos",
        "Statement": "Extrato",
        "Invoice": "Fatura",
        "Add Balance": "Adicionar Saldo",
        "Logout": "Sair",
        "IMEI Service List": "Lista de Serviços IMEI",
        "Server Service List": "Lista de Serviços de Servidor",
        "Home": "Início",
        "Quick Delivery": "Entrega Rápida",
        "Results within minutes": "Resultados em minutos",
        "100% Secure": "100% Seguro",
        "SSL encrypted platform": "Plataforma criptografada SSL",
        "24/7 Support": "Suporte 24/7",
        "Always here to help you": "Sempre aqui para ajudar",
        "Easy Recharge": "Recarga Fácil",
        "Binance, Tether, Visa & more": "Binance, Tether, Visa e mais",
        "Company": "Empresa",
        "About Us": "Sobre Nós",
        "Contact Us": "Fale Conosco",
        "Reseller Panel": "Painel de Revendedor",
        "Free IMEI Checker": "Consulta IMEI Grátis",
        "Quick Access": "Acesso Rápido",
        "Remote Service": "Serviço Remoto",
        "Service by Group": "Serviços por Grupo",
        "Best Selling": "Mais Vendidos",
        "Legal": "Legal",
        "Privacy Policy": "Política de Privacidade",
        "Terms of Service": "Termos de Serviço",
        "Delivery Policy": "Política de Entrega",
        "Cancellation Policy": "Política de Cancelamento",
        "Refund & Return Policy": "Política de Reembolso e Devolução",
        "Get the App": "Baixe o App",
        "Order, track & get support from your phone.": "Peça, acompanhe e obtenha suporte pelo celular.",
        "Download on the": "Baixar na",
        "Get it on": "Disponível no",
        "App Store": "App Store",
        "Google Play": "Google Play",
        "Search": "Pesquisar",
        "Status": "Status",
        "Price": "Preço",
        "Action": "Ação",
        "Submit": "Enviar",
        "Cancel": "Cancelar",
        "Success": "Sucesso",
        "Error": "Erro",
        "Pending": "Pendente",
        "Processing": "Processando",
        "Completed": "Concluído",
        "Rejected": "Rejeitado",
        "Instant": "Instantâneo",
        "Minutes": "Minutos",
        "Miniutes": "Minutos",
        "days": "dias",
        "Hours": "Horas",
        "New User": "Novo Usuário",
        "Existing User": "Usuário Existente",
        "No Refund": "Sem Reembolso",
        "Wrong Carrier No Refund": "Operadora Incorreta Sem Reembolso",
        "Clean IMEI": "IMEI Limpo",
        // Adicionando variações comuns extras encontradas em painéis GSM padrão
        "Place Order": "Fazer Pedido",
        "View All": "Ver Todos",
        "Total": "Total",
        "Quantity": "Quantidade",
        "Service": "Serviço",
        "Description": "Descrição",
        "Type": "Tipo",
        "API": "API",
        "Tools": "Ferramentas"
    };

    // Indexa o dicionário em lowercase para permitir busca case-insensitive perfeita
    const dictionary = {};
    for (const key in rawDictionary) {
        dictionary[key.toLowerCase().trim()] = rawDictionary[key];
    }

    class GUTranslator {
        constructor() {
            this.init();
        }

        cleanText(text) {
            return text ? text.replace(/\s+/g, ' ').trim() : '';
        }

        translateNode(node) {
            if (!node || node.nodeType === Node.COMMENT_NODE) return;

            // 1. Traduz nós de texto
            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
                acceptNode: (n) => {
                    // Evita traduzir scripts, estilos ou campos de texto editáveis ativos
                    const parent = n.parentNode;
                    if (parent && ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    if (parent && parent.isContentEditable) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }, false);

            let textNode;
            while (textNode = walker.nextNode()) {
                let originalText = textNode.nodeValue;
                let trimmed = this.cleanText(originalText);
                let lowerTrimmed = trimmed.toLowerCase();

                if (dictionary[lowerTrimmed]) {
                    const leadingSpace = originalText.match(/^\s*/)[0];
                    const trailingSpace = originalText.match(/\s*$/)[0];
                    
                    let translated = dictionary[lowerTrimmed];
                    
                    // Preserva a capitalização original se a palavra original estiver em Title Case ou ALL CAPS (opcional, mas seguro manter a tradução padrão mapeada)
                    textNode.nodeValue = leadingSpace + translated + trailingSpace;
                }
            }

            // 2. Traduz atributos interativos e informativos
            const elements = node.querySelectorAll ? node.querySelectorAll('[placeholder], [title], [alt], [value]') : [];
            elements.forEach(el => {
                ['placeholder', 'title', 'alt'].forEach(attr => {
                    const val = el.getAttribute(attr);
                    if (val) {
                        const cleaned = this.cleanText(val).toLowerCase();
                        if (dictionary[cleaned]) {
                            el.setAttribute(attr, dictionary[cleaned]);
                        }
                    }
                });
                
                // Para inputs do tipo botão ou submit que usam o atributo value
                if (el.tagName === 'INPUT' && ['submit', 'button', 'reset'].includes(el.type)) {
                    const val = el.value;
                    if (val) {
                        const cleaned = this.cleanText(val).toLowerCase();
                        if (dictionary[cleaned]) {
                            el.value = dictionary[cleaned];
                        }
                    }
                }
            });
        }

        run() {
            this.translateNode(document.body);
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.run());
            } else {
                this.run();
            }

            // Executa múltiplas vezes nos primeiros segundos para capturar renderizações pesadas de SDKs de painel
            setTimeout(() => this.run(), 300);
            setTimeout(() => this.run(), 1000);
            setTimeout(() => this.run(), 2500);

            // MutationObserver inteligente para AJAX e Single Page Apps (SPA)
            const observer = new MutationObserver((mutations) => {
                let shouldTranslate = false;
                for (let mutation of mutations) {
                    if (mutation.addedNodes.length > 0) {
                        for (let node of mutation.addedNodes) {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                shouldTranslate = true;
                                break;
                            }
                        }
                    }
                    if (shouldTranslate) break;
                }

                if (shouldTranslate) {
                    clearTimeout(this.debounceTimer);
                    this.debounceTimer = setTimeout(() => this.run(), 100);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            console.info("[GU-Translator v3.0] Motor de i18n blindado ativado com sucesso.");
        }
    }

    window.GUTranslatorInstance = new GUTranslator();
})();
