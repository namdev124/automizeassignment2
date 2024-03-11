import React, { useState, useEffect } from 'react';
import "./App.css"

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="App">
      <h1>Store Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="product-details">
          <button onClick={handleCloseDetails}>Close</button>
          <h2>{selectedProduct.title}</h2>
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <p><strong>Category:</strong> {selectedProduct.category}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Price:</strong> ${selectedProduct.price}</p>
        </div>
      )}
    </div>
  );
}

export default App;
