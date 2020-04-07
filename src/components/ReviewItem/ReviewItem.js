import React from 'react';
import "./ReviewItem.css"

const ReviewItem = (props) => {
    // console.log(props);
    return (
        <div className="review_item_style">
            <h4 className="product_name">{props.product.name}</h4>
            <h5>Quantity: {props.product.quantity}</h5>
            <h5>Price: {props.product.price}</h5>
            <br />
            <button className="cart_button" onClick={() => props.removeProduct(props.product.key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;