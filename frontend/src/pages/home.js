import React, { useEffect, useState } from 'react';
import API from '../utils/api';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await API.get('/products');
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <h2 style={{ textAlign: 'center' }}>Loading products...</h2>;

    return (
        <div className="products">
            {products.length > 0 ? (
                products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p><strong>${product.price}</strong></p>
                    </div>
                ))
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
}

export default Home;
