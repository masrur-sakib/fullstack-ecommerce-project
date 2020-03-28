import React from 'react';
import "./ProductDetail.css"
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd=>pd.key===productKey);
    // console.log(product);
    return (
        <div>
            <h2 className="product_detail_title">Your Product Detail:</h2>
            <Product 
            product={product}
            showAddToCart={false}>
            </Product>
        </div>
    );
};

export default ProductDetail;