// Remove 'use client' directive since we're using server components
import React from 'react';

async function getProducts() {
  try {
    const response = await fetch('https://apistore.cybersoft.edu.vn/api/Product', {
      headers: {
        'accept': 'application/json',
        'TokenCybersoft': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjE1LzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczNDE5MDQwMDAwMCIsIm5iZiI6MTcwNTM5MDgwMCwiZXhwIjoxNzM0MzM4MDAwfQ.1Jj8o6T9Yx6J7qKx6J7qKx6J7qKx6J7qKx6J7qKx6J7qK'
      },
      cache: 'no-store' // Disable caching to always get fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Products() {
  const products = await getProducts();

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