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
                {
                    auth.user ? <div>
                            <h4 className="mb-3">Hope to see you soon.</h4>
                            <button className="btn btn-danger" onClick={handleSignOuthandleSignOut}>Sign out</button>
                        </div> 
                        : <div>
                            <h4 className="mb-3">Welcome!</h4>
                            <button className="btn btn-info" onClick={handleSignIn}>Sign in with Google</button>
                        </div>
                }
            </div>
        </div>
    );
};

export default Login;