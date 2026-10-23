/* CS2 ARSENAL - compare.js: so sánh tối đa 3 vũ khí */
(function () {
    "use strict";
    const { $, esc, money, store, compare, imageHTML, teamText, teamClass, categoryLabel, toast } = CS2;

    const area = $("#compareArea");
    const select = $("#compareSelect");

    /* Nhận danh sách từ liên kết chia sẻ ?ids=a,b,c */
    const shared = new URLSearchParams(location.search).get("ids");
    if (shared) {
        const ids = shared.split(",").filter(function (id) { return weapons.some(function (w) { return w.id === id; }); });
        if (ids.length) compare.set(ids);
    }

    const comparable = weapons.filter(function (w) { return w.stats; });

    function bestIndexes(values, mode) {
        const nums = values.filter(function (v) { return typeof v === "number"; });
        if (nums.length < 2) return [];
        const target = mode === "min" ? Math.min.apply(null, nums) : Math.max.apply(null, nums);
        if (nums.every(function (n) { return n === target; })) return [];
        return values.map(function (v, i) { return v === target ? i : -1; }).filter(function (i) { return i >= 0; });
    }

    function row(label, cells, best) {
        return "<tr><td>" + label + "</td>" + cells.map(function (c, i) {
            return '<td class="' + (best.indexOf(i) !== -1 ? "best" : "") + '">' + c + "</td>";
        }).join("") + "</tr>";
    }

    function renderSelect() {
        const chosen = compare.all();
        select.innerHTML = '<option value="">Chọn vũ khí để thêm...</option>' + CATEGORIES.map(function (c) {
            const opts = comparable.filter(function (w) { return w.category === c.key && chosen.indexOf(w.id) === -1; });
            if (!opts.length) return "";
            return '<optgroup label="' + esc(c.label) + '">' + opts.map(function (w) {
                return '<option value="' + w.id + '">' + esc(w.name) + " (" + esc(w.price) + ")</option>";
            }).join("") + "</optgroup>";
        }).join("");
    }

    function render() {
        const items = compare.all().map(getItem);
        renderSelect();
        $("#compareAddBtn").disabled = items.length >= compare.max;
        $("#compareClearBtn").disabled = items.length === 0;
        $("#compareShareBtn").disabled = items.length === 0;

        try {
            const ids = items.map(function (w) { return w.id; }).join(",");
            history.replaceState(null, "", location.pathname + (ids ? "?ids=" + ids : ""));
        } catch (e) { /* file:// có thể chặn */ }

        if (items.length === 0) {
            area.innerHTML = '<div class="empty-state"><h3>Chưa có vũ khí nào để so sánh</h3>' +
                "<p>Chọn vũ khí ở ô phía trên, hoặc bấm nút ⇄ trên thẻ vũ khí ở trang danh sách.</p>" +
                '<a class="btn" href="weapons.html">Đến danh sách vũ khí</a></div>';
            return;
        }

        const head = "<tr><th></th>" + items.map(function (w) {
            return '<th class="cmp-head"><a href="detail.html?weapon=' + w.id + '" style="text-decoration:none">' + imageHTML(w) +
                "<strong>" + esc(w.name) + '</strong></a><span class="team-tag ' + teamClass(w.side) + '">' + teamText(w.side) +
                '</span><br><button type="button" data-remove="' + w.id + '">Bỏ khỏi so sánh</button></th>';
        }).join("") + "</tr>";

        let body = row("Giá", items.map(function (w) { return '<span class="money">' + esc(w.price) + "</span>"; }),
            bestIndexes(items.map(function (w) { return w.priceNum; }), "min"));
        body += row("Loại", items.map(function (w) { return esc(categoryLabel(w.category)); }), []);

        STAT_DEFS.forEach(function (d) {
            const values = items.map(function (w) { return w.stats[d.key]; });
            const cells = items.map(function (w) {
                const v = w.stats[d.key];
                if (d.key === "damage" && w.stats.pellets) return v + " × " + w.stats.pellets;
                return d.key === "reward" ? money(v) : v + d.unit;
            });
            body += row(d.label, cells, d.best ? bestIndexes(values, d.best) : []);
        });

        area.innerHTML = '<div class="compare-wrap"><table class="compare-table">' + head + body + "</table></div>" +
            '<p class="detail-note">Thông số mang tính tham khảo và có thể thay đổi theo bản cập nhật của Valve. Chỉ so sánh được các vũ khí có thông số bắn.</p>';
    }

    $("#compareAddBtn").addEventListener("click", function () {
        if (!select.value) { toast("Hãy chọn một vũ khí trước.", "error"); return; }
        if (compare.toggle(select.value) === null) toast("Chỉ so sánh được tối đa " + compare.max + " vũ khí.", "error");
    });
    $("#compareClearBtn").addEventListener("click", function () { compare.clear(); });
    $("#compareShareBtn").addEventListener("click", function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(location.href).then(function () { toast("Đã sao chép liên kết so sánh."); });
        } else {
            toast("Trình duyệt không hỗ trợ sao chép tự động.", "error");
        }
    });
    area.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-remove]");
        if (btn) compare.toggle(btn.dataset.remove);
    });

    document.addEventListener("cs2:change", render);
    render();
})();
