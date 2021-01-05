import React from 'react';
import "./Login.css"
import Auth from './useAuth';



const Login = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle()
            .then(res => {
                window.location.pathname = '/review';
            })
    }

    const handleSignOuthandleSignOut = () => {
        auth.signOut()
            .then(res=>{
                window.location.pathname = '/';
            })
    }

    return (
        <div>
            <div className="login-section">
                <h4 className="mb-3">Join with us!</h4>
                {
                    auth.user ? <button className="btn btn-info" onClick={handleSignOuthandleSignOut}>Sign out</button>
                        : <button className="btn btn-info" onClick={handleSignIn}>Sign in with Google</button>
                }
            </div>
        </div>
    );
};

export default Login;