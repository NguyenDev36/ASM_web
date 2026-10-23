/* ==========================================================
   CS2 ARSENAL - data.js
   Dữ liệu vũ khí / trang bị (giữ nguyên từ bản gốc)
   + thông số chiến đấu tham khảo + danh mục.
   ========================================================== */

const weapons = [
    {
        "id": "glock18",
        "name": "Glock-18",
        "category": "Pistol",
        "side": "T",
        "price": "$200",
        "description": "Pistol mặc định của phe T.",
        "type": "Burst mode",
        "status": "playable"
    },
    {
        "id": "p2000",
        "name": "P2000",
        "category": "Pistol",
        "side": "CT",
        "price": "$200",
        "description": "Pistol mặc định có thể trang bị cho phe CT.",
        "type": "Pistol",
        "status": "playable"
    },
    {
        "id": "usp-s",
        "name": "USP-S",
        "category": "Pistol",
        "side": "CT",
        "price": "$200",
        "description": "Pistol của CT với suppressor.",
        "type": "Silenced pistol",
        "status": "playable"
    },
    {
        "id": "dual-berettas",
        "name": "Dual Berettas",
        "category": "Pistol",
        "side": "Both",
        "price": "$300",
        "description": "Cặp pistol sử dụng đồng thời hai khẩu.",
        "type": "Dual pistols",
        "status": "playable"
    },
    {
        "id": "p250",
        "name": "P250",
        "category": "Pistol",
        "side": "Both",
        "price": "$300",
        "description": "Pistol giá thấp thuộc nhóm Pistol.",
        "type": "Pistol",
        "status": "playable"
    },
    {
        "id": "cz75-auto",
        "name": "CZ75-Auto",
        "category": "Pistol",
        "side": "Both",
        "price": "$500",
        "description": "Pistol tự động thuộc nhóm Pistol.",
        "type": "Automatic pistol",
        "status": "playable"
    },
    {
        "id": "five-seven",
        "name": "Five-SeveN",
        "category": "Pistol",
        "side": "CT",
        "price": "$500",
        "description": "Pistol dành cho phe CT.",
        "type": "Pistol",
        "status": "playable"
    },
    {
        "id": "tec-9",
        "name": "Tec-9",
        "category": "Pistol",
        "side": "T",
        "price": "$500",
        "description": "Pistol dành cho phe T.",
        "type": "Pistol",
        "status": "playable"
    },
    {
        "id": "r8-revolver",
        "name": "R8 Revolver",
        "category": "Pistol",
        "side": "Both",
        "price": "$600",
        "description": "Revolver thuộc nhóm Pistol.",
        "type": "Revolver",
        "status": "playable"
    },
    {
        "id": "desert-eagle",
        "name": "Desert Eagle",
        "category": "Pistol",
        "side": "Both",
        "price": "$700",
        "description": "Pistol nổi tiếng với thiết kế đặc trưng.",
        "type": "Powerful pistol",
        "status": "playable"
    },
    {
        "id": "mac-10",
        "name": "MAC-10",
        "category": "SMG",
        "side": "T",
        "price": "$1,050",
        "description": "SMG dành cho phe T.",
        "type": "SMG",
        "status": "playable"
    },
    {
        "id": "ump-45",
        "name": "UMP-45",
        "category": "SMG",
        "side": "Both",
        "price": "$1,200",
        "description": "SMG có thể sử dụng bởi cả hai phe.",
        "type": "SMG",
        "status": "playable"
    },
    {
        "id": "mp9",
        "name": "MP9",
        "category": "SMG",
        "side": "CT",
        "price": "$1,250",
        "description": "SMG dành cho phe CT.",
        "type": "SMG",
        "status": "playable"
    },
    {
        "id": "pp-bizon",
        "name": "PP-Bizon",
        "category": "SMG",
        "side": "Both",
        "price": "$1,300",
        "description": "SMG với băng đạn lớn.",
        "type": "SMG",
        "status": "playable"
    },
    {
        "id": "mp5-sd",
        "name": "MP5-SD",
        "category": "SMG",
        "side": "Both",
        "price": "$1,400",
        "description": "SMG có suppressor tích hợp.",
        "type": "Silenced SMG",
        "status": "playable"
    },
    {
        "id": "mp7",
        "name": "MP7",
        "category": "SMG",
        "side": "Both",
        "price": "$1,400",
        "description": "SMG thuộc nhóm Mid-Tier.",
        "type": "SMG",
        "status": "playable"
    },
    {
        "id": "p90",
        "name": "P90",
        "category": "SMG",
        "side": "Both",
        "price": "$2,350",
        "description": "SMG nổi tiếng với băng đạn lớn.",
        "type": "SMG",
        "status": "playable"
    },
    {
        "id": "galil-ar",
        "name": "Galil AR",
        "category": "Rifle",
        "side": "T",
        "price": "$1,800",
        "description": "Rifle dành cho phe T.",
        "type": "Rifle",
        "status": "playable"
    },
    {
        "id": "famas",
        "name": "FAMAS",
        "category": "Rifle",
        "side": "CT",
        "price": "$1,950",
        "description": "Rifle có chế độ burst đặc trưng.",
        "type": "Burst rifle",
        "status": "playable"
    },
    {
        "id": "ak47",
        "name": "AK-47",
        "category": "Rifle",
        "side": "T",
        "price": "$2,700",
        "description": "Rifle biểu tượng của phe T.",
        "type": "Rifle",
        "status": "playable"
    },
    {
        "id": "m4a1-s",
        "name": "M4A1-S",
        "category": "Rifle",
        "side": "CT",
        "price": "$2,900",
        "description": "Rifle CT với suppressor.",
        "type": "Silenced rifle",
        "status": "playable"
    },
    {
        "id": "m4a4",
        "name": "M4A4",
        "category": "Rifle",
        "side": "CT",
        "price": "$2,900",
        "description": "Rifle tiêu chuẩn quen thuộc của CT.",
        "type": "Rifle",
        "status": "playable"
    },
    {
        "id": "sg553",
        "name": "SG 553",
        "category": "Rifle",
        "side": "T",
        "price": "$3,000",
        "description": "Rifle có scope của phe T.",
        "type": "Scoped rifle",
        "status": "playable"
    },
    {
        "id": "aug",
        "name": "AUG",
        "category": "Rifle",
        "side": "CT",
        "price": "$3,300",
        "description": "Rifle có scope của phe CT.",
        "type": "Scoped rifle",
        "status": "playable"
    },
    {
        "id": "m14",
        "name": "M14",
        "category": "Rifle",
        "side": "Both",
        "price": "$4,100",
        "description": "Mục dữ liệu vũ khí mới xuất hiện trong build 2026; chưa được xác nhận là vũ khí có thể chơi công khai.",
        "type": "Development data / unreleased",
        "status": "development"
    },
    {
        "id": "ssg08",
        "name": "SSG 08",
        "category": "Sniper Rifle",
        "side": "Both",
        "price": "$1,700",
        "description": "Sniper rifle giá thấp, còn được gọi là Scout.",
        "type": "Bolt-action sniper",
        "status": "playable"
    },
    {
        "id": "awp",
        "name": "AWP",
        "category": "Sniper Rifle",
        "side": "Both",
        "price": "$4,750",
        "description": "Sniper rifle nổi tiếng trong Counter-Strike.",
        "type": "Sniper rifle",
        "status": "playable"
    },
    {
        "id": "g3sg1",
        "name": "G3SG1",
        "category": "Sniper Rifle",
        "side": "T",
        "price": "$5,000",
        "description": "Semi-auto sniper dành cho phe T.",
        "type": "Semi-auto sniper",
        "status": "playable"
    },
    {
        "id": "scar20",
        "name": "SCAR-20",
        "category": "Sniper Rifle",
        "side": "CT",
        "price": "$5,000",
        "description": "Semi-auto sniper dành cho phe CT.",
        "type": "Semi-auto sniper",
        "status": "playable"
    },
    {
        "id": "nova",
        "name": "Nova",
        "category": "Shotgun",
        "side": "Both",
        "price": "$1,050",
        "description": "Shotgun thuộc nhóm Heavy.",
        "type": "Shotgun",
        "status": "playable"
    },
    {
        "id": "sawed-off",
        "name": "Sawed-Off",
        "category": "Shotgun",
        "side": "T",
        "price": "$1,100",
        "description": "Shotgun dành cho phe T.",
        "type": "Shotgun",
        "status": "playable"
    },
    {
        "id": "mag7",
        "name": "MAG-7",
        "category": "Shotgun",
        "side": "CT",
        "price": "$1,300",
        "description": "Shotgun dành cho phe CT.",
        "type": "Shotgun",
        "status": "playable"
    },
    {
        "id": "xm1014",
        "name": "XM1014",
        "category": "Shotgun",
        "side": "Both",
        "price": "$2,000",
        "description": "Shotgun bán tự động.",
        "type": "Shotgun",
        "status": "playable"
    },
    {
        "id": "negev",
        "name": "Negev",
        "category": "Machine Gun",
        "side": "Both",
        "price": "$1,700",
        "description": "Machine gun thuộc nhóm Heavy.",
        "type": "Machine gun",
        "status": "playable"
    },
    {
        "id": "m249",
        "name": "M249",
        "category": "Machine Gun",
        "side": "Both",
        "price": "$5,200",
        "description": "Machine gun thuộc nhóm Heavy.",
        "type": "Machine gun",
        "status": "playable"
    },
    {
        "id": "knife",
        "name": "Knife",
        "category": "Knife",
        "side": "Both",
        "price": "$0",
        "description": "Vũ khí cận chiến mặc định. Các skin/kiểu dao khác là biến thể trang trí của hệ thống knife.",
        "type": "Melee",
        "status": "playable"
    },
    {
        "id": "zeus-x27",
        "name": "Zeus x27",
        "category": "Zeus",
        "side": "Both",
        "price": "$200",
        "description": "Thiết bị điện tầm gần thuộc kho vũ khí CS2.",
        "type": "Taser / Zeus",
        "status": "playable"
    },
    {
        "id": "decoy",
        "name": "Decoy Grenade",
        "category": "Grenade",
        "side": "Both",
        "price": "$50",
        "description": "Lựu đạn tạo âm thanh đánh lạc hướng.",
        "type": "Grenade",
        "status": "playable"
    },
    {
        "id": "flashbang",
        "name": "Flashbang",
        "category": "Grenade",
        "side": "Both",
        "price": "$200",
        "description": "Lựu đạn gây hiệu ứng flash trong game.",
        "type": "Grenade",
        "status": "playable"
    },
    {
        "id": "he-grenade",
        "name": "High Explosive Grenade",
        "category": "Grenade",
        "side": "Both",
        "price": "$300",
        "description": "Lựu đạn nổ thuộc nhóm Grenade.",
        "type": "Grenade",
        "status": "playable"
    },
    {
        "id": "smoke",
        "name": "Smoke Grenade",
        "category": "Grenade",
        "side": "Both",
        "price": "$300",
        "description": "Lựu đạn tạo màn khói động trong CS2.",
        "type": "Grenade",
        "status": "playable"
    },
    {
        "id": "molotov",
        "name": "Molotov",
        "category": "Grenade",
        "side": "T",
        "price": "$400",
        "description": "Lựu đạn gây cháy dành cho phe T.",
        "type": "Incendiary grenade",
        "status": "playable"
    },
    {
        "id": "incendiary",
        "name": "Incendiary Grenade",
        "category": "Grenade",
        "side": "CT",
        "price": "$500",
        "description": "Lựu đạn cháy dành cho phe CT.",
        "type": "Incendiary grenade",
        "status": "playable"
    },
    {
        "id": "c4",
        "name": "C4 Explosive",
        "category": "C4",
        "side": "T",
        "price": "$0",
        "description": "Thiết bị mục tiêu của phe T trong chế độ đặt bom.",
        "type": "Objective item",
        "status": "playable"
    },
    {
        "id": "medi-shot",
        "name": "Medi-Shot",
        "category": "Consumable",
        "side": "Both",
        "price": "$0",
        "description": "Vật phẩm hồi phục được cơ sở dữ liệu CS2 phân loại là Consumable.",
        "type": "Consumable",
        "status": "playable"
    }
];

