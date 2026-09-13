# Phát hành ứng dụng

`app-version.js` là nguồn phiên bản duy nhất. Mỗi lần thay đổi ứng dụng để phát hành, tăng `APP_VERSION` trong file này, kể cả khi khôi phục code cũ. Không ghi phiên bản riêng vào HTML, tên cache, manifest hoặc đường dẫn CSS/JS.

Các trang dùng `app-release.js` để hiển thị phiên bản và kiểm tra cập nhật khi mở trang, trở lại trang, có mạng và mỗi 5 phút. Service worker đọc cùng nguồn và tải đủ các file chính trước khi cho phép cập nhật. Một file chính lỗi tải thì bản đang hoạt động được giữ lại.

Người dùng bấm **Cập nhật** sau khi hoàn tất nội dung đang nhập. Trang không tự tải lại. Bản nháp, lịch sử và hàng đợi Drive trong localStorage/IndexedDB không bị xóa khi cập nhật. Cache các bản trước được giữ để phục vụ các tab còn mở; tài liệu/bản vẽ lớn được lưu khi truy cập.

Trước khi đẩy lên `main`: chạy `node scripts/check-release.cjs`, kiểm tra mở trang, xuất nhật ký và cập nhật từ bản trước. GitHub Pages cũng chạy kiểm tra nguồn phiên bản trước khi phát hành.

Số hiệu tài liệu biện pháp thi công (Rev.), phiên bản thư viện bên ngoài và tên bản vẽ là thông tin độc lập, không phải phiên bản ứng dụng.
