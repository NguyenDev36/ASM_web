/* CS2 ARSENAL - auth.js: đăng ký, đăng nhập, trang tài khoản */
(function () {
    "use strict";
    const { $, $$, esc, store, auth, favorites, compare, toast, weaponCard } = CS2;

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    /* Chỉ cho phép chuyển hướng đến trang .html trong cùng thư mục */
    function safeNext() {
        const next = new URLSearchParams(location.search).get("next");
        return next && /^[a-z0-9_-]+\.html(\?[^#]*)?$/i.test(next) ? next : "index.html";
    }

    function setError(id, message) {
        const input = document.getElementById(id);
        const out = document.getElementById(id + "Error");
        if (input) input.setAttribute("aria-invalid", message ? "true" : "false");
        if (out) out.textContent = message || "";
        return !message;
    }

    function setMessage(el, text, ok) {
        el.textContent = text || "";
        el.className = "form-message" + (text ? (ok ? " ok" : " err") : "");
    }

    /* Hiện / ẩn mật khẩu */
    $$(".show-password").forEach(function (button) {
        button.addEventListener("click", function () {
            const target = document.getElementById(button.dataset.target);
            const hidden = target.type === "password";
            target.type = hidden ? "text" : "password";
            button.textContent = hidden ? "Ẩn" : "Hiện";
        });
    });

    /* ---------- Đăng ký ---------- */
    const registerForm = $("#registerForm");
    if (registerForm) {
        const pw = $("#registerPassword");

        pw.addEventListener("input", function () {
            const v = pw.value;
            let level = 0;
            if (v.length >= 6) level++;
            if (v.length >= 10) level++;
            if (/[a-z]/.test(v) && /[A-Z]/.test(v)) level++;
            if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) level++;
            if (!v) level = 0;
            $("#strengthBar").dataset.level = level;
            $("#strengthText").textContent = ["Độ mạnh mật khẩu", "Yếu", "Trung bình", "Khá", "Mạnh"][level];
        });

        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const name = $("#registerName").value.trim();
            const email = $("#registerEmail").value.trim();
            const password = pw.value;
            const confirm = $("#registerConfirm").value;
            const message = $("#registerMessage");
            setMessage(message, "");

            const checks = [
                setError("registerName", name.length < 2 ? "Họ tên cần ít nhất 2 ký tự." : ""),
                setError("registerEmail", !EMAIL_RE.test(email) ? "Email chưa đúng định dạng." : ""),
                setError("registerPassword", password.length < 6 ? "Mật khẩu cần ít nhất 6 ký tự." : ""),
                setError("registerConfirm", confirm !== password ? "Mật khẩu nhập lại không giống nhau." : "")
            ];
            if (checks.indexOf(false) !== -1) return;

            const button = $("#registerSubmit");
            button.disabled = true;
            const result = await auth.register(name, email, password);
            button.disabled = false;

            if (!result.ok) { setMessage(message, result.error, false); return; }
            setMessage(message, "Đăng ký thành công! Đang chuyển sang trang đăng nhập...", true);
            setTimeout(function () { location.href = "login.html"; }, 1000);
        });
    }

    /* ---------- Đăng nhập ---------- */
    const loginForm = $("#loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const email = $("#loginEmail").value.trim();
            const password = $("#loginPassword").value;
            const message = $("#loginMessage");
            setMessage(message, "");

            const checks = [
                setError("loginEmail", !EMAIL_RE.test(email) ? "Nhập email đúng định dạng." : ""),
                setError("loginPassword", !password ? "Nhập mật khẩu." : "")
            ];
            if (checks.indexOf(false) !== -1) return;

            const button = $("#loginSubmit");
            button.disabled = true;
            const result = await auth.login(email, password);
            button.disabled = false;

            if (!result.ok) { setMessage(message, result.error, false); return; }
            setMessage(message, "Đăng nhập thành công! Đang chuyển trang...", true);
            setTimeout(function () { location.href = safeNext(); }, 600);
        });
    }

    /* ---------- Trang tài khoản ---------- */
    const area = $("#accountArea");
    if (area) {
        const user = auth.current();
        if (!user) {
            location.replace("login.html?next=account.html");
            return;
        }
        const messages = store.get("cs2Messages", []);
        const favs = favorites.all().map(getItem).filter(Boolean);

        area.innerHTML =
            '<aside class="account-card">' +
                '<div class="avatar">' + esc(user.name.trim().charAt(0).toUpperCase()) + "</div>" +
                "<h2>" + esc(user.name) + "</h2>" +
                "<p>" + esc(user.email) + "</p>" +
                "<p>Tham gia: " + new Date(user.createdAt).toLocaleDateString("vi-VN") + "</p>" +
                '<div class="actions">' +
                    '<button class="btn ghost" type="button" id="accLogout">Đăng xuất</button>' +
                    '<button class="btn danger" type="button" id="accDelete">Xóa tài khoản</button>' +
                "</div>" +
            "</aside>" +
            "<div>" +
                '<div class="mini-stats">' +
                    "<div><strong>" + favs.length + "</strong><span>vũ khí yêu thích</span></div>" +
                    "<div><strong>" + compare.all().length + "</strong><span>vũ khí đang so sánh</span></div>" +
                    "<div><strong>" + messages.length + "</strong><span>tin nhắn đã gửi</span></div>" +
                "</div>" +
                '<h2 class="subheading" style="margin-top:0">Vũ khí yêu thích</h2>' +
                (favs.length
                    ? '<div class="weapon-grid">' + favs.map(function (w) { return weaponCard(w); }).join("") + "</div>"
                    : '<div class="empty-state"><h3>Chưa có vũ khí yêu thích</h3><p>Bấm ♥ trên thẻ vũ khí để lưu lại ở đây.</p><a class="btn" href="weapons.html">Xem danh sách vũ khí</a></div>') +
            "</div>";

        $("#accLogout").addEventListener("click", function () {
            auth.logout();
            location.href = "index.html";
        });
        $("#accDelete").addEventListener("click", function () {
            if (confirm("Xóa tài khoản này khỏi trình duyệt? Thao tác không thể hoàn tác.")) {
                auth.deleteCurrent();
                location.href = "index.html";
            }
        });

        // Bỏ yêu thích ngay trong trang tài khoản -> vẽ lại danh sách
        document.addEventListener("cs2:change", function () {
            if (!auth.current()) return;
            const current = favorites.all().map(getItem).filter(Boolean);
            const grid = area.querySelector(".weapon-grid");
            if (grid && current.length) grid.innerHTML = current.map(function (w) { return weaponCard(w); }).join("");
            else if (!current.length) location.reload();
            const first = area.querySelector(".mini-stats strong");
            if (first) first.textContent = current.length;
        });
    }
})();