const equipment = [
    {
        "id": "defuse-kit",
        "name": "Defuse Kit",
        "category": "Equipment",
        "side": "CT",
        "price": "$400",
        "description": "Trang bị hỗ trợ gỡ bom.",
        "type": "Equipment",

        "status": "playable"
    },
    {
        "id": "rescue-kit",
        "name": "Rescue Kit",
        "category": "Equipment",
        "side": "CT",
        "price": "$400",
        "description": "Trang bị dùng trong chế độ giải cứu con tin.",
        "type": "Equipment",
        "status": "playable"
    },
    {
        "id": "kevlar",
        "name": "Kevlar Vest",
        "category": "Equipment",
        "side": "Both",
        "price": "$650",
        "description": "Giáp chống đạn.",
        "type": "Equipment",
        "status": "playable"
    },
    {
        "id": "kevlar-helmet",
        "name": "Kevlar & Helmet",
        "category": "Equipment",
        "side": "Both",
        "price": "$1,000",
        "description": "Giáp + mũ bảo hiểm.",
        "type": "Equipment",
        "status": "playable"
    },
    {
        "id": "heavy-assault-suit",
        "name": "Heavy Assault Suit",
        "category": "Equipment",
        "side": "Both",
        "price": "$6,000",
        "description": "Trang bị hạng nặng được cơ sở dữ liệu hiện tại liệt kê.",
        "type": "Equipment",
        "status": "playable"
    }
];

