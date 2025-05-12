import React from 'react';

async function getProductDetail(id) {
  try {
    const response = await fetch(`https://apistore.cybersoft.edu.vn/api/Product/${id}`, {
      headers: {
        'accept': 'application/json',
        'TokenCybersoft': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjE1LzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczNDE5MDQwMDAwMCIsIm5iZiI6MTcwNTM5MDgwMCwiZXhwIjoxNzM0MzM4MDAwfQ.1Jj8o6T9Yx6J7qKx6J7qKx6J7qKx6J7qKx6J7qKx6J7qK'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

export default async function ProductDetail({ params }) {
  const product = await getProductDetail(params.id);

  if (!product) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <a href="/products" style={{ color: 'blue', textDecoration: 'underline' }}>
          Back to Products
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/products" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '1rem', display: 'inline-block' }}>
          ← Back to Products
        </a>
        
        <div style={{ marginTop: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h1>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>Price:</strong> ${product.price}
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>Description:</strong>
            <p style={{ marginTop: '0.5rem' }}>{product.description}</p>
          </div>

          {product.image && (
            <div style={{ marginTop: '2rem' }}>
              <img 
                src={product.image} 
                alt={product.name}
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  borderRadius: '8px'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 