import React, { useEffect, useState } from 'react';
import "./Review.css"
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();

    // Toast Notification Functions 
    toast.configure();
    const toastProductRemoved = () => {
        toast.error('Product removed from Cart', {
            position: toast.POSITION.BOTTOM_RIGHT, 
            autoClose: 3000
        })
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        toastProductRemoved();
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(productKeys);
        fetch('https://whispering-sea-18534.herokuapp.com/getProductsByKey', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>{
            const cartProducts = productKeys.map(key => {
                const product = data.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
        })
    }, [])
    
    let thankYouMessage;
    let thankYouMessage1;
    if(orderPlaced){
        thankYouMessage = <h4 className="order_placed_msg">Your order is placed successfully, Thanks.</h4>
    }
    return (
        <div className="container shop_container">
            <div className="row">
                <div className="col-md-9">
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
                        {
                            !cart.length && <h4 className="cart-status text-danger">Cart is empty! <a href="/shop">Add products in your cart.</a> </h4>
                        }
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="cart_container">
                        <Cart cart = {cart}>
                            <Link to='/shipping'>
                                {
                                    cart.length && auth.user ?
                                    <button className="cart_button btn btn-info" >Proceed Checkout</button>
                                    : !auth.user ?
                                    <button className="cart_button btn btn-info" >Sign in to Proceed</button>
                                    : null

                                }
                            </Link>
                        </Cart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;