const weaponImageAssets = { "glock18": "glock", "p2000": "hkp2000", "usp-s": "usp_silencer", "dual-berettas": "elite", "p250": "p250", "cz75-auto": "cz75a", "five-seven": "fiveseven", "tec-9": "tec9", "r8-revolver": "revolver", "desert-eagle": "deagle", "mac-10": "mac10", "ump-45": "ump45", "mp9": "mp9", "pp-bizon": "bizon", "mp5-sd": "mp5sd", "mp7": "mp7", "p90": "p90", "galil-ar": "galilar", "famas": "famas", "ak47": "ak47", "m4a1-s": "m4a1_silencer", "m4a4": "m4a1", "sg553": "sg556", "aug": "aug", "m14": null, "ssg08": "ssg08", "awp": "awp", "g3sg1": "g3sg1", "scar20": "scar20", "nova": "nova", "sawed-off": "sawedoff", "mag7": "mag7", "xm1014": "xm1014", "negev": "negev", "m249": "m249", "knife": "knife_t", "zeus-x27": "taser", "decoy": "decoy", "flashbang": "flashbang", "he-grenade": "hegrenade", "smoke": "smokegrenade", "molotov": "molotov", "incendiary": "incgrenade", "c4": "c4", "medi-shot": "healthshot" };


