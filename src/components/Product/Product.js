import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Product.css"

const Product = (props) => {
    // const {img, name} = props.product
    // console.log(props)
    return (
        <div className="single_product">
            <div>
                <img src={props.product.img} alt="" />
            </div>
            <div>
                <h4 className="product_name">{props.product.name}</h4>
                <br />
                <p><small>by:{props.product.seller} </small></p>
                <p>$ {props.product.price} </p>
                <br />
                <p><small>Only {props.product.stock} items left, order soon</small></p>
                <button 
                className="cart_button" 
                onClick={() => props.handleAddProduct(props.product)}> 
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
            </div>

        </div>
    );
};

export default Product;