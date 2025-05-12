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