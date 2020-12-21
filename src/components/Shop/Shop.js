import React, { useState } from 'react';
import "./Shop.css"
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loaderVisibility, setLoaderVisibility] = useState("block");
    useEffect(()=>{
        fetch('https://whispering-sea-18534.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>{
            const firstThirtyProducts = data.slice(0, 30);
            setProducts(firstThirtyProducts);
            setLoaderVisibility("none");
        })
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(products);
        if(products.length){
            const cartProducts = productKeys.map(key => {
                const product = products.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
        }
    }, [products])

    const handleAddProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop_container">
            <Loading visibility={loaderVisibility}></Loading>

            <div className="product_container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        product={pd}
                        handleAddProduct={handleAddProduct}
                        showAddToCart={true}>
                    </Product>)
                }
            </div>
            <div className="cart_container">
                <Cart cart={cart} >
                    <Link to="/review">
                        <button className="checkout_btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;