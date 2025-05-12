# Next.js Product Management System

Một ứng dụng quản lý sản phẩm đơn giản được xây dựng bằng Next.js.

## 1. Yêu cầu hệ thống
- Node.js version 20 (sử dụng nvm để quản lý version)
- npm (Node Package Manager)

## 2. Các bước cài đặt

### Bước 1: Chuyển sang Node.js v20
```bash
nvm use 20
```

### Bước 2: Tạo project Next.js mới
```bash
npx create-next-app@latest . --javascript --no-tailwind --no-eslint --src-dir --app
```
Khi được hỏi:
- Would you like to use Turbopack? → No
- Would you like to customize the import alias? → No

### Bước 3: Cấu trúc thư mục
```
src/
  ├── app/
  │   ├── layout.js        # Layout chung cho toàn bộ ứng dụng
  │   ├── page.js          # Trang chủ
  │   └── products/        # Thư mục chứa các trang liên quan đến sản phẩm
  │       ├── page.js      # Trang danh sách sản phẩm
  │       ├── [id]/        # Thư mục cho trang chi tiết sản phẩm
  │       │   └── page.js  # Trang chi tiết sản phẩm
  │       └── new/         # Thư mục cho trang thêm sản phẩm mới
  │           └── page.js  # Trang thêm sản phẩm mới
```

### Bước 4: Tạo các file cần thiết

1. **src/app/layout.js** - Layout chung:
```javascript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
          <nav>
            <a href="/" style={{ marginRight: '1rem' }}>Home</a>
            <a href="/products" style={{ marginRight: '1rem' }}>Products</a>
            <a href="/products/new">Add Product</a>
          </nav>
        </header>
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
```

2. **src/app/page.js** - Trang chủ:
```javascript
export default function Home() {
  return (
    <div>
      <h1>Welcome to Our Product Management System</h1>
      <p>This is a simple product management application built with Next.js.</p>
      <div style={{ marginTop: '2rem' }}>
        <h2>Features:</h2>
        <ul>
          <li>View all products</li>
          <li>Add new products</li>
          <li>View product details</li>
        </ul>
      </div>
    </div>
  );
}
```

3. **src/app/products/page.js** - Trang danh sách sản phẩm:
```javascript
export default function Products() {
  const products = [
    { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop' },
    { id: 2, name: 'Smartphone', price: 699, description: 'Latest smartphone model' },
    { id: 3, name: 'Headphones', price: 199, description: 'Wireless noise-cancelling headphones' },
  ];

  return (
    <div>
      <h1>Our Products</h1>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        {products.map(product => (
          <div key={product.id} style={{ 
            padding: '1rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <a href={`/products/${product.id}`}>View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
}
```

4. **src/app/products/[id]/page.js** - Trang chi tiết sản phẩm:
```javascript
export default function ProductDetail({ params }) {
  const products = [
    { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop', specs: '16GB RAM, 512GB SSD' },
    { id: 2, name: 'Smartphone', price: 699, description: 'Latest smartphone model', specs: '6.7" Display, 256GB Storage' },
    { id: 3, name: 'Headphones', price: 199, description: 'Wireless noise-cancelling headphones', specs: '40h Battery Life' },
  ];

  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <div style={{ marginTop: '2rem' }}>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Specifications:</strong> {product.specs}</p>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <a href="/products">Back to Products</a>
      </div>
    </div>
  );
}
```

5. **src/app/products/new/page.js** - Trang thêm sản phẩm mới:
```javascript
export default function NewProduct() {
  return (
    <div>
      <h1>Add New Product</h1>
      <form style={{ maxWidth: '500px', marginTop: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Product Name:
            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Price:
            <input type="number" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Description:
            <textarea style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', minHeight: '100px' }} />
          </label>
        </div>
        <button type="submit" style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Add Product
        </button>
      </form>
    </div>
  );
}
```

### Bước 5: Chạy ứng dụng
```bash
npm run dev
```

## 3. Truy cập ứng dụng
- Trang chủ: http://localhost:3000
- Danh sách sản phẩm: http://localhost:3000/products
- Chi tiết sản phẩm: http://localhost:3000/products/[id] (ví dụ: /products/1)
- Thêm sản phẩm mới: http://localhost:3000/products/new

## 4. Tính năng chính
- Routing động với Next.js App Router
- Styling inline với CSS
- Responsive design
- Navigation giữa các trang
- Hiển thị danh sách sản phẩm
- Form thêm sản phẩm mới
- Trang chi tiết sản phẩm

## 5. Lưu ý
- Đây là phiên bản đơn giản, chưa có xử lý form và lưu trữ dữ liệu
- Dữ liệu sản phẩm đang được hardcode trong code
- Để phát triển thêm, bạn có thể:
  - Thêm database để lưu trữ sản phẩm
  - Thêm chức năng xóa và cập nhật sản phẩm
  - Thêm validation cho form
  - Thêm authentication để bảo vệ các route
