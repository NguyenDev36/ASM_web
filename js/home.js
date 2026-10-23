/* CS2 ARSENAL - home.js: trang chủ */
(function () {
    "use strict";
    const { $, esc, money, weaponCard, imageHTML, teamText, categoryLabel } = CS2;

    /* Tìm kiếm nhanh -> chuyển sang trang danh sách */
    $("#heroSearch").addEventListener("submit", function (e) {
        e.preventDefault();
        const q = $("#heroQuery").value.trim();
        location.href = "weapons.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    });

    /* Gợi ý tra cứu nhanh */
    const quick = $("#quickPicks");
    ["ak47", "awp", "m4a1-s", "glock18", "desert-eagle"].forEach(function (id) {
        const w = getItem(id);
        quick.insertAdjacentHTML("beforeend", '<a href="detail.html?weapon=' + id + '">' + esc(w.name) + "</a>");
    });

    /* Vũ khí nổi bật hôm nay: đổi theo ngày, chỉ chọn vũ khí có thông số */
    const withStats = weapons.filter(function (w) { return w.stats && w.image; });
    const dayIndex = Math.floor(Date.now() / 86400000) % withStats.length;
    const pick = withStats[dayIndex];
    const s = pick.stats;
    $("#inspectPanel").innerHTML =
        '<div class="inspect-head"><div><p>Vũ khí của ngày</p><h2>' + esc(pick.name) + "</h2></div>" +
        '<span class="team-tag ' + CS2.teamClass(pick.side) + '">' + teamText(pick.side) + "</span></div>" +
        '<div class="inspect-art">' + imageHTML(pick) + "</div>" +
        '<ul class="stat-list" style="font-size:14px">' + [
            ["Sát thương", s.damage, 120], ["Tốc độ bắn", s.rpm, 900], ["Xuyên giáp", s.armorPen, 100]
        ].map(function (r) {
            return '<li class="stat-row" style="grid-template-columns:100px 1fr 50px"><span class="label">' + r[0] +
                '</span><span class="bar"><i style="width:' + Math.min(100, r[1] / r[2] * 100) + '%"></i></span>' +
                '<span class="value">' + r[1] + "</span></li>";
        }).join("") + "</ul>" +
        '<div class="inspect-foot"><span class="money">' + esc(pick.price) + "</span>" +
        '<a class="btn small" href="detail.html?weapon=' + pick.id + '">Xem chi tiết</a></div>';

    /* Thống kê tổng quan (tính từ dữ liệu, không gõ cứng) */
    const sideCount = function (side) {
        return weapons.filter(function (w) { return w.side === side || w.side === "Both"; }).length;
    };
    $("#statStrip").innerHTML = [
        [weapons.length, "vũ khí trong database"],
        [CATEGORIES.length, "nhóm vũ khí"],
        [sideCount("T") + " / " + sideCount("CT"), "dùng được ở phe T / CT"],
        [money(MAX_WEAPON_PRICE), "giá cao nhất (M249)"]
    ].map(function (r) { return "<div><strong>" + r[0] + "</strong><span>" + r[1] + "</span></div>"; }).join("");

    /* Danh mục: đếm số lượng từ dữ liệu */
    $("#categoryGrid").innerHTML = CATEGORIES.map(function (c) {
        const n = weapons.filter(function (w) { return w.category === c.key; }).length;
        const pct = Math.round(n / weapons.length * 100 * 3); // tỉ lệ tương đối để thanh nhìn rõ
        return '<a class="category-card" href="weapons.html?cat=' + encodeURIComponent(c.key) + '">' +
            "<strong>" + esc(c.label) + "</strong><small>" + esc(c.desc) + "</small>" +
            '<div class="count"><span>' + n + " vũ khí</span>" +
            '<span class="meter"><i style="width:' + Math.min(100, pct) + '%"></i></span></div></a>';
    }).join("");

    /* Vũ khí được dùng nhiều */
    $("#featuredList").innerHTML = ["ak47", "m4a1-s", "awp", "desert-eagle", "glock18", "usp-s", "mp9", "famas"]
        .map(function (id) { return weaponCard(getItem(id)); }).join("");

    /* Trang bị */
    $("#equipmentNote").textContent = "Ngoài " + weapons.length + " vũ khí, database còn có " + equipment.length + " món trang bị.";
    $("#equipmentList").innerHTML = equipment.map(function (e) {
        return '<article class="equipment-card"><span class="tag">Trang bị</span><h3>' + esc(e.name) + "</h3>" +
            "<p>" + esc(e.description) + '</p><div class="meta"><span class="team-tag ' + CS2.teamClass(e.side) + '">' +
            teamText(e.side) + '</span><span class="money">' + esc(e.price) + "</span></div></article>";
    }).join("");
})();
