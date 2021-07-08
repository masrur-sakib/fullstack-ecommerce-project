import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Product.css"
import { Link } from 'react-router-dom';

const Product = (props) => {
    
    return (
        <div className="single_product">
            <div>
                <div className="d-flex justify-content-center">
                    <img src={props.product.img} alt="" />
                </div>
                <h4 className="product_name"><Link to={"/product/"+props.product.key}>{props.product.name}</Link></h4>
                <p>By: {props.product.seller}</p>
                <p>Price: {props.product.price}$</p>
                <p>Only <span className="product_stock">{props.product.stock}</span> items left, order soon</p>
                {props.showAddToCart ===true && <button
                    className="cart_button btn btn-info"
                    onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
            </div>

        </div>
    );
};

export default Product;