/* ---------- Danh mục (thứ tự hiển thị) ---------- */
const CATEGORIES = [
    { key: "Pistol",       label: "Súng ngắn",        desc: "Vũ khí phụ, rẻ và linh hoạt" },
    { key: "SMG",          label: "Tiểu liên",        desc: "Giá mềm, cơ động, hợp round eco" },
    { key: "Rifle",        label: "Súng trường",      desc: "Xương sống của mọi round full buy" },
    { key: "Sniper Rifle", label: "Súng bắn tỉa",     desc: "Sát thương lớn, bắn xa" },
    { key: "Shotgun",      label: "Shotgun",          desc: "Mạnh ở cự ly gần" },
    { key: "Machine Gun",  label: "Súng máy",         desc: "Băng đạn lớn, di chuyển chậm" },
    { key: "Knife",        label: "Dao",              desc: "Vũ khí cận chiến mặc định" },
    { key: "Zeus",         label: "Zeus",             desc: "Thiết bị điện tầm gần" },
    { key: "Grenade",      label: "Lựu đạn",          desc: "Khói, flash, nổ, lửa" },
    { key: "C4",           label: "C4",               desc: "Mục tiêu của phe T" },
    { key: "Consumable",   label: "Vật phẩm hồi phục", desc: "Hồi máu nhanh" }
];

/* ---------- Thông số chiến đấu (tham khảo) ----------
   Thứ tự: [sát thương, tốc độ bắn (phát/phút), đạn trong băng, đạn dự trữ,
            xuyên giáp (%), tiền thưởng khi hạ gục ($), tốc độ di chuyển]
   Lưu ý: thông số có thể thay đổi theo từng bản cập nhật của Valve. */
