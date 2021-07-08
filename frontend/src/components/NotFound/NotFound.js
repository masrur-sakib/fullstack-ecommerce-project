import React from 'react';
import "./NotFound.css";
import notFoundImg from '../../images/not_found.jpg'

const NotFound = () => {
    return (
        <div className='NotFound'>
            <img src={notFoundImg} alt=""/>
        </div>
    );
};

export default NotFound;