/**
 * General Unlocking - Enterprise i18n Engine (v8.0)
 * Arquiteto: Sênior Full-Stack / Especialista DOM & UX (Dicionário Expandido)
 */
(function () {
    'use strict';

    // 1. Dicionário de Termos Estáticos Exatos (Incluindo os novos termos solicitados)
    const exactDictionary = {
        // Painel e Navegação
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
        
        // Listas e Busca
        "imei service list": "Lista de Serviços IMEI",
        "server service list": "Lista de Serviços de Servidor",
        "server service": "Serviço de Servidor",
        "search service": "Pesquisar Serviço",
        "search service": "Pesquisar Serviço",
        "remote service": "Serviço Remoto",
        "service by group": "Serviços por Grupo",
        "best selling": "Mais Vendidos",
        "search": "Pesquisar",
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
        "customer": "Cliente",

        // Configurações de Conta, Senha e Segurança
        "current password": "Senha Atual",
        "new password": "Nova Senha",
        "password strength": "Força da Senha",
        "enter a password": "Digite uma senha",
        "at least 8 characters": "Pelo menos 8 caracteres",
        "one lowercase letter": "Uma letra minúscula",
        "one uppercase letter": "Uma letra maiúscula",
        "one special character": "Um caractere especial",
        "logout if ip changed": "Sair se o IP mudar",
        "enable 2fa - eamil otp": "Ativar 2FA - OTP por E-mail",
        "enable 2fa - email otp": "Ativar 2FA - OTP por E-mail",
        "enable 2fa - mobile app": "Ativar 2FA - Aplicativo Móvel",
        "security": "Segurança",
        "api acess": "Acesso à API",
        "api access": "Acesso à API",

        // Detalhes de Pedidos e Chamados (Tickets)
        "order id:": "ID DO PEDIDO:",
        "amount": "Valor",
        "success": "Sucesso",
        "sucesso": "Sucesso",
        "timeline": "Linha do Tempo",
        "submitted": "Enviado",
        "replied": "Respondido",
        "processing": "Processando",
        "reply": "Responder",
        "copy": "Copiar",
        "error": "Erro",
        "pending": "Pendente",
        "completed": "Concluído",
        "rejected": "Rejeitado",

        // Painel Financeiro e Métricas
        "available balance": "Saldo Disponível",
        "locked balance": "Saldo Bloqueado",
        "total receipts": "Total de Recebimentos",
        "waiting action": "Aguardando Ação",
        "in process": "Em Processamento",
        "total orders placed": "Total de Pedidos Realizados",
        "order": "Pedido",
        "orders": "Pedidos",
        "fatura": "Fatura",
        "extrato": "Extrato",
        "balance deposit": "Depósito de Saldo",
        "paid": "Pago",
        "debit": "Débito",

        // Rodapé e Marketing
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

    // 2. Dicionário de Substituição por Expressões Regulares Seguras
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
        { regex: /\bMonth\b/gi, replacement: "Mês" },
        { regex: /\bMonths\b/gi, replacement: "Meses" },
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
        { regex: /\bNo Refund\b/gi, replacement: "Sem Reembolso" }
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

            if (textNode.parentNode && textNode.parentNode.getAttribute('data-gu-translated') === 'true') {
                return;
            }

            let trimmed = this.cleanText(originalText);
            let lowerTrimmed = trimmed.toLowerCase();

            if (exactDictionary[lowerTrimmed]) {
                const leadingSpace = originalText.match(/^\s*/)[0];
                const trailingSpace = originalText.match(/\s*$/)[0];
                textNode.nodeValue = leadingSpace + exactDictionary[lowerTrimmed] + trailingSpace;
                if (textNode.parentNode) textNode.parentNode.setAttribute('data-gu-translated', 'true');
                return;
            }

            let modifiedText = originalText;
            let hasChanged = false;

            keywordDictionary.forEach(item => {
                if (item.regex.test(modifiedText)) {
                    modifiedText = modifiedText.replace(item.regex, item.replacement);
                    hasChanged = true;
                }
            });

            if (hasChanged && modifiedText !== originalText) {
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

            setTimeout(() => this.run(), 500);
            setTimeout(() => this.run(), 1500);

            console.info("[GU-Translator v8.0] Dicionário de Segurança e Configurações integrado.");
        }
    }

    window.GUTranslatorInstance = new GUTranslator();
})();
