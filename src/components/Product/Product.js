import React from 'react';
import "./Product.css"

const Product = (props) => {
    // const {img, name} = props.product
    console.log(props.product)
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
            </div>

        </div>
    );
};

export default Product;