import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(" Sending request:", formData); 

    try {
        const { data } = await API.post("/api/auth/register", formData);
        console.log(" Registration success:", data);
        navigate("/login");
    } catch (err) {
        console.error(" Registration error:", err.response?.data || err.message);
    }
};


  return (
    <form onSubmit={handleSubmit}>
    <h1>Register</h1>
    <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
    />
    <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
    />
    <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
    />
    <button type="submit">Register</button>
</form>

  );
}

export default Register;