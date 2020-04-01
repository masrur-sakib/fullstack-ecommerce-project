import React, { useEffect, useState } from 'react';
import "./Review.css"
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import imagePlaceOrder from "../../images/giphy.gif"
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
import { useRef } from 'react';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])
    
    let thankYouMessage;
    let thankYouMessage1;
    if(orderPlaced){
        thankYouMessage = <h4 className="order_placed_msg">Your order is placed successfully, Thanks.</h4>
        thankYouMessage1 = <img src={imagePlaceOrder} alt=""/>
    }
    return (
        <div className="shop_container">
            <div className="product_container">
                {/* <h1 className="cart_item_name">Cart Items Review: {cart.length}</h1> */}
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        product={pd}
                        removeProduct={removeProduct}> </ReviewItem>
                    )
                }
                {thankYouMessage}
                {thankYouMessage1}
                {
                    !cart.length && <h2>Cart is empty!, <a href="/shop">Add products in your cart.</a> </h2>
                }
            </div>
            <div className="cart_container">
                <Cart cart = {cart}>
                    <Link to='/shipping'>
                        {
                            auth.user ?
                            <button className="checkout_btn" >Proceed Checkout</button>
                            :
                            <button className="checkout_btn" >Sign in to Proceed</button>

                        }
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Review;