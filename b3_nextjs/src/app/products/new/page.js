export default function NewProduct() {
  return (
    <div>
      <h1>Add New Product</h1>
      <form style={{ maxWidth: '500px', marginTop: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Product Name:
            <input 
              type="text" 
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                marginTop: '0.5rem'
              }} 
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Price:
            <input 
              type="number" 
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                marginTop: '0.5rem'
              }} 
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Description:
            <textarea 
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                marginTop: '0.5rem',
                minHeight: '100px'
              }} 
            />
          </label>
        </div>
        <button 
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
} 