# 💖 MonMon - Your Premium Anniversary Sanctuary

[Tiếng Việt bên dưới](#-monmon---thánh-địa-kỷ-niệm-cao-cấp)

Welcome to **MonMon**, a beautifully crafted, highly immersive web application designed to celebrate and preserve your most precious memories. This project has undergone a **Big Update**, transforming it from a simple gallery into a sophisticated, highly customizable digital sanctuary.

---

## 🚀 What's New (Big Update)

### 🎨 Premium Aesthetics & UX
- **Glassmorphism & 3D Effects**: Implemented a modern design system using glassmorphism, 3D rotations, and deep shadows.
- **Immersive Mode**: Hidden global scrollbars for an app-like feel while retaining fluid scrolling.
- **Dynamic Animations**: Added heartbeat effects, floating bubbles, and smooth transitions to bring the interface to life.
- **Lazy Loading**: Optimized performance by loading images only when they enter the viewport.

### 📸 Advanced Gallery Features
- **3D Featured Carousel**: A stunning 3D rotating showcase for your top memories.
- **Masonry Layout**: Intelligent grid system that adapts perfectly to images of different aspect ratios.
- **Responsive Fallbacks**: Automatic switching to grid mode on mobile devices for optimal accessibility.
- **Autoplay Control**: New gallery settings to toggle slideshow auto-play.

### 🎵 Immersive Musical Experience
- **Smart Media Bar**: A desktop-optimized player with "Smart Marquee" for long titles and intuitive controls.
- **Interactive Mini-Mode**: Minimize the player into a beautiful rotating disc with expanding interactions.
- **Full Mobile Modal**: Dedicated full-screen music interface for mobile, featuring a large rotating avatar, glow effects, and integrated playlist management.
- **Visual Sync**: Spin animations and pink neon glow pulse effects that synchronize with the playback state.
- **Expanded Playlist**: Pre-configured with premium tracks, easily customizable via JSON.

### ⚙️ No-Code Customization
- **Consolidated Metadata**: All dynamic data is now stored in a single `src/api/users.json` file.
- **Branding**: Change the app name, footer text, and landing titles without touching a single line of React code.
- **Anniversary Tracking**: Easily update your anniversary date to restart the "In Love" counter.
- **Event Schedule**: Configurable Lunar New Year (Tết) dates that automatically update the countdown timer.

### 🌍 Universal Accessibility
- **Trilingual Support**: Full internationalization for **English**, **Vietnamese**, and **Chinese**.
- **Robust Date Parsing**: Fixed "Invalid Date" issues with a custom parser that understands localized date formats.
- **Localized Music UI**: All player tooltips, playback labels, and playlist headers are fully translated across all supported languages.
- **System-wide Localization**: Everything from settings, notifications, to post view modes (List/Grid) is now fully localized.

---

## 🛠️ Technical Stack
- **Core**: React + Vite
- **Styling**: Tailwind CSS + Custom CSS Utilities
- **Animation**: CSS Keyframes + Framer-like transitions
- **Internationalization**: i18next
- **Icons**: React Icons (Io5, Lu, Hi, Fa)

---

## 📦 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Running Locally
```bash
npm run dev
```

### 3. Customization
To personalize this app, simply edit `src/api/users.json`:
- **metadata**: Change `appName`, `footerName`, `anniversaryDate`, etc.
- **users**: Update names, avatars, and social profiles.
- **posts**: Add your own memories with images and descriptions.

---

# 💖 MonMon - Thánh Địa Kỷ Niệm Cao Cấp

Chào mừng bạn đến với **MonMon**, ứng dụng web được thiết kế tinh tế và sống động nhằm tôn vinh và lưu giữ những kỷ niệm quý giá nhất của bạn. Dự án vừa trải qua một đợt **Cập Nhật Lớn (Big Update)**, chuyển mình từ một thư viện ảnh đơn giản thành một thánh địa kỹ thuật số tinh xảo và có khả năng tùy biến cao.

---

## 🚀 Có Gì Mới? (Big Update)

### 🎨 Thẩm Mỹ & UX Cao Cấp
- **Glassmorphism & Hiệu ứng 3D**: Hệ thống thiết kế hiện đại sử dụng hiệu ứng kính mờ (glassmorphism), xoay 3D và đổ bóng sâu.
- **Chế độ Đắm chìm**: Ẩn thanh cuộn toàn trang để mang lại cảm giác như một ứng dụng di động thực thụ trong khi vẫn giữ được sự mượt mà khi cuộn.
- **Hoạt ảnh Động**: Thêm các hiệu ứng nhịp tim, bong bóng lơ lửng và chuyển cảnh mượt mà.
- **Lazy Loading**: Tối ưu hóa hiệu suất bằng cách chỉ tải hình ảnh khi chúng xuất hiện trên màn hình.

### 📸 Tính Năng Thư Viện Nâng Cao
- **Vòng xoay 3D**: Trình diễn các kỷ niệm nổi bật với hiệu ứng xoay 3D ấn tượng.
- **Bố cục Masonry**: Hệ thống lưới thông minh tự động thích ứng với các hình ảnh có tỉ lệ khác nhau.
- **Tự động Thích ứng**: Tự động chuyển sang chế độ lưới trên thiết bị di động để tối ưu hóa trải nghiệm.
- **Điều khiển Tự động phát**: Cài đặt mới cho phép bật/tắt chế độ tự động trình chiếu.

### 🎵 Trải Nghiệm Âm Nhạc Đắm Chìm
- **Media Bar Thông Minh**: Trình phát nhạc tối ưu cho máy tính với hiệu ứng "Smart Marquee" tự động chạy chữ và bộ điều khiển trực quan.
- **Chế độ Đĩa Thu Nhỏ**: Thu gọn trình phát thành một chiếc đĩa xoay tinh tế với khả năng mở rộng/thu nhỏ mượt mà.
- **Giao diện Mobile Modal**: Trình phát toàn màn hình dành riêng cho di động với đĩa nhạc lớn, hệ thống nút điều khiển chuyên nghiệp và quản lý danh sách nhạc.
- **Đồng bộ Thị giác**: Hoạt ảnh xoay đĩa và hiệu ứng nháy đèn neon hồng đồng bộ hoàn hảo với trạng thái phát/tạm dừng.
- **Danh sách nhạc mở rộng**: Đã tích hợp sẵn các bản nhạc chất lượng cao, dễ dàng tùy chỉnh qua tệp JSON.

### ⚙️ Tùy Biến Không Cần Code
- **Hợp nhất Dữ liệu**: Tất cả dữ liệu động hiện được lưu trữ trong một tệp duy nhất: `src/api/users.json`.
- **Định danh Thương hiệu**: Thay đổi tên ứng dụng, văn bản footer và tiêu đề trang mà không cần chạm vào code React.
- **Theo dõi Kỷ niệm**: Dễ dàng cập nhật ngày kỷ niệm để khởi động lại bộ đếm "In Love".
- **Lịch Sự kiện**: Danh sách ngày Tết Nguyên Đán có thể cấu hình và tự động cập nhật đồng hồ đếm ngược.

### 🌍 Tiếp Cận Toàn Cầu
- **Hỗ trợ Đa ngôn ngữ**: Hoàn thiện quốc tế hóa cho **Tiếng Anh**, **Tiếng Việt**, và **Tiếng Trung**.
- **Xử lý Ngày tháng**: Khắc phục lỗi "Invalid Date" bằng bộ phân tích tùy chỉnh cho các định dạng ngày bản địa.
- **Bản địa hóa Trình phát nhạc**: Toàn bộ tooltip, nhãn điều khiển và tiêu đề playlist đã được dịch thuật chi tiết trên mọi ngôn ngữ.
- **Giao diện Bản địa hóa**: Mọi thứ từ cài đặt, thông báo đến chế độ xem bài viết (Danh sách/Lưới) đều được quốc tế hóa 100%.

---

## 🛠️ Công Nghệ Sử Dụng
- **Cốt lõi**: React + Vite
- **Styling**: Tailwind CSS + Custom CSS Utilities
- **Hoạt ảnh**: CSS Keyframes
- **Quốc tế hóa**: i18next
- **Icons**: React Icons

---

## 📦 Bắt Đầu

### 1. Cài đặt
```bash
npm install
```

### 2. Chạy trên máy bộ
```bash
npm run dev
```

### 3. Tùy chỉnh theo cách của bạn
Để cá nhân hóa ứng dụng, chỉ cần chỉnh sửa tệp `src/api/users.json`:
- **metadata**: Thay đổi `appName`, `footerName`, `anniversaryDate`,...
- **users**: Cập nhật tên, ảnh đại diện và hồ sơ mạng xã hội.
- **posts**: Thêm những kỷ niệm của riêng bạn với hình ảnh và mô tả.
