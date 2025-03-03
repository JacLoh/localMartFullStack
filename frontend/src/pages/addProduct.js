import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      console.log("Submitting product:", formData); 
  
      const token = localStorage.getItem("token"); 
      console.log("🔑 Token being sent:", token); 
  
      if (!token) {
          alert(" You need to log in first!");
          return;
      }
  
      try {
          const { data } = await API.post("/products", formData, {
              headers: {
                  Authorization: `Bearer ${token}`, 
                  "Content-Type": "application/json"
              }
          });
  
          console.log("✅ Product added:", data);
          alert("✅ Product added successfully!");
          navigate("/");
      } catch (err) {
          console.error(" Error adding product:", err.response?.data || err.message);
          alert(` Error: ${err.response?.data?.message || "Something went wrong!"}`);
      }
  };
  
  
    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Product</h1>
            <input 
                type="text" 
                placeholder="Name" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />
            <input 
                type="number" 
                placeholder="Price" 
                value={formData.price} 
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
            />
            <textarea 
                placeholder="Description" 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input 
                type="text" 
                placeholder="Category" 
                value={formData.category} 
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
            />
            <button type="submit">Add Product</button>
        </form>
    );
}

export default AddProduct;
