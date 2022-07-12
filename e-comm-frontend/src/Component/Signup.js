import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import React, { useContext, useState } from "react";
import Validator from 'validator';
import { Url } from '../App';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errormassage, setErrormassage] = useState(false);
    let Navigate = useNavigate()
    const url = useContext(Url);
    function Sign_up(e) {
        e.preventDefault();
        if (!email || !name || !password || !confirmpass) {
            return setError(true)
        }
        else if (password !== confirmpass) {
            return setError(true) & setErrormassage("Password doesn't match with Confirm Password")
        }
        if (!Validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrormassage('Password should contains minimum 1 lowercase, uppercase, number, symbol and at least lenght of 8')
            return setError(true)
        }
        setError(false)
        setLoading(true);
        const data = {
            name: name,
            password: password,
            email: email
        }

        // =============================API Calling=================
        fetch(url + '/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json())
            .then((res) => {
                if (res.status) {
                    setError(true);
                    setErrormassage(res.status)
                }
                else {
                    localStorage.setItem('E-commtoken', res.auth)
                    localStorage.setItem('E-commuser', JSON.stringify(res.result))
                    Navigate('/productlist')
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
                <label htmlFor="tab-2" className="tab">Sign Up</label>
                <form className="login-form" onSubmit={Sign_up}>
                    <div className="sign-up-htm">
                        <div className="group">
                            <label htmlFor="user" className="label">Username</label>
                            <input id="user" type="text" onChange={(e) => setName(e.target.value)} value={name} className="input" required />
                        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Password</label>
                            <input id="pass" type="password" className="input" onChange={(e) => setPassword(e.target.value)} value={password} data-type="password" autoComplete="true" required />
                        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Repeat Password</label>
                            <input type="text" className="input" onChange={(e) => setConfirmpass(e.target.value)} value={confirmpass} autoComplete="true" required />
                        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Email Address</label>
                            <input type="email" className="input" onChange={(e) => setEmail(e.target.value)} value={email} data-type="email" autoComplete="true" required />
                        </div>
                        <div className="group loading" >
                            <LoadingButton
                                size="small"
                                endIcon={<SendIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                type="submit"
                                sx={{ color: 'rgb(245 237 237)' }}
                            >
                                Sign Up
                            </LoadingButton>

                        </div>
                        <div className="group">
                            {error && <label className="label erorr">* {errormassage}</label>}
                        </div>
                        <div className="hr"></div>
                        <div className="foot-lnk">
                            <label htmlFor="tab-1"><Link to="/login">Already Member?</Link></label>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}