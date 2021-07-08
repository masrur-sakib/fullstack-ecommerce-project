import React from 'react';
import "./ReviewItem.css"

const ReviewItem = (props) => {
    return (
        <div className="review_item_style">
            <h4 className="product_name">{props.product.name}</h4>
            <p>Quantity: {props.product.quantity}</p>
            <p>Price: {props.product.price}</p>
            <br />
            <button className="cart_button btn btn-danger" onClick={() => props.removeProduct(props.product.key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;