# Cách Next.js App Router Hoạt Động

## 1. Layout và Page trong Next.js App Router

### Layout (layout.js)
- Đây là file chạy đầu tiên và bao bọc toàn bộ ứng dụng
- Layout chứa các thành phần UI được chia sẻ giữa các trang (như header, footer, navigation)
- Layout được giữ nguyên khi chuyển trang, chỉ nội dung bên trong thay đổi
- Trong code của chúng ta, `src/app/layout.js` chứa:
```javascript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/products/new">Add Product</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### Page (page.js)
- Chạy sau Layout
- Chứa nội dung cụ thể của từng trang
- Được truyền vào Layout thông qua prop `children`
- Ví dụ trong `src/app/page.js`:
```javascript
export default function Home() {
  return (
    <div>
      <h1>Welcome to Our Product Management System</h1>
      <p>This is a simple product management application...</p>
    </div>
  );
}
```

## 2. Quy trình render

```
Layout (layout.js)
    │
    ├── Header (luôn hiển thị)
    │
    ├── Page Content (page.js)
    │   - Thay đổi tùy theo route
    │   - Được truyền vào Layout qua {children}
    │
    └── Footer (nếu có)
```

## 3. Ví dụ cụ thể khi truy cập các route

### Khi truy cập http://localhost:3000:
1. `layout.js` chạy đầu tiên, tạo cấu trúc cơ bản
2. `page.js` (trang chủ) được render vào vị trí `{children}`

### Khi truy cập http://localhost:3000/products:
1. `layout.js` vẫn chạy, giữ nguyên header
2. `products/page.js` được render vào vị trí `{children}`

### Khi truy cập http://localhost:3000/products/1:
1. `layout.js` vẫn chạy, giữ nguyên header
2. `products/[id]/page.js` được render vào vị trí `{children}`

## 4. Lợi ích của cấu trúc này

### Hiệu suất tốt hơn
- Layout không cần render lại khi chuyển trang
- Chỉ nội dung trang thay đổi

### Trải nghiệm người dùng tốt hơn
- Không bị nhấp nháy khi chuyển trang
- Navigation luôn sẵn sàng

### Code sạch hơn
- Tách biệt UI chung và nội dung trang
- Dễ dàng bảo trì và cập nhật

## 5. Nested Layouts
- Bạn có thể tạo nhiều layout lồng nhau
- Ví dụ: layout chung cho toàn bộ app, layout riêng cho phần products
- Layout con sẽ được render bên trong layout cha

## 6. Luồng xử lý khi người dùng truy cập

1. **Request đến server:**
   - Người dùng truy cập một URL
   - Next.js nhận request

2. **Xử lý Layout:**
   - Layout gốc được render đầu tiên
   - Tạo cấu trúc HTML cơ bản
   - Chuẩn bị các thành phần UI chung

3. **Xử lý Page:**
   - Next.js xác định page cần render dựa trên route
   - Page được render và truyền vào Layout qua `children`
   - Nếu có nested layouts, chúng được render theo thứ tự từ ngoài vào trong

4. **Render cuối cùng:**
   - Layout + Page được kết hợp
   - HTML hoàn chỉnh được gửi đến trình duyệt
   - Trình duyệt hiển thị trang web

## 7. Lưu ý quan trọng

- Layout luôn được giữ nguyên khi chuyển trang
- Chỉ nội dung trong `{children}` thay đổi
- Có thể có nhiều layout lồng nhau
- Layout có thể chứa state và logic riêng
- Page có thể truy cập các props từ Layout 