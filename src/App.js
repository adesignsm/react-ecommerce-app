import React, { useState, useEffect }from "react";

import {commerce } from "./lib/commerce";
import Products from "./components/Product/products";
import NavBar from "./components/NavBar/NavBar";

const App = () => {

    const [products, setProducts] = useState([]); //gets products
    const [cart, setCart] = useState({}); //gets the cart

    const fetchProducts = async () => {

        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {

        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => { //add to cart

        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);

    return (
        <div>
            <NavBar totalItems = {cart.total_items}/>
            <Products products = {products} onAddToCart = {handleAddToCart}/>
        </div>
    )
}

export default App;