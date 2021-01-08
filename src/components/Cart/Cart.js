import React from 'react';
import "./Cart.css"
import { useAuth } from '../Login/useAuth';

const Cart = (props) => {
    const cart = props.cart;
    let total=0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        total = total + (product.price * product.quantity);
    }

    let shipping = 0;
    if(total>0 && total<15){
        shipping=15;
    }
    else if(total>15 && total<30){
        shipping=10;
    }
    else if(total>30){
        shipping=0;
    }

    const tax = total*0.03;

    return (
        <div>
            <h4 className="text-info">Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {total.toFixed(2)}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Total Price: {(total+shipping+tax).toFixed(2)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;