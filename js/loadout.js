/* CS2 ARSENAL - loadout.js: lập kế hoạch mua đồ theo ngân sách */
(function () {
    "use strict";
    const { $, $$, esc, money, store, toast, teamText } = CS2;

    const PRIMARY = ["SMG", "Rifle", "Sniper Rifle", "Shotgun", "Machine Gun"];
    const GROUPS = [
        { slot: "secondary", title: "Vũ khí phụ" },
        { slot: "primary", title: "Vũ khí chính" },
        { slot: "grenade", title: "Lựu đạn (tối đa 4, flashbang tối đa 2)" },
        { slot: "gear", title: "Giáp và dụng cụ" }
    ];
    const PRESETS = [["Pistol round", 800], ["Eco", 2000], ["Force buy", 3500], ["Full buy", 5000]];

    function slotOf(item) {
        if (item.category === "Pistol") return "secondary";
        if (PRIMARY.indexOf(item.category) !== -1) return "primary";
        if (item.category === "Grenade") return "grenade";
        if (item.category === "Zeus") return "gear-zeus";
        if (item.id === "kevlar" || item.id === "kevlar-helmet") return "gear-armor";
        if (item.id === "defuse-kit") return "gear-kit";
        return null;
    }
    const groupOf = function (slot) { return slot.indexOf("gear") === 0 ? "gear" : slot; };

    const catalog = weapons.concat(equipment).filter(function (i) {
        return i.status !== "development" && slotOf(i) !== null;
    });

    const saved = store.get("cs2Loadout", {});
    const state = {
        side: saved.side === "CT" ? "CT" : "T",
        money: Math.min(16000, Math.max(0, Number(saved.money) || 5000)),
        items: Array.isArray(saved.items) ? saved.items.filter(function (id) { return catalog.some(function (c) { return c.id === id; }); }) : []
    };

    const total = function (ids) { return ids.reduce(function (s, id) { return s + getItem(id).priceNum; }, 0); };
    const allowed = function (i) { return i.side === "Both" || i.side === state.side; };
    const countOf = function (id) { return state.items.filter(function (x) { return x === id; }).length; };

    /* Thử thêm một món: trả về { items } nếu hợp lệ hoặc { error } nếu không */
    function tryAdd(id) {
        const item = getItem(id);
        const slot = slotOf(item);
        let items = state.items.slice();

        if (slot === "grenade") {
            const grenades = items.filter(function (x) { return slotOf(getItem(x)) === "grenade"; });
            if (grenades.length >= 4) return { error: "Chỉ mang được tối đa 4 lựu đạn." };
            if (id === "flashbang" ? countOf(id) >= 2 : countOf(id) >= 1) {
                return { error: id === "flashbang" ? "Tối đa 2 flashbang." : "Chỉ mang được 1 quả loại này." };
            }
        } else {
            items = items.filter(function (x) { return slotOf(getItem(x)) !== slot; }); // thay món cùng ô
        }
        items.push(id);
        if (total(items) > state.money) return { error: "Không đủ tiền (thiếu " + money(total(items) - state.money) + ")." };
        return { items: items };
    }

    function save() { store.set("cs2Loadout", state); }

    function renderGroups() {
        $("#buyGroups").innerHTML = GROUPS.map(function (g) {
            const list = catalog.filter(function (i) { return groupOf(slotOf(i)) === g.slot && allowed(i); });
            return '<section class="buy-group"><h3>' + g.title + '</h3><div class="buy-list">' + list.map(function (i) {
                const selected = countOf(i.id) > 0;
                const attempt = selected && slotOf(i) !== "grenade" ? {} : tryAdd(i.id);
                const disabled = !!attempt.error;
                return '<button type="button" class="buy-item' + (selected ? " selected" : "") + '" data-buy="' + i.id + '"' +
                    (disabled ? ' disabled title="' + esc(attempt.error) + '"' : "") + ">" +
                    "<b>" + esc(i.name) + (selected && slotOf(i) === "grenade" ? " ×" + countOf(i.id) : "") + "</b>" +
                    '<span class="money">' + esc(i.price) + "</span></button>";
            }).join("") + "</div></section>";
        }).join("");
    }

    function renderSummary() {
        const cost = total(state.items);
        const left = state.money - cost;
        const names = {};
        state.items.forEach(function (id) { names[id] = (names[id] || 0) + 1; });
        const ids = Object.keys(names);

        $("#loadoutList").innerHTML = ids.length ? ids.map(function (id) {
            const it = getItem(id);
            return "<li><span>" + esc(it.name) + (names[id] > 1 ? " ×" + names[id] : "") + "</span><span>" +
                '<span class="money">' + money(it.priceNum * names[id]) + "</span>" +
                '<button type="button" data-remove="' + id + '" aria-label="Bỏ ' + esc(it.name) + '">×</button></span></li>';
        }).join("") : '<li class="summary-empty" style="border:0">Chưa chọn món nào. Bấm vào một món bên trái để thêm.</li>';

        $("#totalCost").textContent = money(cost);
        const rem = $("#remaining");
        rem.textContent = left >= 0 ? money(left) : "-" + money(-left);
        rem.className = left >= 0 ? "money" : "money over";
        rem.style.color = left >= 0 ? "" : "var(--danger)";
    }

    function renderControls() {
        $$("[data-side]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.side === state.side)); });
        $("#moneyInput").value = state.money;
    }

    function render() { renderControls(); renderGroups(); renderSummary(); save(); }

    $("#presets").innerHTML = PRESETS.map(function (p) {
        return '<button type="button" class="chip" data-money="' + p[1] + '">' + p[0] + " (" + money(p[1]) + ")</button>";
    }).join("");

    $("#presets").addEventListener("click", function (e) {
        const b = e.target.closest("[data-money]");
        if (!b) return;
        state.money = Number(b.dataset.money);
        render();
    });

    $$("[data-side]").forEach(function (b) {
        b.addEventListener("click", function () {
            state.side = b.dataset.side;
            const before = state.items.length;
            state.items = state.items.filter(function (id) { return allowed(getItem(id)); });
            if (state.items.length < before) toast("Đã bỏ các món không dùng được ở phe " + state.side + ".");
            render();
        });
    });

    $("#moneyInput").addEventListener("input", function () {
        state.money = Math.min(16000, Math.max(0, Number(this.value) || 0));
        renderGroups(); renderSummary(); save();
    });

    $("#buyGroups").addEventListener("click", function (e) {
        const btn = e.target.closest("[data-buy]");
        if (!btn) return;
        const id = btn.dataset.buy;
        if (countOf(id) > 0 && slotOf(getItem(id)) !== "grenade") {
            state.items = state.items.filter(function (x) { return x !== id; }); // bấm lần nữa để bỏ
        } else {
            const result = tryAdd(id);
            if (result.error) { toast(result.error, "error"); return; }
            state.items = result.items;
        }
        render();
    });

    $("#loadoutList").addEventListener("click", function (e) {
        const btn = e.target.closest("[data-remove]");
        if (!btn) return;
        const i = state.items.lastIndexOf(btn.dataset.remove);
        if (i !== -1) state.items.splice(i, 1);
        render();
    });

    $("#clearLoadout").addEventListener("click", function () { state.items = []; render(); });

    render();
})();
