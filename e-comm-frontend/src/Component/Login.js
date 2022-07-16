import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import SendIcon from '@mui/icons-material/Send';
import React, { useContext, useEffect, useState} from "react";
import { Url } from '../App';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
export default function Signup() {
    let navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('E-comm_token')){
            console.log('login already done')
            navigate('/productlist')
        }
    })
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errormassage, setErrormassage] = useState(false);
    const url = useContext(Url);
    function GoogleAuth(){
        window.open('http://localhost:4000/auth/google',"_self")
    }
    function Sign_up(e) {
        e.preventDefault();
        if (!email || !password) {
            return setError(true) & setErrormassage("Each field is required to filled.");
        }
        setError(false);
        setLoading(true);

        const data = {
            email: email,
            password: password
        }
        // =============================API Calling=================
        fetch(url + '/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json())
            .then((res) => {
                if (res.Error) {
                    setError(true);
                    setErrormassage(res.Error)
                }
                else {
                    localStorage.setItem('E-comm_token', res.auth)
                    localStorage.setItem('E-comm_name',res.user.name)
                    localStorage.setItem('E-comm_email',res.user.email)
                    navigate('/productlist')
                }
            }).catch((err) => {
                setError(true);
                setErrormassage("Something went Wrong, please try again.")
            }).finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="login-wrap" style={{ backgroundImage: 'url(E-comm2.jpg)' }}>
            <div className="login-html">
                <label htmlFor="tab-2" className="tab"> Login </label>
                <form className="login-form" onSubmit={Sign_up}>
                    <div className="sign-up-htm">
                        <div className="group">
                            <label htmlFor="email" className="label">Email Address</label>
                            <input type="email" className="input" onChange={(e) => setEmail(e.target.value)} value={email} data-type="email" autoComplete="true" required />
                        </div>

                        <div className="group">
                            <label htmlFor="pass" className="label">Password</label>
                            <input id="pass" type="password" className="input" onChange={(e) => setPassword(e.target.value)} value={password} data-type="password" autoComplete="true" required />
                        </div>
                        <div className="group loading" >
                            <LoadingButton
                                size="small"
                                endIcon={<SendIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                type="submit"
                                sx={{ color: 'rgb(245 237 237)',margin:'2px 5px' }}
                            >
                                Login
                            </LoadingButton>
                            
                            <Button variant="contained" className='google' onClick={GoogleAuth} color='success' size="small" startIcon={<GoogleIcon />}>
                            Continue with Google
                            </Button>
                            
                        </div>
                        <div className="group">
                            {error && <label className="label erorr">* {errormassage}</label>}
                        </div>
                        <div className="hr"></div>
                        <div className="foot-lnk">
                            <label htmlFor="tab-1"><Link to="/signup">New Member?</Link></label>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}