import React, { useRef } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { useEffect } from 'react';
import { useAuth } from '../Login/useAuth';

const usePrevious = value => {
    const prev = useRef();
    useEffect(() => {
        console.log(value);
        prev.current = value;
    }, [value]);
    return prev.current;
}

const Header = () => {
    const auth = useAuth();
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light fixed-top site-navbar">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="" width="220" height="70"></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse justify-content-end" id="navbarNavAltMarkup">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="true" href="/shop">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/review">Order Review</a>
                            </li>
                            <li className="nav-item">
                                {
                                    auth.user ? <a className="nav-link" href="/login">Sign out</a>
                                    : <a className="nav-link" href="/login">Sign In</a>
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    auth.user && <span style={{color: '#06C3CC', lineHeight: '40px', fontSize: '20px'}}>{auth.user.name}</span>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;