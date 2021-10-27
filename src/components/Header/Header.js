import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../images/logo.png';
import './Header.css'; 

const Header = () => {
    const {user, logOut} = useAuth();
    const logout = ()=> {
        logOut();
    }
    return (
        <div className="header">
            <img src={logo} alt="Logo" />
            <nav className="links">
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {
                    user.email ? <> <span className="text-white me-2">{user.displayName}</span> <button onClick={logout} className="btn btn-primary my-2">Log Out</button> </> : <Link to="/login">Log In</Link>
                }
            </nav>
        </div>
    );
};

export default Header;