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
            <h1>Join with us!</h1>
            {
                auth.user ? <button onClick={handleSignOuthandleSignOut}>Sign out</button>
                    : <button onClick={handleSignIn}>Sign in with Google</button>
            }

        </div>
    );
};

export default Login;