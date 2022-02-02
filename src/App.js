import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {commerce } from "./lib/commerce";
import Products from "./components/Product/products";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/CheckoutFrom/Checkout/Checkout";

const App = () => {

    const [products, setProducts] = useState([]); //gets products
    const [cart, setCart] = useState({}); //gets the cart
    const [order, setOrder] = useState({}); //gets payment
    const [errorMessage, setErrorMessage] = useState("");

    const fetchProducts = async () => {

        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => { //add to cart

        const {cart} = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }

    const handleUpdateCartQTY = async (productId, quantity) => {

        const {cart} = await commerce.cart.update(productId, {quantity});
        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {

        const {cart} = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async () => {

        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async () => {

        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {

        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();

        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);

    return (
        <BrowserRouter>
            <div>
                <NavBar totalItems = {cart.total_items}/>
                <Routes>
                    <Route exact path = "/" element = {<Products products = {products} onAddToCart = {handleAddToCart}/>} /> 
                    <Route exact path = "/cart" element = {
                        <Cart 
                            cart = {cart} 
                            order = {order} 
                            onCaptureCheckout = {handleCaptureCheckout} 
                            error = {errorMessage}
                            handleUpdateCartQTY = {handleUpdateCartQTY}
                            handleRemoveFromCart = {handleRemoveFromCart}
                            handleEmptyCart = {handleEmptyCart}
                        />} 
                    />
                    <Route exact path = "/checkout" element = {<Checkout cart = {cart}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;