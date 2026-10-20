/**
 * GU-Core: Global Search Engine (v3.1 - Apenas Nomes / Palavras-Passe)
 * Arquiteto: Sênior Full-Stack / Especialista DOM & UX
 * Tolera erros de digitação, espaços faltantes/extras, hífens e símbolos.
 */
(function () {
    window.GU = window.GU || {};

    // Base de Dados Estática com os Nomes Limpos dos Produtos (Palavras-Passe)
    const GLOBAL_PRODUCTS_DATABASE = [
        "Phoenix Service Tool",
        "UnlockTool",
        "TSM-TOOL Pro",
        "Android Multi Tool (AMT)",
        "TFM Pro Tool",
        "Samsung Tool KG Bypass",
        "Fast Unlocker Pro",
        "Chimera Tool",
        "MDM Fix Tool",
        "KGFixTool",
        "KG Killer Tool",
        "Android Win Tool (AWT)",
        "DFT Pro Tool",
        "Piranha Tool",
        "EFT Dongle",
        "EFT Pro Digital",
        "Z3X SamsTool Digital",
        "Hydra Tool",
        "Octoplus Samsung Tool",
        "GAProLogin Tool",
        "Apizu Tool",
        "Griffin Unlocker",
        "The GuerraTool Motorola",
        "The Magic Tool Motorola",
        "SamsungTool.us + SST + CellTool.io",
        "Borneo Schematics",
        "Android Multitool (Aluguel AMT - 3 Horas)",
        "DFT Pro Tool (Aluguel - 48 Horas)",
        "Kg Killer Tool (Aluguel - 4 Horas)",
        "TFM Tool Pro (Aluguel - 6 Horas)",
        "TSM-Tools (Aluguel - 6 Horas)",
        "UNLOCK TOOL (Aluguel - 6 Horas)",
        "Virtual Box (Aluguel - 30 e 60 Minutos)",
        "Samsung Tool / Cell Tool SST (Aluguel - 60 Minutos)",
        "FRPFILE / Bypass Passcode & Hello Screen",
        "A12 Passcode (XR/XS/Max)",
        "A12-A13 Hello Screen",
        "A13 Passcode (11/SE2)",
        "Mac Activation Lock Status (iMac/MacBook FMI Check)",
        "Apple All Devices Activation Status Checker",
        "Apple iPhone / iPad / iMac / Macbook MDM Checker",
        "Apple iPhone FMI ON/OFF & iCloud CLEAN/LOST Status",
        "Apple Carrier + SIM-Lock + FMI + COVERAGE + Blacklist Pro",
        "All In One Apple Full Details",
        "Apple FULL INFO + Carrier/SimLock",
        "FRPFILE Finder Owner Info for Macbook/iMac",
        "AT&T USA iPhone Unlock (Clean / Semi Premium / Premium)",
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
        "Samsung Check Information & Knox Guard (KG Enrollment Status)",
        "Samsung EUROPE All Model & Carrier (NCK & MCK)",
        "Samsung Full Information + Activation / Country / Sales",
        "Samsung Info & KNOX STATUS",
        "Samsung Info + GSMA Blacklist",
        "Xiaomi Find Check Full Info + Clean/Lost Status",
        "Xiaomi Remove MiCloud Account (Argentina, Belarus, Japan, Kazakhstan, Malaysia, Pakistan, Russia, Serbia)",
        "HONOR IMEI/SN Check Info",
        "ITEL / TECNO / SONIM / INFINIX IMEI Check Info",
        "Oppo / Realme / OnePlus IMEI Check Purchase Country",
        "ZTE Full Carrier + Warranty Info Checker / ZTE Info",
        "Motorola Worldwide Unlock Codes + Check / Motorola Info",
        "Google Pixel Info",
        "Huawei Info S1 & S2",
        "OnePlus Info",
        "USA T-Mobile & MetroPCS Clean/Blocked Check",
        "US Verizon iPhone Eligible Check",
        "USA/Canada Blacklist Check",
        "Japan NTT Docomo / KDDI / Softbank Clean/Lost Check",
        "GSMA Blacklist Worldwide Check & Pro Check",
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
        "AnyDesk Oficial (30 Dias)",
        "67 Cafe Racer",
        "Teste de Conectividade API (FREE)"
    ];

    window.GU.Search = {
        init: function () {
            window.GU.log("[GU-Search v3.1] Inicializando busca direta por palavras-passe...");
            this.injectSearchUI();
            this.bindEvents();
        },

        // Normalização leve para busca insensível a acentos, hífens e espaços
        normalizeText: function (str) {
            return str
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]/g, "");
        },

        injectSearchUI: function () {
            if (document.getElementById('gu-global-search-container')) return;

            const searchHTML = `
                <div id="gu-global-search-container" style="position: relative; display: inline-block; width: 100%; max-width: 450px; margin: 0 15px;">
                    <div style="position: relative;">
                        <input type="text" id="gu-global-search-input" placeholder="🔍 Pesquisar ferramenta ou serviço..." style="
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
            const input = document.
