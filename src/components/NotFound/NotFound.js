import React from 'react';
import "./NotFound.css";
import notFoundImg from '../../images/not_found.jpg'

const NotFound = () => {
    return (
        <div className='NotFound'>
            {/* <h1>Sorry, page is not found</h1> */}
            {/* <h2>404 Error</h2> */}
            <img src={notFoundImg} alt=""/>
        </div>
    );
};

export default NotFound;