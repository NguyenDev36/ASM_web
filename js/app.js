/* ==========================================================
   CS2 ARSENAL - app.js
   Phần dùng chung cho mọi trang: tiện ích, lưu trữ, yêu thích,
   so sánh, tài khoản, header/footer, thông báo.
   ========================================================== */
(function () {
    "use strict";

    /* ---------- Tiện ích ---------- */
    const $ = (sel, root) => (root || document).querySelector(sel);
    const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

    function esc(value) {
        return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function debounce(fn, ms) {
        let timer;
        return function () {
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () { fn.apply(null, args); }, ms || 200);
        };
    }

    function money(n) { return "$" + Number(n).toLocaleString("en-US"); }

    function highlight(text, query) {
        const q = (query || "").trim();
        if (!q) return esc(text);
        const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
        let out = "", last = 0, m;
        text = String(text);
        while ((m = re.exec(text)) !== null) {
            if (m[0] === "") { re.lastIndex++; continue; }
            out += esc(text.slice(last, m.index)) + "<mark>" + esc(m[0]) + "</mark>";
            last = m.index + m[0].length;
        }
        return out + esc(text.slice(last));
    }

    /* ---------- Lưu trữ an toàn (localStorage) ---------- */
    const store = {
        get: function (key, fallback) {
            try {
                const raw = localStorage.getItem(key);
                return raw === null ? fallback : JSON.parse(raw);
            } catch (e) { return fallback; }
        },
        set: function (key, value) {
            try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
        },
        remove: function (key) {
            try { localStorage.removeItem(key); } catch (e) { /* bỏ qua */ }
        }
    };

    function emitChange() { document.dispatchEvent(new CustomEvent("cs2:change")); }

    /* ---------- Thông báo (toast) ---------- */
    function toast(message, type) {
        let box = $("#toasts");
        if (!box) {
            box = document.createElement("div");
            box.id = "toasts";
            box.className = "toasts";
            box.setAttribute("role", "status");
            box.setAttribute("aria-live", "polite");
            document.body.appendChild(box);
        }
        const el = document.createElement("div");
        el.className = "toast" + (type === "error" ? " error" : "");
        el.textContent = message;
        box.appendChild(el);
        setTimeout(function () { el.remove(); }, 2800);
    }

    /* ---------- Yêu thích ---------- */
    const favorites = {
        key: "cs2Favorites",
        all: function () { return store.get(this.key, []); },
        has: function (id) { return this.all().indexOf(id) !== -1; },
        toggle: function (id) {
            let list = this.all();
            if (list.indexOf(id) !== -1) list = list.filter(function (x) { return x !== id; });
            else list.push(id);
            store.set(this.key, list);
            emitChange();
            return list.indexOf(id) !== -1;
        }
    };

    /* ---------- So sánh (tối đa 3) ---------- */
    const compare = {
        key: "cs2Compare",
        max: 3,
        all: function () {
            return store.get(this.key, []).filter(function (id) { return !!getItem(id); });
        },
        has: function (id) { return this.all().indexOf(id) !== -1; },
        set: function (ids) { store.set(this.key, ids.slice(0, this.max)); emitChange(); },
        toggle: function (id) {
            let list = this.all();
            if (list.indexOf(id) !== -1) {
                list = list.filter(function (x) { return x !== id; });
            } else {
                if (list.length >= this.max) return null;
                list.push(id);
            }
            this.set(list);
            return list.indexOf(id) !== -1;
        },
        clear: function () { this.set([]); }
    };

    /* ---------- Tài khoản (demo, lưu trên trình duyệt) ----------
       Mật khẩu được băm SHA-256 + salt trước khi lưu, không lưu dạng thô. */
    const auth = {
        usersKey: "cs2Users",
        sessionKey: "cs2Session",

        users: function () { return store.get(this.usersKey, []); },

        hash: async function (password, salt) {
            const data = new TextEncoder().encode(salt + ":" + password);
            if (window.crypto && window.crypto.subtle) {
                const buf = await window.crypto.subtle.digest("SHA-256", data);
                return Array.from(new Uint8Array(buf))
                    .map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
            }
            let h = 5381; // dự phòng khi trình duyệt không hỗ trợ crypto.subtle
            data.forEach(function (b) { h = ((h << 5) + h + b) >>> 0; });
            return "x" + h.toString(16);
        },

        randomSalt: function () {
            const arr = new Uint8Array(8);
            if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(arr);
            else for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
            return Array.from(arr).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
        },

        // Chuyển tài khoản kiểu cũ (mật khẩu thô) sang định dạng băm
        migrateLegacy: async function () {
            const legacy = store.get("cs2User", null);
            if (!legacy || !legacy.email || !legacy.password) return;
            const users = this.users();
            if (!users.some(function (u) { return u.email === legacy.email.toLowerCase(); })) {
                const salt = this.randomSalt();
                users.push({
                    name: legacy.name || "Người dùng",
                    email: legacy.email.toLowerCase(),
                    salt: salt,
                    hash: await this.hash(legacy.password, salt),
                    createdAt: new Date().toISOString()
                });
                store.set(this.usersKey, users);
            }
            store.remove("cs2User");
            store.remove("cs2LoggedIn");
        },

        register: async function (name, email, password) {
            await this.migrateLegacy();
            email = email.toLowerCase();
            const users = this.users();
            if (users.some(function (u) { return u.email === email; })) {
                return { ok: false, error: "Email này đã được đăng ký." };
            }
            const salt = this.randomSalt();
            users.push({
                name: name, email: email, salt: salt,
                hash: await this.hash(password, salt),
                createdAt: new Date().toISOString()
            });
            store.set(this.usersKey, users);
            return { ok: true };
        },

        login: async function (email, password) {
            await this.migrateLegacy();
            email = email.toLowerCase();
            const user = this.users().find(function (u) { return u.email === email; });
            if (!user) return { ok: false, error: "Email chưa được đăng ký." };
            if (await this.hash(password, user.salt) !== user.hash) {
                return { ok: false, error: "Mật khẩu không đúng." };
            }
            store.set(this.sessionKey, user.email);
            emitChange();
            return { ok: true, user: user };
        },

        logout: function () { store.remove(this.sessionKey); emitChange(); },

        current: function () {
            const email = store.get(this.sessionKey, null);
            if (!email) return null;
            return this.users().find(function (u) { return u.email === email; }) || null;
        },

        deleteCurrent: function () {
            const user = this.current();
            if (!user) return;
            store.set(this.usersKey, this.users().filter(function (u) { return u.email !== user.email; }));
            this.logout();
        }
    };

    /* ---------- Hiển thị ---------- */
    function teamText(side) {
        if (side === "Both") return "T + CT";
        return side;
    }
    function teamClass(side) {
        return side === "T" ? "t" : side === "CT" ? "ct" : "";
    }
    function statusText(item) {
        return item.status === "development" ? "Dữ liệu phát triển" : "Có trong game";
    }
    function categoryLabel(key) {
        const c = CATEGORIES.find(function (x) { return x.key === key; });
        return c ? c.label : key;
    }

    function imageHTML(item) {
        if (!item.image) {
            return '<span class="image-fallback">' + esc(item.name) + "<small>Chưa có ảnh chính thức</small></span>";
        }
        return '<img src="' + esc(item.image) + '" alt="' + esc(item.name) + '" loading="lazy" data-fallback>' +
            '<span class="image-fallback" hidden>' + esc(item.name) + "</span>";
    }

    // Ảnh tải lỗi -> hiện tên vũ khí thay thế
    document.addEventListener("error", function (e) {
        const img = e.target;
        if (img && img.tagName === "IMG" && img.hasAttribute("data-fallback")) {
            img.hidden = true;
            if (img.nextElementSibling) img.nextElementSibling.hidden = false;
        }
    }, true);

    function weaponCard(w, query) {
        const faved = favorites.has(w.id);
        const cmp = compare.has(w.id);
        return '<article class="weapon-card' + (w.status === "development" ? " development" : "") + '">' +
            '<div class="weapon-image">' +
                '<a href="detail.html?weapon=' + w.id + '" tabindex="-1" aria-hidden="true">' + imageHTML(w) + "</a>" +
                '<div class="card-actions">' +
                    '<button class="icon-btn" data-fav="' + w.id + '" aria-pressed="' + faved + '" aria-label="Yêu thích ' + esc(w.name) + '" title="Yêu thích">♥</button>' +
                    '<button class="icon-btn" data-cmp="' + w.id + '" aria-pressed="' + cmp + '" aria-label="So sánh ' + esc(w.name) + '" title="Thêm vào so sánh">⇄</button>' +
                "</div>" +
            "</div>" +
            '<div class="weapon-body">' +
                '<div class="card-top">' +
                    '<span class="tag">' + esc(categoryLabel(w.category)) + "</span>" +
                    '<span class="team-tag ' + teamClass(w.side) + '">' + teamText(w.side) + "</span>" +
                "</div>" +
                "<div>" +
                    '<h3><a href="detail.html?weapon=' + w.id + '">' + highlight(w.name, query) + "</a></h3>" +
                    "<p>" + esc(w.type) + "</p>" +
                    (w.status === "development" ? '<small class="dev-label">Đang ở dữ liệu phát triển</small>' : "") +
                "</div>" +
                '<div class="card-price">' +
                    '<span class="money">' + esc(w.price) + "</span>" +
                    '<a class="weapon-link" href="detail.html?weapon=' + w.id + '">Xem chi tiết</a>' +
                "</div>" +
            "</div>" +
        "</article>";
    }

    /* ---------- Nút yêu thích / so sánh (dùng chung, ủy quyền sự kiện) ---------- */
    function syncButtons() {
        $$("[data-fav]").forEach(function (b) { b.setAttribute("aria-pressed", String(favorites.has(b.dataset.fav))); });
        $$("[data-cmp]").forEach(function (b) { b.setAttribute("aria-pressed", String(compare.has(b.dataset.cmp))); });
    }

    document.addEventListener("click", function (e) {
        const favBtn = e.target.closest("[data-fav]");
        const cmpBtn = e.target.closest("[data-cmp]");
        if (favBtn) {
            const item = getItem(favBtn.dataset.fav);
            const on = favorites.toggle(favBtn.dataset.fav);
            toast(on ? "Đã thêm " + item.name + " vào yêu thích" : "Đã bỏ " + item.name + " khỏi yêu thích");
        } else if (cmpBtn) {
            const item = getItem(cmpBtn.dataset.cmp);
            const result = compare.toggle(cmpBtn.dataset.cmp);
            if (result === null) toast("Chỉ so sánh được tối đa " + compare.max + " vũ khí.", "error");
            else toast(result ? "Đã thêm " + item.name + " vào so sánh" : "Đã bỏ " + item.name + " khỏi so sánh");
        }
    });

    /* ---------- Header / footer ---------- */
    const NAV = [
        { page: "home", href: "index.html", text: "Trang chủ" },
        { page: "weapons", href: "weapons.html", text: "Vũ khí" },
        { page: "compare", href: "compare.html", text: "So sánh" },
        { page: "loadout", href: "loadout.html", text: "Lập kế hoạch mua" },
        { page: "contact", href: "contact.html", text: "Liên hệ" }
    ];

    function renderHeader() {
        const host = $("#siteHeader");
        if (!host) return;
        const page = document.body.dataset.page;
        const user = auth.current();
        const favCount = favorites.all().length;
        const cmpCount = compare.all().length;

        const links = NAV.map(function (n) {
            const isActive = n.page === page || (n.page === "weapons" && page === "detail");
            const badge = n.page === "compare" && cmpCount ? ' <span class="badge">' + cmpCount + "</span>" : "";
            return '<a href="' + n.href + '"' + (isActive ? ' class="active" aria-current="page"' : "") + ">" + n.text + badge + "</a>";
        }).join("");

        const fav = '<a href="weapons.html?fav=1" aria-label="Danh sách yêu thích">♥ Yêu thích' +
            (favCount ? ' <span class="badge">' + favCount + "</span>" : "") + "</a>";

        const account = user
            ? '<a href="account.html"' + (page === "account" ? ' class="active"' : "") + ">" + esc(user.name.split(" ").pop()) + '</a>' +
              '<button class="nav-btn" id="logoutBtn" type="button">Đăng xuất</button>'
            : '<a href="login.html"' + (page === "login" ? ' class="active"' : "") + '>Đăng nhập</a>' +
              '<a class="nav-cta" href="register.html">Đăng ký</a>';

        host.innerHTML =
            '<header class="header" id="top"><div class="container nav-box">' +
                '<a class="logo" href="index.html">CS2 <span>ARSENAL</span></a>' +
                '<button class="menu-btn" id="menuBtn" type="button" aria-label="Mở menu" aria-expanded="false" aria-controls="mainNav">☰</button>' +
                '<nav id="mainNav" aria-label="Điều hướng chính">' + links + fav + '<span class="nav-sep"></span>' + account + "</nav>" +
            "</div></header>";

        const menuBtn = $("#menuBtn");
        const nav = $("#mainNav");
        menuBtn.addEventListener("click", function () {
            const open = nav.classList.toggle("show");
            menuBtn.setAttribute("aria-expanded", String(open));
        });
        const logout = $("#logoutBtn");
        if (logout) logout.addEventListener("click", function () {
            auth.logout();
            toast("Đã đăng xuất.");
            if (page === "account") location.href = "index.html";
        });
    }

    function renderFooter() {
        const host = $("#siteFooter");
        if (!host) return;
        host.innerHTML =
            '<footer class="footer"><div class="container footer-box">' +
                '<div><a class="logo" href="index.html">CS2 <span>ARSENAL</span></a>' +
                "<p>Cơ sở dữ liệu vũ khí Counter-Strike 2: tra cứu, so sánh và lập kế hoạch mua đồ. Dự án môn Lập trình Web (Frontend).</p></div>" +
                '<div><h4>Khám phá</h4><a href="weapons.html">Tất cả vũ khí</a><a href="compare.html">So sánh vũ khí</a><a href="loadout.html">Lập kế hoạch mua</a></div>' +
                '<div><h4>Tài khoản</h4><a href="login.html">Đăng nhập</a><a href="register.html">Đăng ký</a><a href="contact.html">Liên hệ</a></div>' +
            '</div><div class="copyright">© 2026 CS2 Arsenal – Student Frontend Project. Không liên kết với Valve.</div></footer>';
    }

    function renderCompareBar() {
        let bar = $("#compareBar");
        const count = compare.all().length;
        if (document.body.dataset.page === "compare" || count === 0) {
            if (bar) bar.hidden = true;
            return;
        }
        if (!bar) {
            bar = document.createElement("div");
            bar.id = "compareBar";
            bar.className = "compare-bar";
            document.body.appendChild(bar);
        }
        bar.hidden = false;
        bar.innerHTML = "<span>Đã chọn <strong>" + count + "/" + compare.max + "</strong> vũ khí để so sánh</span>" +
            '<a class="btn small" href="compare.html">So sánh ngay</a>' +
            '<button class="btn ghost small" type="button" id="clearCompare">Xóa</button>';
        $("#clearCompare").addEventListener("click", function () { compare.clear(); });
    }

    function setupToTop() {
        const btn = document.createElement("button");
        btn.className = "to-top";
        btn.type = "button";
        btn.hidden = true;
        btn.setAttribute("aria-label", "Lên đầu trang");
        btn.textContent = "↑";
        btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
        document.body.appendChild(btn);

        window.addEventListener("scroll", function () {
            btn.hidden = window.scrollY < 600;
            const header = $(".header");
            if (header) header.classList.toggle("scrolled", window.scrollY > 8);
        }, { passive: true });
    }

    function refreshChrome() {
        renderHeader();
        renderCompareBar();
        syncButtons();
    }

    document.addEventListener("cs2:change", refreshChrome);
    window.addEventListener("storage", function () { refreshChrome(); });

    renderHeader();
    renderFooter();
    renderCompareBar();
    setupToTop();

    // Mở trang rồi xóa tài khoản cũ nếu còn dữ liệu kiểu cũ
    auth.migrateLegacy();

    /* ---------- Xuất ra toàn cục ---------- */
    window.CS2 = {
        $: $, $$: $$, esc: esc, debounce: debounce, money: money, highlight: highlight,
        store: store, toast: toast, favorites: favorites, compare: compare, auth: auth,
        teamText: teamText, teamClass: teamClass, statusText: statusText, categoryLabel: categoryLabel,
        imageHTML: imageHTML, weaponCard: weaponCard, syncButtons: syncButtons
    };
})();
