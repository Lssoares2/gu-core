/**
 * General Unlocking - Enterprise i18n Engine (v5.0)
 * Arquiteto: Sênior Full-Stack / Especialista DOM & UX
 */
(function () {
    'use strict';

    // Dicionário Abrangente (Painel + Menus + Status + Termos Comuns)
    const rawDictionary = {
        // Navegação e Topo / Menus Principais
        "Dashboard": "Painel",
        "Order History": "Histórico de Pedidos",
        "Statement": "Extrato",
        "Invoice": "Fatura",
        "Add Balance": "Adicionar Saldo",
        "Logout": "Sair",
        "Home": "Início",
        "Company": "Empresa",
        "About Us": "Sobre Nós",
        "Contact Us": "Fale Conosco",
        "Reseller Panel": "Painel de Revendedor",
        "Free IMEI Checker": "Consulta IMEI Grátis",
        "Quick Access": "Acesso Rápido",
        "Services": "Serviços",
        "Place Order": "Fazer Pedido",
        "Mass Order": "Pedido em Massa",
        "API": "API",
        "Tickets": "Tickets",
        "Add Funds": "Adicionar Fundos",
        "Settings": "Configurações",
        "Profile": "Perfil",
        
        // Listas e Filtros
        "IMEI Service List": "Lista de Serviços IMEI",
        "Server Service List": "Lista de Serviços de Servidor",
        "Remote Service": "Serviço Remoto",
        "Service by Group": "Serviços por Grupo",
        "Best Selling": "Mais Vendidos",
        "Search": "Pesquisar",
        "Search Service": "Pesquisar Serviço",
        "Status": "Status",
        "Price": "Preço",
        "Action": "Ação",
        "Submit": "Enviar",
        "Cancel": "Cancelar",
        "Service": "Serviço",
        "Description": "Descrição",
        "Type": "Tipo",
        "Tools": "Ferramentas",
        "Total": "Total",
        "Quantity": "Quantidade",
        "View All": "Ver Todos",
        "ID": "ID",
        "Time": "Prazo",
        "Average Time": "Tempo Médio",

        // Painel Financeiro e Métricas
        "Available Balance": "Saldo Disponível",
        "Locked Balance": "Saldo Bloqueado",
        "Total Receipts": "Total de Recebimentos",
        "Waiting Action": "Aguardando Ação",
        "In Process": "Em Processamento",
        "Sucesso": "Sucesso",
        "Success": "Sucesso",
        "Error": "Erro",
        "Pending": "Pendente",
        "Processing": "Processando",
        "Completed": "Concluído",
        "Rejected": "Rejeitado",
        "Total Orders Placed": "Total de Pedidos Realizados",
        "Order": "Pedido",
        "Orders": "Pedidos",
        "Fatura": "Fatura",
        "Extrato": "Extrato",
        "Balance Deposit": "Depósito de Saldo",
        "Paid": "Pago",
        "Debit": "Débito",

        // Prazos e Status de Entrega
        "Instant": "Instantâneo",
        "Instantâneo": "Instantâneo",
        "Minutes": "Minutos",
        "Miniutes": "Minutos",
        "Instant Minutes": "Instantâneo",
        "Instant Miniutes": "Instantâneo",
        "days": "dias",
        "Hours": "Horas",

        // Alertas e Regras de Operadoras
        "No Refund": "Sem Reembolso",
        "Wrong Carrier No Refund": "Operadora Incorreta Sem Reembolso",
        "Wrong Carrier Or Model No Refund": "Operadora ou Modelo Incorreto Sem Reembolso",
        "Clean IMEI": "IMEI Limpo",
        "New User": "Novo Usuário",
        "Existing User": "Usuário Existente",

        // Termos comuns em descrições de serviços e ferramentas
        "Activation": "Ativação",
        "Renewal": "Renovação",
        "Credits": "Créditos",
        "Credits Pack": "Pacote de Créditos",
        "Direct": "Direto",
        "Without Extra Pack": "Sem Pacote Extra",
        "Any Quantity": "Qualquer Quantidade",
        "Must be Registration After Order": "Deve ser registrado após o pedido",
        "Before order, must be login": "Antes do pedido, deve fazer login",

        // Módulos e Documentação API
        "Recource": "Recurso",
        "Dhru Fusion API Module": "Módulo API Dhru Fusion",
        "Auto Update Price": "Atualização Automática de Preços",
        "Order Send & Get": "Enviar e Receber Pedidos",
        "Note: This module is only for Dhru Fusion": "Nota: Este módulo é apenas para Dhru Fusion",
        "GSM Theme Client API Documentation": "Documentação da API do Cliente GSM Theme",
        "Building a custom unlocking platform?": "Construindo uma plataforma de desbloqueio personalizada?",
        "This documentation is for you.": "Esta documentação é para você.",
        "GSM Theme Compatible API Documentation": "Documentação da API Compatível com GSM Theme",
        "Creating a tools website with order integration?": "Criando um site de ferramentas com integração de pedidos?",

        // Rodapé e Marketing
        "Quick Delivery": "Entrega Rápida",
        "Results within minutes": "Resultados em minutos",
        "100% Secure": "100% Seguro",
        "SSL encrypted platform": "Plataforma criptografada SSL",
        "24/7 Support": "Suporte 24/7",
        "Always here to help you": "Sempre aqui para ajudar",
        "Easy Recharge": "Recarga Fácil",
        "Binance, Tether, Visa & more": "Binance, Tether, Visa e mais",
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
        "Google Play": "Google Play"
    };

    // Indexa em lowercase para busca insensible a maiúsculas/minúsculas
    const dictionary = {};
    for (const key in rawDictionary) {
        dictionary[key.toLowerCase().trim()] = rawDictionary[key];
    }

    class GUTranslator {
        constructor() {
            this.isTranslating = false;
            this.init();
        }

        cleanText(text) {
            return text ? text.replace(/\s+/g, ' ').trim() : '';
        }

        translateTextNode(textNode) {
            let originalText = textNode.nodeValue;
            let trimmed = this.cleanText(originalText);
            let lowerTrimmed = trimmed.toLowerCase();

            if (dictionary[lowerTrimmed]) {
                const leadingSpace = originalText.match(/^\s*/)[0];
                const trailingSpace = originalText.match(/\s*$/)[0];
                textNode.nodeValue = leadingSpace + dictionary[lowerTrimmed] + trailingSpace;
            }
        }

        translateElementAttributes(element) {
            if (!element.querySelectorAll) return;
            
            // Atributos de input, placeholders e títulos
            const elements = element.querySelectorAll('[placeholder], [title], [alt], [value]');
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

        run(rootNode = document.body) {
            if (!rootNode) return;

            // Varredura de nós de texto de alta performance
            const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
                acceptNode: (n) => {
                    const parent = n.parentNode;
                    if (parent && ['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE'].includes(parent.tagName)) {
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
                this.translateTextNode(textNode);
            }

            this.translateElementAttributes(rootNode);
        }

        init() {
            // Executa imediatamente no carregamento
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.run());
            } else {
                this.run();
            }

            // Intervalo de varredura ativa agressiva para apanhar dados injetados por AJAX tardio
            const aggressiveIntervals = [100, 300, 600, 1200, 2500, 5000];
            aggressiveIntervals.forEach(ms => {
                setTimeout(() => this.run(), ms);
            });

            // MutationObserver inteligente e contínuo para qualquer mudança na árvore DOM
            const observer = new MutationObserver((mutations) => {
                if (this.isTranslating) return;
                
                let hasNewNodes = false;
                for (let mutation of mutations) {
                    if (mutation.addedNodes.length > 0) {
                        hasNewNodes = true;
                        break;
                    }
                }

                if (hasNewNodes) {
                    this.isTranslating = true;
                    clearTimeout(this.debounceTimer);
                    this.debounceTimer = setTimeout(() => {
                        this.run();
                        this.isTranslating = false;
                    }, 150);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            console.info("[GU-Translator v5.0] Motor Híbrido Contínuo ativado. Listas e menus monitorados.");
        }
    }

    window.GUTranslatorInstance = new GUTranslator();
})();
