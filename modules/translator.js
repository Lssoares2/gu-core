/**
 * General Unlocking - Enterprise i18n Engine (v2.0)
 * Arquiteto: Sênior Full-Stack / Especialista DOM & UX
 */
(function () {
    'use strict';

    // Dicionário Oficial PT-BR (Mapeamento Exato)
    const dictionary = {
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
        "Miniutes": "Minutos",
        "days": "dias",
        "Hours": "Horas",
        "New User": "Novo Usuário",
        "Existing User": "Usuário Existente",
        "No Refund": "Sem Reembolso",
        "Wrong Carrier No Refund": "Operadora Incorreta Sem Reembolso",
        "Clean IMEI": "IMEI Limpo"
    };

    class GUTranslator {
        constructor(dict) {
            this.dict = dict;
            this.init();
        }

        // Normaliza o texto removendo excesso de espaços e quebras invisíveis
        cleanText(text) {
            return text ? text.replace(/\s+/g, ' ').trim() : '';
        }

        translateNode(node) {
            // Varre apenas nós de texto para não quebrar a árvore de elementos HTML
            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
            let textNode;

            while (textNode = walker.nextNode()) {
                let originalText = textNode.nodeValue;
                let trimmed = this.cleanText(originalText);

                if (this.dict[trimmed]) {
                    // Preserva espaçamentos originais das pontas se houverem
                    const leadingSpace = originalText.match(/^\s*/)[0];
                    const trailingSpace = originalText.match(/\s*$/)[0];
                    textNode.nodeValue = leadingSpace + this.dict[trimmed] + trailingSpace;
                }
            }

            // Traduz também atributos comuns como placeholder, title e alt
            const elementsWithAttributes = node.querySelectorAll ? node.querySelectorAll('[placeholder], [title], [alt]') : [];
            elementsWithAttributes.forEach(el => {
                ['placeholder', 'title', 'alt'].forEach(attr => {
                    const val = el.getAttribute(attr);
                    if (val) {
                        const cleanedVal = this.cleanText(val);
                        if (this.dict[cleanedVal]) {
                            el.setAttribute(attr, this.dict[cleanedVal]);
                        }
                    }
                });
            });
        }

        run() {
            this.translateNode(document.body);
        }

        init() {
            // Executa assim que o DOM estiver pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.run());
            } else {
                this.run();
            }

            // MutationObserver: Monitora inserções dinâmicas de conteúdo via AJAX / API / JS
            const observer = new MutationObserver((mutations) => {
                let shouldTranslate = false;
                for (let mutation of mutations) {
                    if (mutation.addedNodes.length > 0) {
                        shouldTranslate = true;
                        break;
                    }
                }
                if (shouldTranslate) {
                    // Debounce leve para otimizar performance do DOM
                    clearTimeout(this.debounceTimer);
                    this.debounceTimer = setTimeout(() => this.run(), 50);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            console.info("[GU-Translator] Motor de i18n ativo e escutando mutações do DOM com sucesso.");
        }
    }

    // Inicialização global segura
    window.GUTranslatorInstance = new GUTranslator(dictionary);
})();
