
/**
 * GENERAL UNLOCKING GSM
 * Global Search Engine v5.0
 * Catálogo GSM + Sinônimos + Busca normalizada
 *
 * Arquivo: modules/search.js
 * Requer: core.js com flags.globalSearch = true
 *
 * IMPORTANTE:
 * Os itens desta base são referências para pesquisa.
 * A presença de um nome não confirma disponibilidade no painel.
 */

(function () {
    "use strict";

    if (window.GU_SEARCH_LOADED) return;
    window.GU_SEARCH_LOADED = true;

    const VERSION = "5.0.0";
    const SEARCH_URL = "/server-service-list?search=";
    const MAX_RESULTS = 20;
    const MIN_QUERY_LENGTH = 2;

    // =========================================================
    // 1. BASE DE DADOS GSM
    // =========================================================

    const CATALOG = [
        // FERRAMENTAS GSM
        ["Phoenix Service Tool", "phoenix", "samsung nokia hmd oppo realme oneplus flash frp reset"],
        ["UnlockTool", "unlock tool", "unlocktool unlock tool license ativacao renovacao"],
        ["UnlockTool 3 Months License", "unlocktool 3 months", "licenca ativacao 3 meses"],
        ["UnlockTool 6 Months License", "unlocktool 6 months", "licenca ativacao 6 meses"],
        ["UnlockTool 12 Months License", "unlocktool 12 months", "licenca ativacao 1 ano renovacao"],
        ["TSM-TOOL Pro", "tsm tool", "tsm pro ativacao licenca"],
        ["TSM-TOOL Pro 3 Months", "tsm 3 months", "licenca 3 meses"],
        ["TSM-TOOL Pro 6 Months", "tsm 6 months", "licenca 6 meses"],
        ["TSM-TOOL Pro 1 Year", "tsm 1 year", "licenca 1 ano"],
        ["Android Multi Tool AMT", "amt android multi tool", "android frp format reset"],
        ["AMT 3 Month Activation", "amt 3 months", "ativacao licenca 3 meses"],
        ["AMT 6 Month Activation", "amt 6 months", "ativacao licenca 6 meses"],
        ["AMT 1 Year Activation", "amt 1 year", "ativacao licenca 1 ano"],
        ["AMT Credits", "amt credits", "creditos saldo"],
        ["TFM Pro Tool", "tfm pro", "tfm samsung android"],
        ["TFM Pro 3 Months", "tfm 3 months", "ativacao licenca"],
        ["TFM Pro 1 Year", "tfm 1 year", "ativacao licenca"],
        ["TFM Pro 2 Years", "tfm 2 years", "ativacao licenca"],
        ["TFM Pro Credits", "tfm credits", "creditos saldo"],
        ["Samsung Tool KG Bypass", "samsung kg bypass", "kg knox guard samsung"],
        ["Samsung Tool KG Credits", "kg credits", "creditos samsung"],
        ["Fast Unlocker Pro", "fast unlocker", "unlocker android"],
        ["Fast Unlocker Pro New User", "fast unlocker new", "novo usuario ativacao"],
        ["Fast Unlocker Pro Old User", "fast unlocker old", "usuario existente renovacao"],
        ["Chimera Tool", "chimera", "samsung huawei lg android"],
        ["Chimera Basic 12 Months", "chimera basic", "licenca 12 meses"],
        ["Chimera Premium 12 Months", "chimera premium", "licenca 12 meses"],
        ["Chimera Professional 12 Months", "chimera professional", "licenca 12 meses"],
        ["Chimera Credits", "chimera credits", "creditos saldo"],
        ["MDM Fix Tool", "mdm fix", "mdm bypass gerenciamento"],
        ["MDM Fix Tool 3 Months", "mdm 3 months", "ativacao licenca"],
        ["MDM Fix Tool 1 Year", "mdm 1 year", "ativacao licenca"],
        ["KGFixTool", "kg fix", "kg knox guard"],
        ["KGFixTool 3 Months", "kg fix 3 months", "ativacao"],
        ["KGFixTool 6 Months", "kg fix 6 months", "ativacao"],
        ["KGFixTool 12 Months", "kg fix 12 months", "ativacao"],
        ["KG Killer Tool", "kg killer", "samsung kg knox guard"],
        ["KG Killer Tool 1 Year", "kg killer 1 year", "licenca"],
        ["Android Win Tool AWT", "awt android win tool", "android frp flash"],
        ["AWT 30 Days", "awt 30 days", "ativacao 30 dias"],
        ["AWT 3 Months", "awt 3 months", "ativacao"],
        ["AWT 1 Year", "awt 1 year", "ativacao"],
        ["AWT Credits", "awt credits", "creditos"],
        ["DFT Pro Tool", "dft pro", "dft android samsung"],
        ["DFT Pro New Activation 1 Year", "dft new activation", "licenca 1 ano"],
        ["DFT Pro Renewal 1 Year", "dft renewal", "renovacao"],
        ["DFT Pro Extend 2 Years", "dft extend", "extensao renovacao"],
        ["DFT Pro New Activation 2 Years", "dft new 2 years", "ativacao"],
        ["Piranha Tool", "piranha", "piranha gsm"],
        ["Piranha Tool 1 Month", "piranha 1 month", "licenca"],
        ["Piranha Tool 3 Months", "piranha 3 months", "licenca"],
        ["Piranha Tool 6 Months", "piranha 6 months", "licenca"],
        ["Piranha Tool 12 Months", "piranha 12 months", "licenca"],
        ["Piranha Tool Credits", "piranha credits", "creditos"],
        ["EFT Dongle", "eft dongle", "eft samsung android"],
        ["EFT Dongle 1 Year", "eft dongle 1 year", "ativacao"],
        ["EFT Dongle 2 Years", "eft dongle 2 years", "ativacao"],
        ["EFT Pro", "eft pro", "eft samsung android"],
        ["EFT Pro Digital", "eft pro digital", "licenca ativacao"],
        ["EFT Pro Digital 1 Month", "eft digital 1 month", "licenca"],
        ["EFT Pro Digital 3 Months", "eft digital 3 months", "licenca"],
        ["EFT Pro Digital 6 Months", "eft digital 6 months", "licenca"],
        ["EFT Pro Digital 1 Year", "eft digital 1 year", "licenca"],
        ["EFT Pro Digital Renewal 1 Year", "eft digital renewal", "renovacao"],
        ["Z3X SamsTool", "z3x samstool", "samsung"],
        ["Z3X SamsTool Digital 1 Year", "z3x digital", "licenca assinatura"],
        ["Hydra Tool", "hydra", "hydra gsm"],
        ["Hydra 10 Credits", "hydra 10 credits", "creditos"],
        ["Hydra 20 Credits", "hydra 20 credits", "creditos"],
        ["Hydra 50 Credits", "hydra 50 credits", "creditos"],
        ["Hydra 100 Credits", "hydra 100 credits", "creditos"],
        ["Octoplus Samsung Tool", "octoplus samsung", "octoplus samsung"],
        ["Octoplus Samsung 1 Year", "octoplus 1 year", "ativacao renovacao"],
        ["GAProLogin Tool", "gaprologin", "ga pro login"],
        ["GAProLogin Realme OTP", "gaprologin realme", "otp"],
        ["GAProLogin OnePlus OTP", "gaprologin oneplus", "otp"],
        ["GAProLogin Oppo OTP", "gaprologin oppo", "otp"],
        ["Apizu Tool", "apizu", "apizu gsm"],
        ["Apizu Tool 3 Months", "apizu 3 months", "ativacao"],
        ["Apizu Tool 6 Months", "apizu 6 months", "ativacao"],
        ["Apizu Tool 1 Year", "apizu 1 year", "ativacao"],
        ["Griffin Unlocker", "griffin unlocker", "griffin gsm"],
        ["Griffin Unlocker New 3 Months", "griffin new 3 months", "ativacao"],
        ["Griffin Unlocker New 6 Months", "griffin new 6 months", "ativacao"],
        ["Griffin Unlocker New 1 Year", "griffin new 1 year", "ativacao"],
        ["Griffin Unlocker Renewal 3 Months", "griffin renewal 3 months", "renovacao"],
        ["Griffin Unlocker Renewal 6 Months", "griffin renewal 6 months", "renovacao"],
        ["Griffin Unlocker Renewal 1 Year", "griffin renewal 1 year", "renovacao"],
        ["Griffin Unlocker Premium Pack", "griffin premium", "premium access"],
        ["The GuerraTool Motorola", "guerratool motorola", "motorola"],
        ["The GuerraTool Motorola MTK SPD", "guerratool mtk spd", "motorola mediatek spreadtrum"],
        ["The Magic Tool Motorola", "magic tool motorola", "motorola"],
        ["The Magic Tool Credits", "magic tool credits", "creditos"],
        ["SamsungTool.us", "samsungtool us", "samsung"],
        ["SST Samsung Service Tool", "sst samsung service tool", "samsung"],
        ["CellTool.io", "celltool", "cell tool"],
        ["SamsungTool.us + SST + CellTool.io", "samsungtool sst celltool", "pacote combo"],
        ["Borneo Schematics", "borneo schematic", "esquemas diagramas reparacao"],
        ["Pandora Tool", "pandora", "pandora box ferramenta gsm"],
        ["AnyDesk Oficial 30 Dias", "anydesk oficial", "acesso remoto 30 dias"],
        ["AnyDesk 9 Oficial", "anydesk 9", "acesso remoto"],
        ["Black Screen", "black screen", "servico black screen"],
        ["Virtual Box", "virtualbox", "maquina virtual virtual box"],

        // ALUGUÉIS DE FERRAMENTAS E SERVIDORES
        ["Aluguel AMT 3 Horas", "amt aluguel", "android multi tool aluguel horas"],
        ["Aluguel DFT Pro 48 Horas", "dft aluguel", "dft pro aluguel 48 horas"],
        ["Aluguel KG Killer 4 Horas", "kg killer aluguel", "samsung aluguel"],
        ["Aluguel TFM Pro 6 Horas", "tfm aluguel", "tfm aluguel horas"],
        ["Aluguel TSM Tool 6 Horas", "tsm aluguel", "tsm aluguel horas"],
        ["Aluguel UnlockTool 6 Horas", "unlocktool aluguel", "unlock tool aluguel horas"],
        ["Aluguel Virtual Box 30 Minutos", "virtual box aluguel 30", "30 minutos"],
        ["Aluguel Virtual Box 60 Minutos", "virtual box aluguel 60", "60 minutos"],
        ["Aluguel Samsung Tool / CellTool SST 60 Minutos", "sst aluguel", "celltool samsung aluguel"],
        ["Aluguel de Servidor GSM", "aluguel servidor", "server rental locacao servidor"],
        ["Aluguel de Server Box", "server box aluguel", "30 minutos 60 minutos"],
        ["Aluguel de Ferramentas GSM", "aluguel ferramentas", "server tool rental"],
        ["Créditos GSM", "creditos gsm", "saldo credits recarga"],
        ["Recarga de Saldo", "recarga saldo", "deposito adicionar creditos"],

        // SAMSUNG
        ["Samsung IMEI / KG Checker", "samsung imei kg", "imei sn knox guard"],
        ["Samsung Check Information & KG Status", "samsung kg status", "knox enrollment"],
        ["Samsung Check by IMEI/SN", "samsung check imei sn", "consulta"],
        ["Samsung Europe NCK / MCK", "samsung europe nck mck", "carrier network code"],
        ["Samsung Full Information", "samsung full info", "activation country sales"],
        ["Samsung Info & Knox Status", "samsung knox", "status informacao"],
        ["Samsung Info + GSMA Blacklist", "samsung blacklist", "gsma imei"],
        ["Samsung Info", "samsung info", "consulta imei sn"],
        ["Samsung FRP", "samsung frp", "google account reset"],
        ["Samsung KG / Knox Guard", "samsung kg knox", "enrollment status"],
        ["Samsung MDM", "samsung mdm", "gerenciamento corporativo"],
        ["Samsung Unlock", "samsung unlock", "desbloqueio rede"],
        ["Samsung IMEI Checker", "samsung imei checker", "consulta imei"],
        ["Samsung Serial Number Check", "samsung sn", "serial number consulta"],
        ["Samsung Blacklist Check", "samsung blacklist check", "imei bloqueado"],
        ["Samsung S25 / S24 / S23 Services", "samsung s25 s24 s23", "galaxy servicos"],

        // XIAOMI
        ["Xiaomi Find / MiCloud Check", "xiaomi find micloud", "mi cloud status"],
        ["Xiaomi Find Full Info", "xiaomi find full info", "clean lost status"],
        ["Xiaomi Remove MiCloud Account", "xiaomi remove micloud", "mi account"],
        ["Xiaomi FRP", "xiaomi frp", "google account"],
        ["Xiaomi Unlock", "xiaomi unlock", "desbloqueio"],
        ["Xiaomi IMEI Check", "xiaomi imei", "consulta imei"],
        ["Xiaomi Bootloader", "xiaomi bootloader", "unlock"],
        ["Xiaomi Redmi / POCO", "redmi poco xiaomi", "servicos celulares"],
        ["Xiaomi Server", "xiaomi server", "servicos remotos"],

        // MOTOROLA, OPPO, REALME, ONEPLUS, OUTRAS MARCAS
        ["Motorola Unlock Codes", "motorola unlock codes", "codigo desbloqueio"],
        ["Motorola Worldwide Unlock Codes", "motorola worldwide", "check unlock"],
        ["Motorola Info", "motorola info", "imei sn"],
        ["Motorola FRP", "motorola frp", "google account"],
        ["Motorola IMEI Check", "motorola imei", "consulta"],
        ["Oppo / Realme / OnePlus IMEI Check", "oppo realme oneplus imei", "purchase country"],
        ["Oppo OTP", "oppo otp", "gaprologin"],
        ["Realme OTP", "realme otp", "gaprologin"],
        ["OnePlus OTP", "oneplus otp", "gaprologin"],
        ["HONOR IMEI/SN Checker", "honor imei sn", "consulta"],
        ["ITEL / TECNO / INFINIX Checker", "itel tecno infinix", "sonim imei check"],
        ["ZTE Full Carrier / Warranty Check", "zte carrier warranty", "consulta"],
        ["ZTE Info", "zte info", "imei"],
        ["Google Pixel Info", "google pixel info", "imei sn"],
        ["Huawei Info", "huawei info", "imei sn"],
        ["Huawei S1 / S2 Info", "huawei s1 s2", "consulta"],
        ["OnePlus Info", "oneplus info", "imei sn"],

        // IMEI, SN, BLACKLIST E CONSULTAS
        ["GSMA Blacklist Checker", "gsma blacklist", "imei lost stolen"],
        ["GSMA Blacklist Worldwide", "gsma worldwide blacklist", "imei"],
        ["GSMA Blacklist Worldwide Pro", "gsma blacklist pro", "imei"],
        ["All-in-One IMEI/SN Checker", "all in one imei sn", "consulta universal"],
        ["Basic Info IMEI/SN", "basic info imei sn", "consulta basica"],
        ["USA T-Mobile / MetroPCS Check", "t mobile metropcs", "clean blocked status"],
        ["USA Verizon iPhone Eligibility", "verizon iphone eligible", "consulta elegibilidade"],
        ["USA / Canada Blacklist Check", "usa canada blacklist", "imei"],
        ["Japan NTT Docomo / KDDI / Softbank", "japan docomo kddi softbank", "clean lost"],
        ["US C Spire iPhone Eligibility", "c spire iphone", "eligible check"],
        ["US Spectrum iPhone Eligibility", "spectrum iphone", "eligible check"],
        ["USA AT&T Clean / Unlock Check", "att clean unlocked", "imei status"],
        ["Tracfone / Straight Talk Status", "tracfone straight talk", "usa status"],
        ["Consulta IMEI", "consulta imei", "imei checker verificar celular"],
        ["Consulta Serial Number", "consulta sn serial", "serial number"],
        ["Consulta de Operadora", "consulta operadora", "carrier network"],
        ["Consulta Blacklist", "consulta blacklist", "imei bloqueado"],
        ["Consulta Garantia", "consulta garantia", "warranty"],
        ["Consulta País de Compra", "pais compra", "purchase country"],

        // APPLE, IPHONE, IPAD E MAC
        ["FRPFILE", "frpfile", "apple iphone"],
        ["FRPFILE Finder", "frpfile finder", "mac finder"],
        ["FRPFILE Finder Owner Info", "finder owner info", "macbook imac t2 m1 m2 m3 m4"],
        ["iOS Passcode / Hello Screen Services", "ios passcode hello screen", "iphone ipad"],
        ["iOS 11-16 Passcode Bypass", "ios passcode bypass", "jailbreak"],
        ["A12 Passcode XR / XS / Max", "a12 passcode xr xs max", "iphone"],
        ["A12-A13 Hello Screen", "a12 a13 hello", "iphone"],
        ["A13 Passcode iPhone 11 / SE2", "a13 passcode", "iphone 11 se2"],
        ["Apple Activation Lock FMI Checker", "apple activation lock fmi", "icloud"],
        ["Mac Activation Lock FMI Check", "mac activation lock", "imac macbook fmi"],
        ["Apple MDM Checker", "apple mdm checker", "iphone ipad mac"],
        ["Apple All Devices Activation Checker", "apple activation status", "iphone ipad imac macbook"],
        ["Apple FMI ON/OFF + CLEAN/LOST", "apple fmi clean lost", "icloud status"],
        ["Apple Carrier / SIM-Lock Checker", "apple carrier sim lock", "iphone"],
        ["Apple Carrier + FMI + Coverage + Blacklist", "apple carrier coverage blacklist", "simlock fmi"],
        ["All In One Apple Full Details", "all in one apple", "full details"],
        ["Apple Full Info + Carrier / SIM-Lock", "apple full info carrier", "simlock"],
        ["MacBook / iMac iCloud Checker", "macbook imac icloud", "on off clean lost"],
        ["AT&T USA iPhone Unlock", "att usa iphone unlock", "carrier"],
        ["Boost / Dish USA iPhone Unlock", "boost dish iphone", "carrier"],
        ["C Spire USA iPhone Unlock", "c spire usa iphone", "carrier"],
        ["Liberty Puerto Rico iPhone Unlock", "liberty puerto rico iphone", "carrier"],
        ["Metro USA iPhone Unlock", "metro usa iphone", "carrier"],
        ["Spectrum USA iPhone Unlock", "spectrum usa iphone", "carrier"],
        ["Tracfone / StraightTalk iPhone Unlock", "tracfone straighttalk iphone", "carrier"],
        ["USA Reseller Flex Policy Unlock", "usa reseller flex policy", "iphone"],
        ["Cricket USA iPhone Unlock", "cricket usa iphone", "carrier"],
        ["Verizon USA iPhone Unlock", "verizon usa iphone", "carrier"],
        ["XFINITY USA iPhone Unlock", "xfinity usa iphone", "carrier"],
        ["Australia All Carriers iPhone Unlock", "australia carriers iphone", "unlock"],
        ["Canada Bell / MTS iPhone Unlock", "canada bell mts iphone", "unlock"],
        ["Orange / T-Mobile UK iPhone Unlock", "orange tmobile uk iphone", "unlock"],
        ["Salt / Orange Switzerland Unlock", "salt orange switzerland", "iphone"],
        ["Swisscom Switzerland iPhone Unlock", "swisscom switzerland iphone", "carrier"],
        ["Vodafone UK iPhone Unlock", "vodafone uk iphone", "carrier"],
        ["3 Hutchison UK iPhone Unlock", "hutchison uk iphone", "carrier"],

        // SERVIÇOS DIVERSOS
        ["Consulta CPF CADSUS / DataSUS", "cpf cadsus datasus", "consulta"],
        ["Consulta CPF Completo BigData", "cpf completo bigdata", "consulta"],
        ["Consulta E-mail", "consulta email", "e mail"],
        ["Consulta por Nome Completo", "consulta nome completo", "pesquisa"],
        ["Consulta Telefônica / Celular", "consulta telefonica celular", "telefone"],
        ["Consulta Veicular por Placa", "consulta veicular placa", "veiculo"],
        ["Teste de Conectividade API", "teste conectividade api free", "api teste"],

        // CATEGORIAS GERAIS PARA TERMOS DE PESQUISA
        ["Serviços GSM", "servicos gsm", "celular bancada tecnico"],
        ["Desbloqueio Remoto", "desbloqueio remoto", "remote unlock"],
        ["Serviços Samsung", "servicos samsung", "galaxy"],
        ["Serviços Xiaomi", "servicos xiaomi", "redmi poco micloud"],
        ["Serviços Motorola", "servicos motorola", "moto"],
        ["Serviços Apple", "servicos apple", "iphone ipad mac"],
        ["Ferramentas GSM", "ferramentas gsm", "tools software"],
        ["Licenças GSM", "licencas gsm", "ativacao renovacao subscription"],
        ["Ativação de Ferramentas", "ativacao ferramenta", "activation license"],
        ["Renovação de Licenças", "renovacao licenca", "renew extend"],
        ["Créditos de Ferramentas", "creditos ferramenta", "credits balance"],
        ["Servidores de Desbloqueio", "servidores desbloqueio", "server remoto"],
        ["Serviços por IMEI", "servicos imei", "imei check unlock"],
        ["Serviços por Serial Number", "servicos serial number", "sn checker"],
        ["FRP Android", "frp android", "google lock"],
        ["MDM", "mdm", "mobile device management"],
        ["KG / Knox Guard", "kg knox guard", "samsung enrollment"],
        ["SIM Lock", "sim lock", "network unlock operadora"],
        ["FMI / iCloud", "fmi icloud", "activation lock apple"],
        ["Black Screen Service", "black screen service", "tela preta"]
    ];

    // =========================================================
    // 2. NORMALIZAÇÃO E ÍNDICE
    // =========================================================

    function normalize(value) {
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, " ")
            .trim()
            .replace(/\s+/g, " ");
    }

    function tokens(value) {
        return normalize(value).split(" ").filter(Boolean);
    }

    const INDEX = CATALOG.map(function (entry, id) {
        const title = entry[0];
        const aliases = entry.slice(1).join(" ");
        const searchText = normalize(title + " " + aliases);

        return {
            id: id,
            title: title,
            aliases: aliases,
            searchText: searchText,
            words: new Set(tokens(searchText))
        };
    });

    // =========================================================
    // 3. MECANISMO DE PESQUISA
    // =========================================================

    function scoreItem(item, query) {
        const q = normalize(query);
        const qTokens = tokens(query);

        if (!q || !qTokens.length) return 0;

        const title = normalize(item.title);
        let score = 0;

        // Nome exato ou início do nome
        if (title === q) score += 150;
        else if (title.startsWith(q)) score += 100;
        else if (title.includes(q)) score += 70;

        // Todos os termos precisam corresponder
        let matched = 0;

        qTokens.forEach(function (word) {
            if (item.words.has(word)) {
                matched++;
                score += 15;
            } else if (item.searchText.includes(word)) {
                matched++;
                score += 8;
            }
        });

        if (matched !== qTokens.length) return 0;

        // Favorece nomes mais curtos quando há empate
        score -= Math.min(title.length / 30, 5);

        return score;
    }

    function search(query) {
        if (normalize(query).length < MIN_QUERY_LENGTH) return [];

        return INDEX.map(function (item) {
            return {
                item: item,
                score: scoreItem(item, query)
            };
        })
        .filter(function (result) {
            return result.score > 0;
        })
        .sort(function (a, b) {
            return b.score - a.score ||
                a.item.title.localeCompare(b.item.title);
        })
        .slice(0, MAX_RESULTS)
        .map(function (result) {
            return result.item;
        });
    }

    // =========================================================
    // 4. INTERFACE
    // =========================================================

    const CSS = `
        #gu-global-search-container {
            position: relative;
            display: inline-block;
            width: min(100%, 450px);
            margin: 8px 12px;
            vertical-align: middle;
            z-index: 99999;
            font-family: inherit;
        }

        #gu-global-search-container * {
            box-sizing: border-box;
        }

        #gu-global-search-input {
            width: 100%;
            min-height: 40px;
            padding: 10px 14px 10px 38px;
            color: #e2e8f0 !important;
            background: #0b0d14 !important;
            border: 1px solid #00ff66 !important;
            border-radius: 7px;
            outline: none;
            font-size: 13px;
            box-shadow: 0 0 10px rgba(0,255,102,.12);
        }

        #gu-global-search-input:focus {
            border-color: #00e5ff !important;
            box-shadow: 0 0 14px rgba(0,229,255,.22);
        }

        #gu-search-results-dropdown {
            display: none;
            position: absolute;
            top: calc(100% + 5px);
            left: 0;
            right: 0;
            max-height: 380px;
            overflow-y: auto;
            background: #10141f;
            border: 1px solid #00ff66;
            border-radius: 7px;
            box-shadow: 0 12px 32px rgba(0,0,0,.8);
            z-index: 100000;
        }

        .gu-search-result-item {
            display: block;
            padding: 11px 13px;
            border-bottom: 1px solid #262d47;
            color: #e2e8f0;
            text-decoration: none !important;
            font-size: 12px;
            cursor: pointer;
            overflow-wrap: anywhere;
        }

        .gu-search-result-item:last-child {
            border-bottom: none;
        }

        .gu-search-result-item:hover,
        .gu-search-result-item[aria-selected="true"] {
            background: #1b2630;
            color: #00ff66 !important;
        }

        .gu-search-result-type {
            display: block;
            margin-top: 4px;
            color: #94a3b8;
            font-size: 10px;
        }

        .gu-search-empty {
            padding: 14px;
            color: #94a3b8;
            text-align: center;
            font-size: 12px;
        }

        @media (max-width: 600px) {
            #gu-global-search-container {
                display: block;
                width: calc(100% - 20px);
                max-width: none;
                margin: 8px 10px;
            }
        }
    `;

    function log(message, type) {
        if (window.GU && typeof window.GU.log === "function") {
            window.GU.log(message, type || "info");
        } else {
            console.log("[GU-Search]", message);
        }
    }

    function addStyles() {
        if (document.getElementById("gu-global-search-styles")) return;

        const style = document.createElement("style");
        style.id = "gu-global-search-styles";
        style.textContent = CSS;
        document.head.appendChild(style);
    }

    function createUI() {
        if (document.getElementById("gu-global-search-container")) {
            return true;
        }

        const container = document.createElement("div");
        container.id = "gu-global-search-container";

        container.innerHTML = `
            <div style="position:relative">
                <span aria-hidden="true"
                    style="position:absolute;left:13px;top:50%;
                    transform:translateY(-50%);color:#00ff66;
                    pointer-events:none">⚡</span>

                <input
                    id="gu-global-search-input"
                    type="search"
                    placeholder="Pesquisar ferramentas, IMEI, servidor..."
                    autocomplete="off"
                    aria-label="Pesquisa global General Unlocking"
                    aria-controls="gu-search-results-dropdown"
                    aria-expanded="false"
                    role="combobox"
                    aria-autocomplete="list">
            </div>

            <div
                id="gu-search-results-dropdown"
                role="listbox"
                aria-label="Resultados da pesquisa">
            </div>
        `;

        // Prioriza locais comuns de navegação
        const targets = [
            ".main-header .navbar",
            ".navbar-nav",
            "header nav",
            "header",
            "nav"
        ];

        let target = null;

        for (const selector of targets) {
            const candidate = document.querySelector(selector);
            if (candidate) {
                target = candidate;
                break;
            }
        }

        if (target) {
            target.insertBefore(container, target.firstChild);
        } else {
            container.style.display = "block";
            container.style.maxWidth = "none";
            container.style.margin = "0";
            container.style.padding = "10px";
            container.style.background = "#0f111a";
            container.style.textAlign = "center";
            document.body.insertBefore(container, document.body.firstChild);
        }

        return true;
    }

    // =========================================================
    // 5. RESULTADOS E NAVEGAÇÃO
    // =========================================================

    function getDestination(item) {
        // Esta rota precisa aceitar o parâmetro "search".
        return SEARCH_URL + encodeURIComponent(item.title);
    }

    function renderResults(query) {
        const input = document.getElementById("gu-global-search-input");
        const dropdown = document.getElementById("gu-search-results-dropdown");

        if (!input || !dropdown) return;

        const found = search(query);

        dropdown.replaceChildren();

        if (normalize(query).length < MIN_QUERY_LENGTH) {
            dropdown.style.display = "none";
            input.setAttribute("aria-expanded", "false");
            return;
        }

        if (!found.length) {
            const empty = document.createElement("div");
            empty.className = "gu-search-empty";
            empty.textContent = "Nenhum resultado encontrado.";
            dropdown.appendChild(empty);
        } else {
            found.forEach(function (item, index) {
                const link = document.createElement("a");

                link.className = "gu-search-result-item";
                link.href = getDestination(item);
                link.setAttribute("role", "option");
                link.setAttribute("aria-selected", "false");
                link.dataset.index = String(index);

                // textContent evita interpretar nomes como HTML
                const title = document.createElement("span");
                title.textContent = "⚡ " + item.title;
                link.appendChild(title);

                const type = document.createElement("span");
                type.className = "gu-search-result-type";
                type.textContent = "General Unlocking GSM";
                link.appendChild(type);

                dropdown.appendChild(link);
            });
        }

        dropdown.style.display = "block";
        input.setAttribute("aria-expanded", "true");
    }

    function bindEvents() {
        const input = document.getElementById("gu-global-search-input");
        const dropdown = document.getElementById("gu-search-results-dropdown");

        if (!input || !dropdown || input.dataset.guBound === "true") return;

        input.dataset.guBound = "true";

        input.addEventListener("input", function () {
            renderResults(input.value);
        });

        input.addEventListener("keydown", function (event) {
            const links = Array.from(
                dropdown.querySelectorAll(".gu-search-result-item")
            );

            if (event.key === "Escape") {
                dropdown.style.display = "none";
                input.setAttribute("aria-expanded", "false");
                return;
            }

            if (event.key === "ArrowDown" && links.length) {
                event.preventDefault();
                links[0].focus();
                return;
            }

            if (event.key === "Enter" && links.length) {
                event.preventDefault();
                window.location.href = links[0].href;
            }
        });

        dropdown.addEventListener("keydown", function (event) {
            const links = Array.from(
                dropdown.querySelectorAll(".gu-search-result-item")
            );

            const current = links.indexOf(document.activeElement);

            if (event.key === "ArrowDown" && current < links.length - 1) {
                event.preventDefault();
                links[current + 1].focus();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();

                if (current <= 0) input.focus();
                else links[current - 1].focus();
            } else if (event.key === "Escape") {
                dropdown.style.display = "none";
                input.setAttribute("aria-expanded", "false");
                input.focus();
            }
        });

        document.addEventListener("click", function (event) {
            const container = document.getElementById(
                "gu-global-search-container"
            );

            if (container && !container.contains(event.target)) {
                dropdown.style.display = "none";
                input.setAttribute("aria-expanded", "false");
            }
        });

        log("Eventos da pesquisa configurados.");
    }

    // =========================================================
    // 6. INICIALIZAÇÃO
    // =========================================================

    function init() {
        if (window.GU && window.GU.flags &&
            !window.GU.flags.globalSearch) {
            log("Pesquisa global desativada pela Feature Flag.");
            return;
        }

        if (!document.body || !document.head) return;

        addStyles();
        createUI();
        bindEvents();

        log(
            "Pesquisa v" + VERSION + " inicializada. " +
            INDEX.length + " entradas indexadas."
        );
    }

    window.GU = window.GU || {};

    window.GU.Search = {
        init: init,
        search: search,
        normalizeText: normalize,
        getCatalog: function () {
            return CATALOG.map(function (entry) {
                return {
                    title: entry[0],
                    aliases: entry.slice(1)
                };
            });
        },
        version: VERSION
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }

    // Se o cabeçalho for inserido posteriormente pelo Laravel/AJAX,
    // tenta posicionar a caixa no local correto.
    const observer = new MutationObserver(function () {
        const container = document.getElementById(
            "gu-global-search-container"
        );

        if (!container) {
            init();
            return;
        }

        if (container.parentElement &&
            container.parentElement === document.body) {
            const target = document.querySelector(
                ".main-header .navbar, .navbar-nav, header nav, header, nav"
            );

            if (target && target !== container &&
                !container.contains(target)) {
                target.insertBefore(container, target.firstChild);
            }
        }

        bindEvents();
    });

    function startObserver() {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startObserver, {
            once: true
        });
    } else {
        startObserver();
    }

})();
