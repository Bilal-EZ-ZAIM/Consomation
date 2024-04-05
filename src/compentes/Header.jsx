import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';

const Header = () => {
    const { TypeUtilisateur, isAuthenticated, utilisateur, user } = useContext(UserContext);
    console.log(user);
    console.log(TypeUtilisateur);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-md">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" activeClassName="active" aria-current="page">Home</NavLink>
                        </li>
                        {user?.role === 2 && (
                            <NavLink to="/transaction" className="nav-link" activeClassName="active" aria-current="page">
                                Transaction
                            </NavLink>

                        )}


                        {user?.role === 1 && (
                            <li className="nav-item">
                                <NavLink to="/admin" className="nav-link" activeClassName="active" aria-current="page">Admin</NavLink>
                            </li>

                        )}

                        {user?.role === 2 && (
                            <li className="nav-item">
                                <NavLink to="/Profile" className="nav-link" activeClassName="active" aria-current="page">Profile</NavLink>
                            </li>

                        )}



                        {!isAuthenticated && (
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link" activeClassName="active" aria-current="page">Login</NavLink>
                            </li>
                        )}

                        {!isAuthenticated && (
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link" activeClassName="active" aria-current="page">Register</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