const STAT_KEYS = ["damage", "rpm", "mag", "reserve", "armorPen", "reward", "speed"];
const STATS_RAW = {
    "glock18": [30, 400, 20, 120, 47, 300, 240],
    "p2000": [35, 352, 13, 52, 50.5, 300, 240],
    "usp-s": [35, 352, 12, 24, 50.5, 300, 240],
    "dual-berettas": [38, 500, 30, 120, 57.5, 300, 240],
    "p250": [38, 400, 13, 26, 64, 300, 240],
    "cz75-auto": [31, 600, 12, 12, 77.7, 100, 240],
    "five-seven": [32, 400, 20, 100, 91.2, 300, 240],
    "tec-9": [33, 500, 18, 90, 90.7, 300, 240],
    "r8-revolver": [86, 120, 8, 8, 93, 300, 220],
    "desert-eagle": [63, 267, 7, 35, 93.2, 300, 230],
    "mac-10": [29, 800, 30, 100, 57.5, 600, 240],
    "ump-45": [35, 666, 25, 100, 65, 600, 230],
    "mp9": [26, 857, 30, 120, 60, 600, 240],
    "pp-bizon": [27, 750, 64, 120, 57.5, 600, 240],
    "mp5-sd": [27, 750, 30, 120, 62.5, 600, 235],
    "mp7": [29, 750, 30, 120, 62.5, 600, 220],
    "p90": [26, 857, 50, 100, 69, 300, 230],
    "galil-ar": [30, 666, 35, 90, 77.5, 300, 215],
    "famas": [30, 666, 25, 90, 70, 300, 220],
    "ak47": [36, 600, 30, 90, 77.5, 300, 215],
    "m4a1-s": [38, 600, 25, 75, 70, 300, 225],
    "m4a4": [33, 666, 30, 90, 70, 300, 225],
    "sg553": [30, 666, 30, 90, 100, 300, 210],
    "aug": [28, 666, 30, 90, 90, 300, 220],
    "ssg08": [88, 48, 10, 90, 85, 300, 230],
    "awp": [115, 41, 5, 30, 97.5, 100, 200],
    "g3sg1": [80, 240, 20, 90, 82.5, 300, 215],
    "scar20": [80, 240, 20, 90, 82.5, 300, 215],
    "nova": [26, 68, 8, 32, 50, 900, 220],
    "sawed-off": [32, 68, 7, 32, 75, 900, 210],
    "mag7": [30, 71, 5, 32, 75, 900, 225],
    "xm1014": [20, 171, 7, 32, 80, 900, 215],
    "negev": [35, 800, 150, 200, 75, 150, 150],
    "m249": [32, 750, 100, 200, 80, 150, 195]
};
const PELLETS = { "nova": 9, "sawed-off": 8, "mag7": 8, "xm1014": 6 };

const STAT_DEFS = [
    { key: "damage",   label: "Sát thương",       unit: "",      best: "max" },
    { key: "rpm",      label: "Tốc độ bắn",       unit: " rpm",  best: "max" },
    { key: "mag",      label: "Đạn trong băng",   unit: "",      best: "max" },
    { key: "reserve",  label: "Đạn dự trữ",       unit: "",      best: "max" },
    { key: "armorPen", label: "Xuyên giáp",       unit: "%",     best: "max" },
    { key: "speed",    label: "Tốc độ di chuyển", unit: "",      best: "max" },
    { key: "reward",   label: "Tiền thưởng hạ gục", unit: "",    best: null  }
];

/* ---------- Làm giàu dữ liệu ---------- */
function parsePrice(text) {
    return Number(String(text).replace(/[^0-9]/g, "")) || 0;
}

weapons.forEach(function (w) {
    w.priceNum = parsePrice(w.price);
    w.image = weaponImageAssets[w.id]
        ? "https://cdn.cs2c.app/images/econ/weapons/base_weapons/weapon_" + weaponImageAssets[w.id] + "_png.png"
        : "";
    const raw = STATS_RAW[w.id];
    if (raw) {
        w.stats = {};
        STAT_KEYS.forEach(function (key, i) { w.stats[key] = raw[i]; });
        if (PELLETS[w.id]) w.stats.pellets = PELLETS[w.id];
    } else {
        w.stats = null;
    }
});

equipment.forEach(function (e) {
    e.priceNum = parsePrice(e.price);
});

const MAX_WEAPON_PRICE = Math.max.apply(null, weapons.map(function (w) { return w.priceNum; }));

function getItem(id) {
    return weapons.find(function (w) { return w.id === id; }) ||
           equipment.find(function (e) { return e.id === id; });
}
