# CS2 Arsenal – Weapon Database (ASM_PS47941)

Website Frontend tra cứu vũ khí Counter-Strike 2. Dự án môn Lập trình Web, **không dùng Backend**:
dữ liệu nằm trong `js/data.js`, tài khoản/yêu thích/so sánh được lưu bằng `localStorage`.

## Chức năng

| Trang | Nội dung |
|---|---|
| `index.html` | Trang chủ: tìm nhanh, vũ khí của ngày, thống kê, danh mục, vũ khí nổi bật, trang bị |
| `weapons.html` | Danh sách: tìm kiếm có tô sáng, lọc loại/phe/giá, sắp xếp, lưới/danh sách, "xem thêm", chỉ hiện yêu thích; bộ lọc đồng bộ lên URL |
| `detail.html?weapon=ak47` | Chi tiết: thông số có thanh tỉ lệ, vũ khí cùng nhóm, trước/sau, yêu thích, so sánh, sao chép liên kết |
| `compare.html` | So sánh tối đa 3 vũ khí, tô sáng giá trị tốt nhất, chia sẻ bằng liên kết |
| `loadout.html` | Lập kế hoạch mua: chọn phe T/CT, nhập tiền, giới hạn lựu đạn, tính tiền còn lại |
| `register.html` / `login.html` | Đăng ký, đăng nhập: kiểm tra từng trường, đo độ mạnh mật khẩu, mật khẩu băm SHA-256 + salt |
| `account.html` | Hồ sơ, vũ khí yêu thích, đăng xuất, xóa tài khoản |
| `contact.html` | Biểu mẫu liên hệ có kiểm tra dữ liệu, đếm ký tự, lưu tin nhắn vào localStorage |

## Cấu trúc

```
css/style.css     Toàn bộ giao diện (biến màu ở :root, responsive, tôn trọng prefers-reduced-motion)
js/data.js        Dữ liệu vũ khí, trang bị, thông số, danh mục
js/app.js         Dùng chung: header/footer, yêu thích, so sánh, tài khoản, thông báo
js/home.js · weapons.js · detail.js · compare.js · loadout.js · auth.js · contact.js   Mỗi trang một file
```

## Chạy dự án

Mở `index.html` trực tiếp, hoặc dùng Live Server của VS Code / `python -m http.server`.

## Lưu ý

- Thông số bắn (sát thương, tốc độ bắn...) mang tính tham khảo, có thể thay đổi theo bản cập nhật của Valve.
- Ảnh vũ khí tải từ CDN bên ngoài; nếu lỗi, thẻ sẽ hiện tên vũ khí thay thế.
- Đăng nhập chỉ là demo phía trình duyệt, không thay thế xác thực thật ở Backend.
