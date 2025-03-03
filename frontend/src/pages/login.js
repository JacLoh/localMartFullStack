import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const { data } = await API.post("/auth/login", formData);
        console.log(" Login successful. Token received:", data.token);

        localStorage.setItem("token", data.token); 
        console.log("🔐 Token saved in Local Storage:", localStorage.getItem("token")); 

        navigate("/");
    } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
    }
};


    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
