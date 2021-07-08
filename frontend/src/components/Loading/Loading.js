import React from 'react';
import './Loading.css';
import loader from '../../images/loader.gif';

const Loading = (props) => {
    return (
        <div className='text-center col-12 my-5 py-5' style={{display: props.visibility}}>
            <img src={loader} alt=""/>
            <h4 className="text-center pt-5" >Loading Products Data from Database</h4>
        </div>
    );
};

export default Loading;