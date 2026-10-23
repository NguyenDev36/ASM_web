/* CS2 ARSENAL - detail.js: trang chi tiết vũ khí */
(function () {
    "use strict";
    const { $, esc, money, weaponCard, imageHTML, teamText, teamClass, statusText, categoryLabel, toast } = CS2;

    const box = $("#weaponDetail");
    const id = new URLSearchParams(location.search).get("weapon") || "ak47";
    const item = getItem(id);

    if (!item) {
        document.title = "Không tìm thấy vũ khí - CS2 Arsenal";
        box.innerHTML = '<div class="empty-state"><h3>Không tìm thấy vũ khí</h3>' +
            "<p>Mã vũ khí \"" + esc(id) + "\" không có trong database.</p>" +
            '<a class="btn" href="weapons.html">Xem danh sách vũ khí</a></div>';
        return;
    }

    document.title = item.name + " - CS2 Arsenal";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = item.name + ": " + item.description;

    /* Giá trị lớn nhất của từng thông số để vẽ thanh tỉ lệ */
    const maxOf = {};
    STAT_DEFS.forEach(function (d) {
        maxOf[d.key] = Math.max.apply(null, weapons.filter(function (w) { return w.stats; })
            .map(function (w) { return w.stats[d.key]; }));
    });

    function statsHTML() {
        if (!item.stats) {
            return '<p class="detail-note">Mục này không có thông số bắn (sát thương, tốc độ bắn...).</p>';
        }
        const s = item.stats;
        const rows = STAT_DEFS.filter(function (d) { return d.key !== "reward"; }).map(function (d) {
            const v = s[d.key];
            const text = d.key === "damage" && s.pellets ? v + " × " + s.pellets : v + d.unit;
            const pct = Math.max(3, Math.round(v / maxOf[d.key] * 100));
            return '<li class="stat-row"><span class="label">' + d.label + '</span>' +
                '<span class="bar"><i data-w="' + pct + '"></i></span>' +
                '<span class="value">' + text + "</span></li>";
        }).join("");
        return '<h2 class="subheading">Thông số chiến đấu</h2><ul class="stat-list">' + rows + "</ul>" +
            '<p class="detail-note">Thanh hiển thị tỉ lệ so với vũ khí cao nhất ở từng chỉ số. Thông số mang tính tham khảo và có thể thay đổi theo bản cập nhật của Valve.</p>';
    }

    const rowsInfo = [
        ["Loại", categoryLabel(item.category)],
        ["Phe sử dụng", teamText(item.side)],
        ["Kiểu vũ khí", item.type],
        ["Trạng thái", statusText(item)]
    ];
    if (item.stats) rowsInfo.push(["Tiền thưởng khi hạ gục", money(item.stats.reward)]);

    const idx = weapons.findIndex(function (w) { return w.id === item.id; });
    const prev = idx > 0 ? weapons[idx - 1] : null;
    const next = idx >= 0 && idx < weapons.length - 1 ? weapons[idx + 1] : null;
    const related = weapons.filter(function (w) { return w.category === item.category && w.id !== item.id; }).slice(0, 4);

    box.innerHTML =
        '<div class="breadcrumb">' +
            '<a href="index.html">Trang chủ</a><span>/</span><a href="weapons.html">Vũ khí</a><span>/</span>' +
            '<a href="weapons.html?cat=' + encodeURIComponent(item.category) + '">' + esc(categoryLabel(item.category)) + "</a>" +
            "<span>/</span>" + esc(item.name) + "</div>" +
        '<div class="detail-layout">' +
            '<div class="detail-image">' + imageHTML(item) + "</div>" +
            '<div class="detail-content">' +
                '<div class="detail-tags"><span class="tag">' + esc(categoryLabel(item.category)) + "</span>" +
                    '<span class="team-tag ' + teamClass(item.side) + '">' + teamText(item.side) + "</span>" +
                    (item.status === "development" ? '<span class="tag">Dữ liệu phát triển</span>' : "") + "</div>" +
                "<h1>" + esc(item.name) + "</h1>" +
                "<p>" + esc(item.description) + "</p>" +
                '<div class="detail-price money">' + esc(item.price) + "</div>" +
                statsHTML() +
                '<h2 class="subheading">Thông tin</h2>' +
                '<table class="info-table">' + rowsInfo.map(function (r) {
                    return "<tr><td>" + r[0] + "</td><td>" + esc(r[1]) + "</td></tr>";
                }).join("") + "</table>" +
                '<div class="detail-note">' + (item.status === "development"
                    ? "M14 hiện được liệt kê trong dữ liệu build hiện tại nhưng chưa được Valve xác nhận là vũ khí có thể dùng công khai, nên website đánh dấu riêng mục này."
                    : "Thông tin được trình bày trong phạm vi gameplay của Counter-Strike 2.") + "</div>" +
                '<div class="detail-actions">' +
                    '<button class="btn ghost" type="button" data-fav="' + item.id + '" aria-pressed="false">♥ Yêu thích</button>' +
                    '<button class="btn ghost" type="button" data-cmp="' + item.id + '" aria-pressed="false">⇄ So sánh</button>' +
                    '<button class="btn ghost" type="button" id="copyLink">Sao chép liên kết</button>' +
                "</div>" +
            "</div>" +
        "</div>" +
        (related.length ? '<h2 class="subheading" style="margin-top:56px">Cùng nhóm ' + esc(categoryLabel(item.category)) + '</h2><div class="weapon-grid">' +
            related.map(function (w) { return weaponCard(w); }).join("") + "</div>" : "") +
        '<div class="pager">' +
            (prev ? '<a href="detail.html?weapon=' + prev.id + '"><small>Trước</small><strong>' + esc(prev.name) + "</strong></a>" : "<span></span>") +
            (next ? '<a href="detail.html?weapon=' + next.id + '" style="text-align:right"><small>Tiếp theo</small><strong>' + esc(next.name) + "</strong></a>" : "<span></span>") +
        "</div>";

    CS2.syncButtons();

    // Thanh chỉ số chạy từ 0 đến giá trị (một lần khi mở trang)
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            CS2.$$(".bar i[data-w]").forEach(function (bar) { bar.style.width = bar.dataset.w + "%"; });
        });
    });

    $("#copyLink").addEventListener("click", function () {
        const url = location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function () { toast("Đã sao chép liên kết."); },
                function () { toast("Không sao chép được liên kết.", "error"); });
        } else {
            toast("Trình duyệt không hỗ trợ sao chép tự động.", "error");
        }
    });
})();
