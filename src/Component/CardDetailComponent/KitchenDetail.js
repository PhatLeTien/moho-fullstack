import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const KitchenDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        console.log(`Fetching product with id: ${id}`);
        axios.get(`http://localhost:3001/product/${id}`)
            .then(response => {
                console.log('Product detail:', response.data);
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product detail:', error);
            });
    }, [id]);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const addToCart = () => {
        const productToAdd = {
            id: `product_${id}`,
            name: product.ten_sanpham,
            price: product.gia,
            quantity: quantity,
            image: product.anh
        };

        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartItemsArray = Array.isArray(existingCartItems) ? existingCartItems : [];

        let productExists = false;
        cartItemsArray.forEach(item => {
            if (item.id === productToAdd.id) {
                item.quantity += quantity;
                productExists = true;
            }
        });

        if (!productExists) {
            cartItemsArray.push(productToAdd);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card-detail-container">
            <div className="card-detail">
            <img src={`/images/${product.anh}`} alt="Product" className="card-detail-image" />
                <div className="card-detail-content">
                    <h2 className="card-detail-title">{product.ten_sanpham}</h2>
                    <p className="card-detail-price">Giá: {product.gia}</p>
                    <p className="card-detail-description">{product.mo_ta}</p>
                    <div className="quantity-control">
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button className="add-to-cart-button" onClick={addToCart}>THÊM VÀO GIỎ</button>
                    <button className="add-to-cart-button-2">MUA NGAY</button>
                </div>
            </div>
        </div>
    );
};

export default KitchenDetail;
