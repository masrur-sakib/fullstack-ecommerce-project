import React, { useState } from 'react';
import "./Shop.css"
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loaderVisibility, setLoaderVisibility] = useState("block");

    // Toast Notification Functions 
    toast.configure();
    const toastProductAdded = () => {
        toast('Product Added to Cart', {
            toastId: "toast-notification-product-added", 
            position: toast.POSITION.BOTTOM_RIGHT, 
            autoClose: 3000
        })
    }
    const toastProductQuantityIncreased = () => {
        toast('Product Quantity Increased', {
            toastId: "toast-notification-quantity-increased",
            position: toast.POSITION.BOTTOM_RIGHT, 
            autoClose: 3000})
    }
    

    useEffect(()=>{
        fetch('https://whispering-sea-18534.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>{
            const firstTwentyProducts = data.slice(0, 30);
            setProducts(firstTwentyProducts);
            setLoaderVisibility("none");
        })
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
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
            toastProductQuantityIncreased();
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
            toastProductAdded();
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    };
    return (
        <div className="container shop_container">
            <div className="row">
                <div className="col-md-9">
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
                </div>
                <div className="col-md-3">
                    <div className="cart_container">
                        <Cart cart={cart} >
                            <Link to="/review">
                                <button className="cart_button btn btn-info">Review Order</button>
                            </Link>
                        </Cart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;