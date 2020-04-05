import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Product.css"
import { Link } from 'react-router-dom';

const Product = (props) => {
    // const {img, name} = props.product
    return (
        <div className="single_product">
            <div>
                <img src={props.product.img} alt="" />
            </div>
            <div className="product_details">
                <h4 className="product_name"><Link to={"/product/" + props.product.key}>{props.product.name}</Link></h4>
                <p><small>by:{props.product.seller} </small></p>
                <p>$ {props.product.price} </p>
                <p><small>Only <span className="product_stock">{props.product.stock}</span> items left, order soon</small></p>
                {props.showAddToCart ===true && <button
                    className="cart_button"
                    onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
            </div>

        </div>
    );
};

export default Product;