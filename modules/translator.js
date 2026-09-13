/**
 * General Unlocking - Enterprise i18n Engine (v7.0)
 * Arquiteto: Sênior Full-Stack / Especialista DOM & UX (Blindagem contra loops)
 */
(function () {
    'use strict';

    // 1. Dicionário de Termos Estáticos Exatos (Menus, Títulos, Links)
    const exactDictionary = {
        "dashboard": "Painel",
        "order history": "Histórico de Pedidos",
        "statement": "Extrato",
        "invoice": "Fatura",
        "add balance": "Adicionar Saldo",
        "logout": "Sair",
        "home": "Início",
        "company": "Empresa",
        "about us": "Sobre Nós",
        "contact us": "Fale Conosco",
        "reseller panel": "Painel de Revendedor",
        "free imei checker": "Consulta IMEI Grátis",
        "quick access": "Acesso Rápido",
        "services": "Serviços",
        "place order": "Fazer Pedido",
        "mass order": "Pedido em Massa",
        "api": "API",
        "tickets": "Tickets",
        "add funds": "Adicionar Fundos",
        "settings": "Configurações",
        "profile": "Perfil",
        "imei service list": "Lista de Serviços IMEI",
        "server service list": "Lista de Serviços de Servidor",
        "remote service": "Serviço Remoto",
        "service by group": "Serviços por Grupo",
        "best selling": "Mais Vendidos",
        "search": "Pesquisar",
        "search service": "Pesquisar Serviço",
        "status": "Status",
        "price": "Preço",
        "action": "Ação",
        "submit": "Enviar",
        "cancel": "Cancelar",
        "service": "Serviço",
        "description": "Descrição",
        "type": "Tipo",
        "tools": "Ferramentas",
        "total": "Total",
        "quantity": "Quantidade",
        "view all": "Ver Todos",
        "id": "ID",
        "time": "Prazo",
        "average time": "Tempo Médio",
        "available balance": "Saldo Disponível",
        "locked balance": "Saldo Bloqueado",
        "total receipts": "Total de Recebimentos",
        "waiting action": "Aguardando Ação",
        "in process": "Em Processamento",
        "sucesso": "Sucesso",
        "success": "Sucesso",
        "error": "Erro",
        "pending": "Pendente",
        "processing": "Processando",
        "completed": "Concluído",
        "rejected": "Rejeitado",
        "total orders placed": "Total de Pedidos Realizados",
        "order": "Pedido",
        "orders": "Pedidos",
        "fatura": "Fatura",
        "extrato": "Extrato",
        "balance deposit": "Depósito de Saldo",
        "paid": "Pago",
        "debit": "Débito",
        "quick delivery": "Entrega Rápida",
        "results within minutes": "Resultados em minutos",
        "100% secure": "100% Seguro",
        "ssl encrypted platform": "Plataforma criptografada SSL",
        "24/7 support": "Suporte 24/7",
        "always here to help you": "Sempre aqui para ajudar",
        "easy recharge": "Recarga Fácil",
        "binance, tether, visa & more": "Binance, Tether, Visa e mais",
        "legal": "Legal",
        "privacy policy": "Política de Privacidade",
        "terms of service": "Termos de Serviço",
        "delivery policy": "Política de Entrega",
        "cancellation policy": "Política de Cancelamento",
        "refund & return policy": "Política de Reembolso e Devolução",
        "get the app": "Baixe o App",
        "order, track & get support from your phone.": "Peça, acompanhe e obtenha suporte pelo celular.",
        "download on the": "Baixar na",
        "get it on": "Disponível no",
        "app store": "App Store",
        "google play": "Google Play"
    };

    // 2. Dicionário de Substituição por Expressões Regulares Seguras (Com bordas de palavras \b)
    const keywordDictionary = [
        { regex: /\bActivation\b/gi, replacement: "Ativação" },
        { regex: /\bRenewal\b/gi, replacement: "Renovação" },
        { regex: /\bRenew\b/gi, replacement: "Renovar" },
        { regex: /\bExtand\b/gi, replacement: "Estender" },
        { regex: /\bExtend\b/gi, replacement: "Estender" },
        { regex: /\bCredits?\b/gi, replacement: "Créditos" },
        { regex: /\bNew User\b/gi, replacement: "Novo Usuário" },
        { regex: /\bOld User\b/gi, replacement: "Usuário Antigo" },
        { regex: /\bExisting User\b/gi, replacement: "Usuário Existente" },
        { regex: /\bMiniutes\b/gi, replacement: "Minutos" },
        { regex: /\bMinutes\b/gi, replacement: "Minutos" },
        { regex: /\bHours\b/gi, replacement: "Horas" },
        { regex: /\bDays\b/gi, replacement: "Dias" },
        { regex: /\bMonths?\b/gi, replacement: "Mê(se)s".replace(/[\(\)]/g, '') }, // Tratamento limpo
        { regex: /\bMonth\b/gi, replacement: "Mês" },
        { regex: /\bMonths\b/gi, replacement: "Meses" },
        { regex: /\bYears?\b/gi, replacement: "Ano(s)".replace(/[\(\)]/g, '') },
        { regex: /\bYear\b/gi, replacement: "Ano" },
        { regex: /\bYears\b/gi, replacement: "Anos" },
        { regex: /\bInstantâneo\b/gi, replacement: "Instantâneo" },
        { regex: /\bInstant\b/gi, replacement: "Instantâneo" },
        { regex: /\bDirect\b/gi, replacement: "Direto" },
        { regex: /\bWithout Extra Pack\b/gi, replacement: "Sem Pacote Extra" },
        { regex: /\bExisting Account\b/gi, replacement: "Conta Existente" },
        { regex: /\bLicense\b/gi, replacement: "Licença" },
        { regex: /\bSubscription\b/gi, replacement: "Assinatura" },
        { regex: /\bAny Quantity\b/gi, replacement: "Qualquer Quantidade" },
        { regex: /\bMust be Registration After Order\b/gi, replacement: "Deve ser registrado após o pedido" },
        { regex: /\bBefore order, must be login\b/gi, replacement: "Antes do pedido, deve fazer login" },
        { regex: /\bNo Refund any issue\b/gi, replacement: "Sem reembolso para qualquer problema" },
        { regex: /\bNo Refund\b/gi, replacement: "Sem Reembolso" },
        { regex: /\bactivation for\b/gi, replacement: "ativação para" },
        { regex: /\bfor\b/gi, replacement: "para" }
    ];

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
            if (!originalText || originalText.trim().length === 0) return;

            // TRAVA DE SEGURANÇA: Se o nó já foi marcado como traduzido, ignora para evitar loop
            if (textNode.parentNode && textNode.parentNode.getAttribute('data-gu-translated') === 'true') {
                return;
            }

            let trimmed = this.cleanText(originalText);
            let lowerTrimmed = trimmed.toLowerCase();

            // 1. Correspondência Exata
            if (exactDictionary[lowerTrimmed]) {
                const leadingSpace = originalText.match(/^\s*/)[0];
                const trailingSpace = originalText.match(/\s*$/)[0];
                textNode.nodeValue = leadingSpace + exactDictionary[lowerTrimmed] + trailingSpace;
                if (textNode.parentNode) textNode.parentNode.setAttribute('data-gu-translated', 'true');
                return;
            }

            // 2. Substituição por Palavras-Chave (Protegida contra repetição)
            let modifiedText = originalText;
            let hasChanged = false;

            keywordDictionary.forEach(item => {
                // Aplica apenas se a palavra alvo existir no texto e ainda não tiver sido traduzida
                if (item.regex.test(modifiedText)) {
                    modifiedText = modifiedText.replace(item.regex, item.replacement);
                    hasChanged = true;
                }
            });

            if (hasChanged && modifiedText !== originalText) {
                // Evita duplicações acidentais caso o regex rode de novo
                modifiedText = modifiedText.replace(/Instantâneoâneo+/g, 'Instantâneo');
                modifiedText = modifiedText.replace(/Minutosnutos+/g, 'Minutos');
                
                textNode.nodeValue = modifiedText;
                if (textNode.parentNode) textNode.parentNode.setAttribute('data-gu-translated', 'true');
            }
        }

        run(rootNode = document.body) {
            if (!rootNode) return;

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
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.run());
            } else {
                this.run();
            }

            // Execuções pontuais iniciais sem loop agressivo
            setTimeout(() => this.run(), 500);
            setTimeout(() => this.run(), 1500);

            console.info("[GU-Translator v7.0] Motor blindado contra loops ativado com sucesso.");
        }
    }

    window.GUTranslatorInstance = new GUTranslator();
})();
