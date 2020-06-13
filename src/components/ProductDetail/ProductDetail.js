import React, { useState } from 'react';
import "./ProductDetail.css"
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useEffect } from 'react';
import Loading from '../Loading/Loading';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState(null);
    const [loaderVisibility, setLoaderVisibility] = useState("block");

    useEffect(()=>{
        fetch('https://whispering-sea-18534.herokuapp.com/product/' + productKey)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data);
            setLoaderVisibility("none");
        })
    }, [productKey]);
    // console.log(product);
    return (
        <div className="m-5 p-5">
            <h2 className="product_detail_title">Your Product Detail:</h2>
            <Loading visibility={loaderVisibility}></Loading>
            {
                product && <Product showAddToCart={false} product={product}> </Product>
            }
        </div>
    );
};

export default ProductDetail;