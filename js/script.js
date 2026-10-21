// ===============================
// CS2 ARSENAL - JAVASCRIPT
// Full weapon database
// ===============================

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

function getItem(id) {
    return weapons.find(function (item) {
        return item.id === id;
    });
}

function getWeaponImageUrl(item) {
    const asset = weaponImageAssets[item.id];

    if (!asset) {
        return "";
    }

    return "https://cdn.cs2c.app/images/econ/weapons/base_weapons/weapon_" +
        asset +
        "_png.png";
}

function getStatusText(item) {
    if (item.status === "development") {
        return "Dữ liệu phát triển";
    }

    return "Có trong game";
}

function getTeamText(side) {
    if (side === "T") return "T";
    if (side === "CT") return "CT";
    if (side === "Both") return "T + CT";
    return side;
}

function createWeaponCard(item) {
    const statusClass = item.status === "development" ? "development" : "";

    return `
        <article class="weapon-card ${statusClass}">
            <div class="weapon-image">
                ${getWeaponImageUrl(item)
            ? `<img src="${getWeaponImageUrl(item)}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                       <span class="image-fallback">${item.name}</span>`
            : `<span class="image-fallback no-art">${item.name}<small>NO OFFICIAL ART</small></span>`}
            </div>

            <div class="weapon-body">
                <div class="card-top">
                    <span class="tag">${item.category}</span>
                    <span class="team-tag">${getTeamText(item.side)}</span>
                </div>

                <h3>${item.name}</h3>
                <p>${item.type} • ${item.price}</p>

                ${item.status === "development"
            ? '<small class="dev-label">Đang ở dữ liệu phát triển</small>'
            : ''}

                <a class="weapon-link" href="detail.html?weapon=${item.id}">
                    XEM CHI TIẾT →
                </a>
            </div>
        </article>
    `;
}

function createEquipmentCard(item) {
    return `
        <article class="equipment-card">
            <span class="tag">EQUIPMENT</span>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <strong>${item.side} • ${item.price}</strong>
        </article>
    `;
}

function renderWeapons() {
    const weaponList = document.getElementById("weaponList");
    const emptyMessage = document.getElementById("emptyMessage");
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const teamSelect = document.getElementById("teamSelect");
    const weaponCount = document.getElementById("weaponCount");

    if (!weaponList) return;

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;
    const selectedTeam = teamSelect.value;

    const filtered = weapons.filter(function (item) {
        const text = (
            item.name + " " +
            item.category + " " +
            item.side + " " +
            item.type
        ).toLowerCase();

        const matchText = text.includes(searchText);

        const matchCategory =
            selectedCategory === "All" ||
            item.category === selectedCategory;

        const matchTeam =
            selectedTeam === "All" ||
            item.side === selectedTeam ||
            (selectedTeam === "T" && item.side === "Both") ||
            (selectedTeam === "CT" && item.side === "Both");

        return matchText && matchCategory && matchTeam;
    });

    weaponList.innerHTML = filtered.map(createWeaponCard).join("");
    weaponCount.textContent = filtered.length;

    emptyMessage.style.display =
        filtered.length === 0 ? "block" : "none";
}

function renderEquipment() {
    const list = document.getElementById("equipmentList");

    if (!list) return;

    list.innerHTML = equipment.map(createEquipmentCard).join("");
}

function renderWeaponDetail() {
    const box = document.getElementById("weaponDetail");

    if (!box) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("weapon") || "ak47";
    const item = getItem(id);

    if (!item) {
        box.innerHTML = `
            <div class="info-box">
                <h2>Không tìm thấy vũ khí</h2>
                <p>Hãy quay lại trang chủ và chọn lại vũ khí.</p>
            </div>
        `;
        return;
    }

    const isDevelopment = item.status === "development";

    box.innerHTML = `
        <div class="detail-layout">
            <div class="detail-image">
                ${getWeaponImageUrl(item)
            ? `<img src="${getWeaponImageUrl(item)}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                       <span class="image-fallback">${item.name}</span>`
            : `<span class="image-fallback no-art">${item.name}<small>NO OFFICIAL ART</small></span>`}
            </div>

            <div class="detail-content">
                <div class="detail-tags">
                    <span class="tag">${item.category.toUpperCase()}</span>
                    <span class="team-tag">${getTeamText(item.side)}</span>
                </div>

                <h1>${item.name}</h1>

                <p>${item.description}</p>

                <table class="stats-table">
                    <tr>
                        <td>Loại</td>
                        <td>${item.category}</td>
                    </tr>
                    <tr>
                        <td>Phe</td>
                        <td>${getTeamText(item.side)}</td>
                    </tr>
                    <tr>
                        <td>Giá trong database</td>
                        <td>${item.price}</td>
                    </tr>
                    <tr>
                        <td>Text trong database</td>
                        <td>${item.text}</td>
                    </tr>
                    <tr>
                        <td>Loại</td>
                        <td>${item.type}</td>
                    </tr>
                    <tr>
                        <td>Trạng thái</td>
                        <td>${getStatusText(item)}</td>
                    </tr>
                </table>

                <div class="detail-note">
                    ${isDevelopment
            ? "M14 hiện được liệt kê trong dữ liệu build hiện tại, nhưng chưa được Valve xác nhận là vũ khí có thể sử dụng công khai. Vì vậy website đánh dấu riêng mục này."
            : "Thông tin được trình bày trong phạm vi gameplay của Counter-Strike 2."}
                </div>

                <a class="btn" href="index.html#weapons">← QUAY LẠI DANH SÁCH</a>
            </div>
        </div>
    `;
}

// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", function () {
        mainNav.classList.toggle("show");
    });
}

// Search + category + team
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const teamSelect = document.getElementById("teamSelect");

if (searchInput) searchInput.addEventListener("input", renderWeapons);
if (categorySelect) categorySelect.addEventListener("change", renderWeapons);
if (teamSelect) teamSelect.addEventListener("change", renderWeapons);

// Category cards
const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const category = button.dataset.category;

        if (categorySelect) {
            categorySelect.value = category;
            renderWeapons();

            document.getElementById("weapons").scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ===============================
// REGISTER
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirm = document.getElementById("registerConfirm").value;
        const message = document.getElementById("registerMessage");

        if (name === "" || email === "" || password === "" || confirm === "") {
            message.textContent = "Vui lòng nhập đầy đủ thông tin.";
            return;
        }

        if (password.length < 6) {
            message.textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
            return;
        }

        if (password !== confirm) {
            message.textContent = "Mật khẩu nhập lại không giống nhau.";
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("cs2User", JSON.stringify(user));
        message.textContent = "Đăng ký thành công! Chuyển sang trang đăng nhập...";

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1000);
    });
}

// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        if (email === "" || password === "") {
            message.textContent = "Vui lòng nhập email và mật khẩu.";
            return;
        }

        const savedUser = localStorage.getItem("cs2User");

        if (!savedUser) {
            message.textContent = "Chưa có tài khoản. Hãy đăng ký trước.";
            return;
        }

        const user = JSON.parse(savedUser);

        if (email === user.email && password === user.password) {
            localStorage.setItem("cs2LoggedIn", "true");
            message.textContent = "Đăng nhập thành công!";
        } else {
            message.textContent = "Email hoặc mật khẩu không đúng.";
        }
    });
}

// Show/hide password
const passwordButtons = document.querySelectorAll(".show-password");

passwordButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const target = document.getElementById(button.dataset.target);

        if (target.type === "password") {
            target.type = "text";
            button.textContent = "Ẩn";
        } else {
            target.type = "password";
            button.textContent = "Hiện";
        }
    });
});

// Contact
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const content = document.getElementById("contactMessage").value.trim();
        const message = document.getElementById("contactMessageText");

        if (name === "" || email === "" || subject === "" || content === "") {
            message.textContent = "Vui lòng nhập đầy đủ thông tin.";
            return;
        }

        message.textContent =
            "Gửi tin nhắn thành công! Đây là chức năng demo Frontend.";

        contactForm.reset();
    });
}

// Run
renderWeapons();
renderEquipment();
renderWeaponDetail();
