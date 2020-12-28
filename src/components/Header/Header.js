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
    // const [count, setCount] = useState(0);
    // const previous = usePrevious(count);
    const auth = useAuth();
    // console.log(auth.user);
    return (
        <div className="header">
            <nav className="navbar navbar-expand-md navbar-light fixed-top site-navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="" width="220" height="70"></img>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse justify-content-end" id="navbarNavAltMarkup">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" aria-current="true" href="#home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#skills">Skills</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#projects">Projects</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#blog">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
            
            
            {/* <a href="/"><img src={logo} alt=""/></a>
            <nav>
                <a href="/shop">Home</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Inventory</a>
                {
                    auth.user ? <a href="/login">Sign out</a>
                    : <a href="/login">Sign In</a>
                }
                {
                    auth.user && <span style={{color: 'orange'}}>{auth.user.name}</span>
                }
            </nav> */}
        </div>
    );
};

export default Header;