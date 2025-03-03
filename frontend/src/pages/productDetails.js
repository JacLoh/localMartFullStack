
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to store product data
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Location:</strong> {product.location}</p>
      {product.seller && (
        <p><strong>Seller:</strong> {product.seller.name} ({product.seller.email})</p>
      )}
      {product.images && product.images.length > 0 && (
        <div>
          <h3>Images:</h3>
          {product.images.map((image, index) => (
            <img key={index} src={image} alt={`Product ${index + 1}`} style={{ width: '200px', marginRight: '10px' }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
