import React, { useState } from 'react';
import "./ProductDetail.css"
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:3000/product/'+productKey)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data);
        })
    }, []);
    // console.log(product);
    return (
        <div>
            <h2 className="product_detail_title">Your Product Detail:</h2>
            {
                product && <Product product={product} showAddToCart={false}> </Product>
            }
        </div>
    );
};

export default ProductDetail;