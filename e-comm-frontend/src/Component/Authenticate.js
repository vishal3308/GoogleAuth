import React, {  useEffect } from "react";
import { Navigate } from "react-router";
export default function Authenticate() {
    const queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (queryParams.get('auth')) {
            const Auth=queryParams.get('auth');
            const name = queryParams.get('name');
            const email = queryParams.get('email');
            const Avatar = queryParams.get('avatar');
            localStorage.setItem('E-comm_token', Auth)
            localStorage.setItem('E-comm_name', name)
            localStorage.setItem('E-comm_email', email)
            localStorage.setItem('E-comm_avatar', Avatar)
        }
        console.log("Home Auth ");
    }, [])
    return (
        <Navigate to='/productlist'/>
    )
}