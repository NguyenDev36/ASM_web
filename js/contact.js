/* CS2 ARSENAL - contact.js: biểu mẫu liên hệ */
(function () {
    "use strict";
    const { $, store, auth } = CS2;

    const form = $("#contactForm");
    if (!form) return;

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const fields = ["contactName", "contactEmail", "contactSubject", "contactMessage"];
    const message = $("#contactMessageText");

    function setError(id, text) {
        const input = document.getElementById(id);
        input.setAttribute("aria-invalid", text ? "true" : "false");
        document.getElementById(id + "Error").textContent = text || "";
        return !text;
    }

    // Điền sẵn thông tin nếu đã đăng nhập
    const user = auth.current();
    if (user) {
        $("#contactName").value = user.name;
        $("#contactEmail").value = user.email;
    }

    $("#contactMessage").addEventListener("input", function () {
        $("#charCount").textContent = this.value.length;
    });
    fields.forEach(function (id) {
        document.getElementById(id).addEventListener("input", function () { setError(id, ""); });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = {
            name: $("#contactName").value.trim(),
            email: $("#contactEmail").value.trim(),
            subject: $("#contactSubject").value.trim(),
            content: $("#contactMessage").value.trim()
        };

        const checks = [
            setError("contactName", data.name.length < 2 ? "Nhập họ tên (ít nhất 2 ký tự)." : ""),
            setError("contactEmail", !EMAIL_RE.test(data.email) ? "Email chưa đúng định dạng." : ""),
            setError("contactSubject", !data.subject ? "Nhập chủ đề liên hệ." : ""),
            setError("contactMessage", data.content.length < 10 ? "Nội dung cần ít nhất 10 ký tự." : "")
        ];
        if (checks.indexOf(false) !== -1) {
            message.textContent = "";
            return;
        }

        const list = store.get("cs2Messages", []);
        list.push(Object.assign({ at: new Date().toISOString() }, data));
        store.set("cs2Messages", list);

        message.className = "form-message ok";
        message.textContent = "Đã lưu tin nhắn của bạn. Đây là chức năng demo Frontend nên tin nhắn chưa được gửi đến máy chủ.";
        form.reset();
        $("#charCount").textContent = "0";
        if (user) {
            $("#contactName").value = user.name;
            $("#contactEmail").value = user.email;
        }
    });
})();
