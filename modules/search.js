/**
 * GU-Core: Global Search Engine (v4.1 - Acoplado à Barra Superior)
 * Arquiteto: Sênior Full-Stack / Especialista DOM & UX
 */
(function () {
    window.GU = window.GU || {};

    const GLOBAL_PRODUCTS_DATABASE = [
        "Phoenix Service Tool",
        "UnlockTool",
        "UnlockTool 12 Months NEW / RENEW License",
        "UnlockTool 3 Months NEW / RENEW License",
        "UnlockTool 6 Months NEW / RENEW License",
        "TSM-TOOL Pro",
        "TSM-TOOL Pro 1 Years",
        "TSM-TOOL Pro 3 Months",
        "TSM-TOOL Pro 6 month",
        "Android Multi Tool (AMT)",
        "Android Multi Tool - 1 Year Activation(AMT)",
        "Android Multi Tool - 3 Month Activation(AMT)",
        "Android Multi Tool - 6 Month Activation(AMT)",
        "Android Multi Tool (AMT) - Credits",
        "TFM Pro Tool",
        "TFM Pro tool 1 Year Activation",
        "TFM Pro tool 2 Year Activation",
        "TFM Pro tool 3 Months Activation",
        "TFM Pro tool Credit",
        "Samsung Tool KG Bypass",
        "Samsung Tool Kg Credits For Existing User",
        "Fast Unlocker Pro",
        "Fast Unlocker Pro NEW USER",
        "Fast Unlocker Pro OLD USER",
        "Chimera Tool",
        "Chimera Tool Basic - 12 Months",
        "Chimera Tool Premium - 12 Months",
        "Chimera Tool Professional - 12 Months",
        "Chimera Tool Credits",
        "MDM Fix Tool",
        "MDM Fix Tool Activation for [1 Year]",
        "MDM Fix Tool Activation for [3 Months]",
        "KGFixTool",
        "KGFixTool Activation for - 3 Months",
        "KGFixTool Activation for - 6 Months",
        "KGFixTool Activation for - 12 Months",
        "KG Killer Tool",
        "KG Killer Tool Activation for - 1 Year",
        "Android Win Tool (AWT)",
        "Android Win Tool ( AWT ) Activation for - 30 Days",
        "Android Win Tool ( AWT ) Activation for - 3 Months",
        "Android Win Tool ( AWT ) Activation for - 1 Year",
        "Android Win Tool ( AWT ) Credits",
        "DFT Pro Tool",
        "DFT Pro Tool New Activation for [1 Year]",
        "DFT Pro Tool Renewal for [1 Year]",
        "DFT Pro Extand Existing For 2 Year",
        "DFT Pro New Activation For 2 Year",
        "Piranha Tool",
        "Piranha Tool 12 Months License",
        "Piranha Tool 6 Months License",
        "Piranha Tool 3 Months License",
        "Piranha Tool 1 Month License",
        "Piranha Tool Credits",
        "EFT Dongle",
        "EFT Dongle Activation for [1 Year]",
        "EFT Dongle Activation for [2 Year]",
        "EFT Pro",
        "EFT Pro Digital",
        "EFT Pro Digital Activation for [1 Months]",
        "EFT Pro Digital Activation for [3 Months]",
        "EFT Pro Digital Activation for [6 Months]",
        "EFT Pro Digital Activation for [1 Year]",
        "EFT Pro Digital Renewal for [1 Year]",
        "Z3X SamsTool",
        "Z3X SamsTool Digital Online 1 Year Subscription",
        "Hydra Tool",
        "Hydra Tool 10 Credits Pack",
        "Hydra Tool 20 Credits Pack",
        "Hydra Tool 50 Credits Pack",
        "Hydra Tool 100 Credits Pack",
        "Octoplus Samsung Tool",
        "Octoplus Samsung Tool 1 Year Activation Renew Extand",
        "GAProLogin Tool",
        "GAProLogin Tool - Realme OTP",
        "GAProLogin Tool - OnePlus OTP",
        "GAProLogin Tool - Oppo OTP",
        "Apizu Tool",
        "Apizu Tool Activation for (3 Months Plan)",
        "Apizu Tool Activation for (6 Months Plan)",
        "Apizu Tool Activation for (1 Year Plan)",
        "Griffin Unlocker",
        "Griffin Unlocker New Activation for [1 Year]",
        "Griffin Unlocker New Activation for [6 Months]",
        "Griffin Unlocker New Activation for [3 Months]",
        "Griffin Unlocker Renewal for [1 Year]",
        "Griffin Unlocker Renewal for [6 Months]",
        "Griffin Unlocker Renewal for [3 Months]",
        "Griffin-Unlocker Premium Pack Access Activation",
        "The GuerraTool Motorola",
        "THE GUERRATOOL MOTOROLA MTK/SPD",
        "The Magic Tool Motorola",
        "The Magic Tool Motorola Credits",
        "SamsungTool.us",
        "SST (Samsung Service Tool)",
        "CellTool.io",
        "SamsungTool.us + SST + CellTool.io",
        "Borneo Schematics",
        "Pandora Tool",
        "Android Multitool (Aluguel AMT - 3 Horas)",
        "DFT Pro Tool (Aluguel - 48 Horas)",
        "Kg Killer Tool (Aluguel - 4 Horas)",
        "TFM Tool Pro (Aluguel - 6 Horas)",
        "TSM-Tools (Aluguel - 6 Horas)",
        "UNLOCK TOOL (Aluguel - 6 Horas)",
        "Virtual Box (Aluguel - 30 e 60 Minutos)",
        "Samsung Tool / Cell Tool SST (Aluguel - 60 Minutos)",
        "FRPFILE",
        "FRPFILE Finder",
        "FRPFILE Finder Owner Info for Macbook, iMac T2, M1, M2, M3, M4",
        "iOS Passcode Hello Screen Services",
        "Bypass Passcode/ Disable iOS 11/12/13/14/15/16 without Jailbreak",
        "A12 Passcode (XR/XS/Max)",
        "A12-A13 Hello Screen",
        "A13 Passcode (11/SE2)",
        "Apple Activation Lock FMI Checker",
        "Mac Activation Lock status (iMac/MacBook) FMI On/Off Check",
        "Apple MDM Checker",
        "Apple iPhone / iPad / iMac / Macbook MDM Checker",
        "Apple All Devices Activation Status Checker",
        "Apple iPhone FMI ON/OFF & iCloud CLEAN/LOST Status",
        "Apple Carrier / SIM-Lock Checker",
        "Apple Carrier + SIM-Lock + FMI + COVERAGE + Blacklist Pro",
        "All In One Apple Full Details",
        "Apple FULL INFO + Carrier/SimLock",
        "MacBook / iMac iCloud Checker",
        "MACBOOK / iMAC iCLOUD ON/OFF & CLEAN/LOST STATUS",
        "AT&T USA iPhone Unlock",
        "Boost / Dish USA iPhone Unlock",
        "C Spire USA iPhone Unlock",
        "Liberty Puerto Rico iPhone Unlock",
        "Metro USA iPhone Unlock",
        "Spectrum USA iPhone Unlock",
        "Tracfone / StraightTalk USA iPhone Unlock",
        "US / USA Reseller Flex Policy iPhone Unlock",
        "US / USA Cricket iPhone Unlock",
        "Verizon USA iPhone Unlock",
        "XFINITY USA iPhone Unlock",
        "Australia All Carriers iPhone Unlock",
        "Canada Bell / MTS iPhone Unlock",
        "Orange / T-Mobile UK iPhone Unlock",
        "Salt Mobile / Orange Switzerland iPhone Unlock",
        "Swisscom Switzerland iPhone Unlock",
        "Vodafone UK iPhone Unlock",
        "3 Hutchison UK iPhone Unlock",
        "Samsung IMEI / KG Checker",
        "Samsung Check Information & Knox Guard (KG Enrollment Status)",
        "Samsung check information by [IMEI/SN]",
        "Samsung EUROPE All Model & Carrier (NCK & MCK)",
        "Samsung Full Information + Activation / Country / Sales",
        "Samsung Info & KNOX STATUS",
        "Samsung Info + GSMA Blacklist",
        "Samsung Info",
        "Xiaomi Find / MiCloud Services",
        "Xiaomi Find Check Full Info + Clean/Lost Status",
        "Xiaomi Remove MiCloud Account",
        "HONOR IMEI/SN Checker",
        "ITEL / TECNO / SONIM / INFINIX IMEI Check Info",
        "Oppo / Realme / OnePlus IMEI Check Purchase Country",
        "ZTE Full Carrier + Warranty Info Checker",
        "ZTE Info",
        "Motorola Unlock Codes",
        "Motorola Worldwide Unlock Codes + Check",
        "Motorola Info",
        "GSMA Blacklist Checker",
        "GSMA Blacklist Worldwide Check",
        "GSMA Blacklist Worldwide Pro Check",
        "All-in-One IMEI/SN Checker",
        "All-in-one (Basic Info) [IMEI/SN]",
        "Google Pixel Info",
        "Huawei Info",
        "Huawei Info S1 & S2",
        "OnePlus Info",
        "USA T-Mobile & MetroPCS Clean/Blocked Check",
        "US Verizon iPhone Eligible Check",
        "USA/Canada Blacklist Check",
        "Japan NTT Docomo / KDDI / Softbank Clean/Lost Check",
        "US C Spire iPhone Eligible Check",
        "US Spectrum iPhone Eligible Check",
        "USA AT&T Clean Unlocked & Check",
        "Tracfone / Straight Talk USA Status Check",
        "Mexico - Telcel / Movistar Owner Info By IMEI",
        "Bolivia - Tigo Owner Info By IMEI",
        "Peru - Claro / Entel / Movistar Owner Info By IMEI",
        "Consulta CPF CADSUS / DataSUS",
        "Consulta CPF Completo (BigData)",
        "Consulta E-mail & Senhas",
        "Consulta por Nome Completo",
        "Consulta Telefônica / Celular",
        "Consulta Veicular (Placa)",
        "AnyDesk",
        "AnyDesk Oficial 30 Dias",
        "67 Cafe Racer",
        "Teste de Conectividade API (FREE)"
    ];

    window.GU.Search = {
        init: function () {
            window.GU.log("[GU-Search v4.1] Acoplando à barra de pesquisa superior...");
            this.bindExistingSearch();
        },

        normalizeText: function (str) {
            return str
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]/g, "");
        },

        bindExistingSearch: function () {
            // Localiza o input da barra maior superior pelo placeholder ou classes comuns
            const input = document.querySelector('input[placeholder*="BUSCAR"], input[placeholder*="todos os serviços"], .search-box input, #search-input');
            
            if (!input) {
                window.GU.log("[GU-Search] Barra superior ainda não renderizada. Tentando novamente...", "warn");
                setTimeout(() => this.bindExistingSearch(), 800);
                return;
            }

            const parent = input.parentElement;
            if (parent && window.getComputedStyle(parent).position === 'static') {
                parent.style.position = 'relative';
            }

            let dropdown = document.getElementById('gu-search-results-dropdown');
            if (!dropdown) {
                dropdown = document.createElement('div');
                dropdown.id = 'gu-search-results-dropdown';
                dropdown.style.cssText = `
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
                `;
                parent.appendChild(dropdown);
            }

            input.addEventListener('input', (e) => {
                const rawQuery = e.target.value.trim();
                const normalizedQuery = this.normalizeText(rawQuery);
                const queryWords = rawQuery.toLowerCase().split(/\s+/).filter(w => w.length > 0);
                
                if (normalizedQuery.length < 2) {
                    dropdown.style.display = 'none';
                    dropdown.innerHTML = '';
                    return;
                }

                const matches = GLOBAL_PRODUCTS_DATABASE.filter(item => {
                    const normalizedItem = this.normalizeText(item);
                    if (normalizedItem.includes(normalizedQuery)) return true;

                    const normalizedItemLower = item.toLowerCase();
                    return queryWords.every(word => normalizedItemLower.includes(word));
                }).slice(0, 15);

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
                if (!parent.contains(e.target)) {
                    dropdown.style.display = 'none';
                }
            });

            window.GU.log("[GU-Search] Conectado com sucesso à barra de pesquisa superior!");
        }
    };

    if (window.GU.flags && window.GU.flags.globalSearch) {
        window.GU.Search.init();
    }
})();
