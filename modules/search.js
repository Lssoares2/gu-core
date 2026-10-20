/**
 * GU-Core: Global Search Engine (v2.0)
 * Arquiteto: Sênior Full-Stack / Especialista DOM & UX
 * Base de dados estática completa integrada para busca instantânea.
 */
(function () {
    window.GU = window.GU || {};

    // Base de Dados Completa dos Produtos do Painel (148 itens oficiais)
    const GLOBAL_PRODUCTS_DATABASE = [
        "Phoenix Service Tool [ SAMSUNG + Nokia HMD TOOL + OPPO + Realme + OnePlus ] (FLASH - FRP - FACTORY RESET)",
        "UnlockTool 12 Months NEW / RENEW License",
        "UnlockTool 3 Months NEW / RENEW License",
        "UnlockTool 6 Months NEW / RENEW License",
        "TSM-TOOL Pro 1 Years",
        "TSM-TOOL Pro 3 Months",
        "TSM-TOOL Pro 6 month",
        "Android Multi Tool - 1 Year Activation(AMT)",
        "Android Multi Tool - 3 Month Activation(AMT)",
        "Android Multi Tool - 6 Month Activation(AMT)",
        "Android Multi Tool (AMT) - Credits",
        "TFM Pro tool 1 Year Activation",
        "TFM Pro tool 2 Year Activation",
        "TFM Pro tool 3 Months Activation",
        "TFM Pro tool Credit",
        "Samsung Tool KG Bypass 1 Year",
        "Samsung Tool KG Bypass 3 Months",
        "Samsung Tool KG Bypass 6 Months",
        "Samsung Tool Kg Credits For Existing User",
        "Fast Unlocker Pro [ Samsung + LG + Alcatel + TINNO ...etc ] NEW USER",
        "Fast Unlocker Pro [ Samsung + LG + Alcatel + TINNO ...etc ] OLD USER",
        "Chimera Tool Basic - 12 Months",
        "Chimera Tool Credits",
        "Chimera Tool Premium - 12 Months",
        "Chimera Tool Professional - 12 Months",
        "MDM Fix Tool Activation for [1 Year]",
        "MDM Fix Tool Activation for [3 Months]",
        "KGFixTool Activation for - 3 Months [ AUTO API ]",
        "KGFixTool Activation for - 6 Months [ AUTO API ]",
        "KGFixTool Activation for - 12 Months [ AUTO API ]",
        "KG Killer Tool Activation for - 1 Year [ AUTO API ]",
        "Android Win Tool ( AWT ) Activation for - 30 Days",
        "Android Win Tool ( AWT ) Activation for - 3 Months",
        "Android Win Tool ( AWT ) Activation for - 1 Year",
        "Android Win Tool ( AWT ) Credits",
        "DFT Pro Tool New Activation for [1 Year] Direct",
        "DFT Pro Tool Renewal for [1 Year] Direct",
        "Piranha Tool 12 Months License",
        "Piranha Tool 6 Months License",
        "Piranha Tool 3 Months License",
        "Piranha Tool 1 Month License",
        "DFT Pro Extand Existing For 2 Year - Direct",
        "DFT Pro New Activation For 2 Year - Direct",
        "Piranha Tool Credits (Existing User)",
        "EFT Dongle Activation for [1 Year]",
        "EFT Dongle Activation for [2 Year]",
        "EFT Pro Digital Activation for [1 Months]",
        "EFT Pro Digital Activation for [3 Months]",
        "EFT Pro Digital Activation for [6 Months]",
        "EFT Pro Digital Activation for [1 Year]",
        "EFT Pro Digital Renewal for [1 Year]",
        "Z3X SamsTool Digital Online 1 Year Subscription",
        "Hydra Tool 50 Credits Pack",
        "Hydra Tool 100 Credits Pack",
        "Hydra Tool 20 Credits Pack",
        "Hydra Tool 10 Credits Pack",
        "Octoplus Samsung Tool 1 Year Activation Renew Extand for Box / Dongle",
        "GAProLogin Tool - Realme OTP",
        "GAProLogin Tool - OnePlus OTP",
        "GAProLogin Tool - Oppo OTP",
        "Apizu Tool Activation for (3 Months Plan)",
        "Apizu Tool Activation for (6 Months Plan)",
        "Apizu Tool Activation for (1 Year Plan)",
        "Griffin Unlocker New Activation for [1 Year] Without Extra Pack",
        "Griffin Unlocker New Activation for [6 Months] Without Extra Pack",
        "Griffin Unlocker New Activation for [3 Months] Without Extra Pack",
        "Griffin Unlocker Renewal for [1 Year]",
        "Griffin Unlocker Renewal for [6 Months]",
        "Griffin Unlocker Renewal for [3 Months]",
        "Griffin-Unlocker Premium Pack Access Activation",
        "The GuerraTool Motorola [ Factory Enable, FRP, UNLOCK, READ NCK ] - NEW USER",
        "THE GUERRATOOL MOTOROLA MTK/SPD (REPAIR IMEI, MDM, UNLOCK, READ NCK) - EXISTING USER",
        "The Magic Tool Motorola Credits",
        "SamsungTool.us + SST + CellTool.io – Ativo por 1 dia + 10 créditos grátis",
        "Teste de Conectividade API (FREE)",
        "67 Cafe Racer",
        "Bypass Passcode/ Disable iOS 11/12/13/14/15/16 without Jailbreak",
        "Consulta CPF CADSUS / DataSUS",
        "Consulta CPF Completo (BigData)",
        "Consulta E-mail & Senhas",
        "Consulta por Nome Completo",
        "Consulta Telefônica / Celular",
        "Consulta Veicular (Placa)",
        "Borneo Schematics 1 User (12 Months)",
        "Borneo Schematics 1 User (3 Months)",
        "Borneo Schematics 1 User (6 Months)",
        "Android Multitool ALUGUEL AMT ☛ [3 HORAS]",
        "DFT Pro Tool ALUGUEL [48 HORAS]",
        "Kg Killer Tool ALUGUEL [4 HORAS]",
        "TFM Tool Pro ALUGUEL [6 HORAS]",
        "TSM-Tools ALUGUEL [ 6 HORAS ]",
        "UNLOCK TOOL ALUGUEL [6 HORAS]",
        "A12 Passcode (XR/XS/Max) - FONTE BR",
        "A12-A13 Hello Screen (Sem Sinal) FONTE BR",
        "A13 Passcode (11/SE2) - FONTE BR",
        "Virtual Box (30 Minutos)",
        "Virtual Box (60 Minutos)",
        "Samsung Tool (Cell Tool SST) [60 Minutos - Sem Créditos]",
        "AnyDesk Oficial 30 Dias",
        "Tudo em um (Verificação Pro) [ Operadora ] [IMEI/SN]",
        "Mac Activation Lock status (iMac/MacBook) FMI On/Off Check",
        "Samsung check information by [IMEI/SN]",
        "AT&T USA - All Apple & Generic Models Checker + Unlock [Clean]",
        "Samsung check information and Knox Guard (KG) Enrollment status",
        "HONOR IMEI/SN CHECK INFO",
        "Apple iPhone/iPad FMI ON/OFF Checker Service",
        "Apple Macbook/iMac FMI ON/OFF Checker - BY SN",
        "4118 Apple All Devices Activation Status Checker",
        "Apple iPhone / iPad / iMac / Macbook MDM Checker",
        "Apple iPhone FMI ON/OFF & iCloud CLEAN/LOST Check Service",
        "ITEL / TECNO / SONIM / INFINIX IMEI Check Info Activation",
        "Xiaomi Find check full information + Activation time, country + Clean Lost",
        "Oppo / Realme / OnePlus IMEI Check Full Purchase Country",
        "ZTE Full Carrier + Warranty info Checker",
        "Motorola Worldwide Unlock Codes + Check",
        "USA T-Mobile, MetroPCS Clean/Blocked Check",
        "US Verizon iPhone Eligible Check",
        "USA/Canada Blacklist Check",
        "Japan NTT Docomo Clean/Lost Check",
        "Japan KDDI/AU/UQ Clean/Lost Check",
        "Japan Softbank Clean/Lost Check",
        "GSMA Blacklist Worldwide Check",
        "GSMA Blacklist Worldwide Pro Check",
        "US C Spire iPhone All Models Status Check+Unlock",
        "US Spectrum iPhone Eligible Check",
        "USA AT&T Clean Unlocked & Check",
        "Tracfone / Straight Talk USA ( Status Check )",
        "Xiaomi Find check full information + Sales [ BY IMEI SUPPORTED]",
        "Apple / iPhone Carrier + SIM-Lock + FMI + COVERAGE",
        "All In One Apple Full Details (with Carrier)",
        "APPLE iPHONE CARRIER + FMI + COVERAGE + BLACKLIST",
        "Apple FULL INFO + Carrier/SimLock",
        "Samsung EUROPE All Model & Carrier - NCK & MCK",
        "XFINITY USA - iPhone All Models Including 15 Pro Max",
        "XFINITY USA - iPhone All Models Including 16 Pro Max",
        "Verizon USA - iPhone All Models Unlock",
        "Spectrum USA iPhone All Models UNLOCK ( Clean IMEI )",
        "Spectrum USA iPhone All Models UNLOCK ( Premium/PRO IMEI )",
        "Australia All Carriers iPhone all models",
        "Australia All Carriers Android all models",
        "US / USA Reseller Flex Policy iPhone All Models",
        "US / USA Cricket - iPhone All Models",
        "Tracfone / StraightTalk USA iPhone All Modes Unlock",
        "Liberty Puerto Rico ( iPhone up to iPhone 11 Pro Max)",
        "Liberty Puerto Rico (All up to iPhone 12 Pro Max)",
        "Liberty Puerto Rico (All up to iPhone 13 Series & 14 Pro Max)",
        "Liberty Puerto Rico (All up to iPhone 15 Pro Max)",
        "Liberty Puerto Rico (All up to iPhone 16 Pro Max)",
        "Liberty Puerto Rico (All up to iPhone 17 Pro Max)",
        "Liberty Puerto Rico (All up to iPhone XS Max)",
        "Metro USA iPhone All Models Unlock",
        "C Spire USA iPhone All Models",
        "Boost / Dish USA (All up to iPhone 14 Pro Max)",
        "Boost / Dish USA (All up to iPhone 15 Pro Max)",
        "Boost / Dish USA (All up to iPhone 16 Pro Max)",
        "Boost / Dish USA (All up to iPhone 17 Pro Max)",
        "Vodafone UK (iPhone All Models)",
        "3 Hutchison UK iPhone All Models",
        "Swisscom Switzerland iPhone All Models",
        "Salt Mobile / Orange Switzerland iPhone All Models",
        "Canada Bell / MTS - Phone All Models Unlock",
        "AT&T USA ( iPhone 11 & 12 Series )",
        "AT&T USA ( iPhone 13 Series )",
        "AT&T USA ( iPhone 14 Series )",
        "AT&T USA ( iPhone 15 Series )",
        "All-in-one (Basic Info) [IMEI/SN]",
        "Google Pixel Info [IMEI]",
        "Huawei Info S1 [IMEI]",
        "Huawei Info S2 [IMEI/SN]",
        "Motorola Info [IMEI/SN]",
        "OnePlus Info [IMEI]",
        "Samsung full information + Activation, country + Sales",
        "ZTE Info [IMEI/SN]",
        "Verizon USA iPhone All Models Data information",
        "T-Mobile USA iPhone All Models Data information",
        "iPhone / iPads / iMac / MacBook Full GSX Sold By INFO",
        "Samsung Info & KNOX STATUS",
        "Samsung Info + GSMA Blacklist",
        "Mexico - Telcel Owner Info By IMEI",
        "Mexico - MOVISTAR Owner Info By IMEI",
        "Bolivia - Tigo con Owner Info By IMEI",
        "Peru - Claro Owner Info By IMEI",
        "Peru - Entel Owner Info By IMEI",
        "Peru - Movistar Owner Info By IMEI",
        "FRPFILE Finder Owner Info for Macbook, iMac T2, M1, M2, M3, M4",
        "MACBOOK / iMAC iCLOUD ON/OFF & CLEAN/LOST STATUS",
        "Orange / T-Mobile UK - iPhone All Models Premium Unlock",
        "Apple iPhone/iPad FMI On/OFF & iCloud Clean/Lost Status",
        "Xiaomi Remove MiCloud Account - Malaysia",
        "Xiaomi Remove MiCloud Account - Russia",
        "Xiaomi Remove MiCloud Account - Argentina",
        "Xiaomi Remove MiCloud Account - Japan",
        "Xiaomi Remove MiCloud Account - Belarus",
        "Xiaomi Remove MiCloud Account - Pakistan",
        "Xiaomi Remove MiCloud Account - Serbia",
        "Xiaomi Remove MiCloud Account - Kazakhstan"
    ];

    window.GU.Search = {
        init: function () {
            window.GU.log("[GU-Search] Inicializando barra de pesquisa global...");
            this.injectSearchUI();
            this.bindEvents();
        },

        injectSearchUI: function () {
            if (document.getElementById('gu-global-search-container')) return;

            const searchHTML = `
                <div id="gu-global-search-container" style="position: relative; display: inline-block; width: 100%; max-width: 450px; margin: 0 15px;">
                    <div style="position: relative;">
                        <input type="text" id="gu-global-search-input" placeholder="🔍 Pesquisar em todos os 148 serviços..." style="
                            width: 100%;
                            background: #0b0d14 !important;
                            border: 1px solid #00ff66 !important;
                            color: #e2e8f0 !important;
                            padding: 8px 15px 8px 38px;
                            border-radius: 6px;
                            font-size: 13px;
                            outline: none;
                            box-shadow: 0 0 10px rgba(0, 255, 102, 0.15);
                            transition: all 0.3s ease;
                        ">
                        <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #00ff66; pointer-events: none;">⚡</span>
                    </div>
                    <div id="gu-search-results-dropdown" style="
                        display: none;
                        position: absolute;
                        top: 105%;
                        left: 0;
                        right: 0;
                        background: #151824;
                        border: 1px solid #00ff66;
                        border-radius: 6px;
                        max-height: 350px;
                        overflow-y: auto;
                        z-index: 99999;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.9);
                    "></div>
                </div>
            `;

            const navbar = document.querySelector('.navbar-nav, .main-header .navbar, header, nav');
            if (navbar) {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = searchHTML;
                navbar.insertBefore(wrapper.firstElementChild, navbar.firstChild);
            } else {
                const fallback = document.createElement('div');
                fallback.innerHTML = searchHTML;
                fallback.style.cssText = "padding: 10px; background: #0f111a; text-align: center; border-bottom: 1px solid #262d47;";
                document.body.insertBefore(fallback, document.body.firstChild);
            }
        },

        bindEvents: function () {
            const input = document.getElementById('gu-global-search-input');
            const dropdown = document.getElementById('gu-search-results-dropdown');

            if (!input || !dropdown) return;

            input.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                
                if (query.length < 2) {
                    dropdown.style.display = 'none';
                    dropdown.innerHTML = '';
                    return;
                }

                // Filtra os produtos da base estática completa
                const matches = GLOBAL_PRODUCTS_DATABASE.filter(item => 
                    item.toLowerCase().includes(query)
                ).slice(0, 15);

                if (matches.length === 0) {
                    dropdown.innerHTML = `<div style="padding: 12px; color: #94a3b8; text-align: center; font-size: 13px;">Nenhum produto encontrado.</div>`;
                    dropdown.style.display = 'block';
                    return;
                }

                let html = '';
                matches.forEach(title => {
                    html += `
                        <div class="gu-search-result-item" style="
                            padding: 10px 15px;
                            border-bottom: 1px solid #262d47;
                            cursor: pointer;
                            font-size: 12px;
                            color: #e2e8f0;
                            transition: background 0.2s;
                        " onclick="window.location.href='/server-service-list?search=${encodeURIComponent(title)}'" 
                          onmouseover="this.style.background='#1e2235'; this.style.color='#00ff66';" 
                          onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0';">
                            ⚡ ${title}
                        </div>
                    `;
                });

                dropdown.innerHTML = html;
                dropdown.style.display = 'block';
            });

            document.addEventListener('click', (e) => {
                const container = document.getElementById('gu-global-search-container');
                if (container && !container.contains(e.target)) {
                    dropdown.style.display = 'none';
                }
            });
        }
    };

    if (window.GU.flags && window.GU.flags.globalSearch) {
        window.GU.Search.init();
    }
})();v
