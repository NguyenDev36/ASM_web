/* CS2 ARSENAL - weapons.js: danh sách, tìm kiếm, lọc, sắp xếp */
(function () {
    "use strict";
    const { $, $$, esc, money, debounce, store, favorites, weaponCard, categoryLabel } = CS2;

    const PAGE_SIZE = 12;
    const TEAMS = ["All", "T", "CT", "Both"];
    const SORTS = ["default", "price-asc", "price-desc", "name"];
    const params = new URLSearchParams(location.search);

    const cat = params.get("cat");
    const state = {
        q: (params.get("q") || "").trim(),
        cat: CATEGORIES.some(function (c) { return c.key === cat; }) ? cat : "All",
        team: TEAMS.indexOf(params.get("team")) !== -1 ? params.get("team") : "All",
        sort: SORTS.indexOf(params.get("sort")) !== -1 ? params.get("sort") : "default",
        max: Math.min(MAX_WEAPON_PRICE, Number(params.get("max")) || MAX_WEAPON_PRICE),
        fav: params.get("fav") === "1",
        view: store.get("cs2View", "grid"),
        shown: PAGE_SIZE
    };

    const el = {
        search: $("#searchInput"), sort: $("#sortSelect"), team: $("#teamSelect"),
        chips: $("#categoryChips"), range: $("#priceRange"), priceLabel: $("#priceLabel"),
        favOnly: $("#favOnly"), list: $("#weaponList"), info: $("#resultInfo"),
        empty: $("#emptyMessage"), more: $("#loadMore"), reset: $("#resetFilters")
    };

    el.range.max = MAX_WEAPON_PRICE;

    function matches(w) {
        const text = (w.name + " " + categoryLabel(w.category) + " " + w.category + " " + w.side + " " + w.type).toLowerCase();
        if (state.q && text.indexOf(state.q.toLowerCase()) === -1) return false;
        if (state.cat !== "All" && w.category !== state.cat) return false;
        if (state.team === "T" && w.side !== "T" && w.side !== "Both") return false;
        if (state.team === "CT" && w.side !== "CT" && w.side !== "Both") return false;
        if (state.team === "Both" && w.side !== "Both") return false;
        if (w.priceNum > state.max) return false;
        if (state.fav && !favorites.has(w.id)) return false;
        return true;
    }

    function sorted(list) {
        const out = list.slice();
        if (state.sort === "price-asc") out.sort(function (a, b) { return a.priceNum - b.priceNum; });
        else if (state.sort === "price-desc") out.sort(function (a, b) { return b.priceNum - a.priceNum; });
        else if (state.sort === "name") out.sort(function (a, b) { return a.name.localeCompare(b.name); });
        return out;
    }

    function syncUrl() {
        const p = new URLSearchParams();
        if (state.q) p.set("q", state.q);
        if (state.cat !== "All") p.set("cat", state.cat);
        if (state.team !== "All") p.set("team", state.team);
        if (state.sort !== "default") p.set("sort", state.sort);
        if (state.max < MAX_WEAPON_PRICE) p.set("max", state.max);
        if (state.fav) p.set("fav", "1");
        const qs = p.toString();
        try {
            history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
        } catch (e) { /* một số trình duyệt chặn khi mở bằng file:// */ }
    }

    function renderChips() {
        const counts = { All: weapons.length };
        weapons.forEach(function (w) { counts[w.category] = (counts[w.category] || 0) + 1; });
        const items = [{ key: "All", label: "Tất cả" }].concat(CATEGORIES);
        el.chips.innerHTML = items.map(function (c) {
            return '<button type="button" class="chip" data-cat="' + esc(c.key) + '" aria-pressed="' + (state.cat === c.key) + '">' +
                esc(c.label) + "<small>" + (counts[c.key] || 0) + "</small></button>";
        }).join("");
    }

    function render() {
        const result = sorted(weapons.filter(matches));
        const visible = result.slice(0, state.shown);

        el.list.className = "weapon-grid" + (state.view === "list" ? " list" : "");
        el.list.innerHTML = visible.map(function (w) { return weaponCard(w, state.q); }).join("");
        el.empty.hidden = result.length !== 0;
        el.more.hidden = result.length <= state.shown;
        el.more.textContent = "Xem thêm (" + (result.length - state.shown) + " vũ khí nữa)";
        el.info.innerHTML = "<strong>" + result.length + "</strong> / " + weapons.length + " vũ khí" +
            (state.q ? ' khớp với "<strong>' + esc(state.q) + '</strong>"' : "");

        el.search.value = state.q;
        el.sort.value = state.sort;
        el.team.value = state.team;
        el.range.value = state.max;
        el.priceLabel.textContent = money(state.max);
        el.favOnly.setAttribute("aria-pressed", String(state.fav));
        $$("[data-view]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.view === state.view)); });
        $$(".chip[data-cat]", el.chips).forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat)); });
        syncUrl();
    }

    function update(patch) {
        Object.assign(state, patch, { shown: PAGE_SIZE });
        render();
    }

    el.search.addEventListener("input", debounce(function () { update({ q: el.search.value.trim() }); }, 180));
    el.sort.addEventListener("change", function () { update({ sort: el.sort.value }); });
    el.team.addEventListener("change", function () { update({ team: el.team.value }); });
    el.range.addEventListener("input", function () { update({ max: Number(el.range.value) }); });
    el.favOnly.addEventListener("click", function () { update({ fav: !state.fav }); });
    el.chips.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-cat]");
        if (btn) update({ cat: btn.dataset.cat });
    });
    $$("[data-view]").forEach(function (b) {
        b.addEventListener("click", function () {
            state.view = b.dataset.view;
            store.set("cs2View", state.view);
            render();
        });
    });
    el.more.addEventListener("click", function () { state.shown += PAGE_SIZE; render(); });
    el.reset.addEventListener("click", function () {
        update({ q: "", cat: "All", team: "All", sort: "default", max: MAX_WEAPON_PRICE, fav: false });
    });

    // Bỏ yêu thích khi đang lọc "chỉ yêu thích" -> cập nhật danh sách ngay
    document.addEventListener("cs2:change", function () { if (state.fav) render(); });

    renderChips();
    render();
})();
