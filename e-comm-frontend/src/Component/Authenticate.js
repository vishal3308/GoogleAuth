import React from 'react'
import { useSearchParams,Navigate } from 'react-router-dom';
export default function Home() {
    const [serach, setsearch] = useSearchParams()
    const Auth = serach.get('auth');
    if (Auth) {
        const name = serach.get('name');
        const email = serach.get('email');
        const Avatar = serach.get('avatar');
        localStorage.setItem('E-comm_token', Auth)
        localStorage.setItem('E-comm_token', Auth)
        localStorage.setItem('E-comm_name', name)
        localStorage.setItem('E-comm_email', email)
        localStorage.setItem('E-comm_avatar', Avatar)
        console.log('local storage set..')
    }
    return (
        <>
            {Auth ? <Navigate to='/productlist'/>: <Navigate to='/login'/>
            }
        </>
    )
}
