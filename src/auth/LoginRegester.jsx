import React, { useContext } from 'react'
import { UserContext } from '../context/ContextProvider';
import { Navigate, Outlet } from 'react-router';

const LoginRegester = () => {
    
    const { isAuthenticated } = useContext(UserContext);
    
    return (
        !isAuthenticated ? <Outlet /> : <Navigate to="*" />
    )
}
export default LoginRegester