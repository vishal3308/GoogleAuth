import React from "react";
import { Navigate,Outlet } from "react-router";

export default function PrivateComponent(){
    const auth=localStorage.getItem('E-comm_token');
    return auth ? <Outlet/>:<Navigate to='/login'/>
}