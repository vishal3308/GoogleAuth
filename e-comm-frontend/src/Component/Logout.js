import { useNavigate } from "react-router";
import { useEffect } from "react";
export default function Logout(){
    const Navigate=useNavigate();
    useEffect(()=>{
        localStorage.clear();
        Navigate('/login');
    })

}