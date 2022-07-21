import React, { useState } from 'react'

import { Paper } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from './axios/axios';
const Login = () => {

    const navigate = useNavigate();



    const [user, setUser] = useState({
        email: '',
        password: '',

    });

    const { email, password } = user;

    const handleSubmit = async (e) => {

        e.preventDefault();
        axios.post('/api/login', { ...user })
            .then((res) => {
                toast.success(res.data.msg);
                localStorage.setItem('movieLogin', JSON.stringify(res.data.user._doc));
                window.location.reload();
            })
            .catch((err) => {
                if (err.response.status == 400) {
                    toast.error(err.response.data.msg)
                }
                toast.error(err.message);
            })

        setUser({
            email: '',
            password: '',

        })
        setTimeout(navigate('/'))



    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setUser({
            ...user, [name]: value
        })


    }



    return (
        <div className="container">
            <div className='loginContainer .d-flex justify-content-center .align-items-center'>
                <Paper elevation={3}
                    className='.d-flex justify-content-center .align-items-center'
                    sx={{ width: '40vw', padding: '20px' }}
                >
                    <h2 className='col'>Login</h2>

                    <form onSubmit={handleSubmit} className="col registerForm">

                        <label>
                            <div className="lableContainer">
                                Email:
                            </div>
                            <div className="inputContainer">
                                <input type="email"
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                    autoFocus required />
                            </div>
                        </label><br /><br />
                        <label>
                            <div className="lableContainer">
                                password
                            </div>
                            <div className="inputContainer">
                                <input type="password"
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
                                    autoFocus required />
                            </div>
                        </label><br /><br />
                        <input className='btn btn-primary' type="submit" value="Submit" />
                    </form><br /><br />


                    <div className="signIn">
                        <Link to="/signup">Not a registered user</Link>
                    </div>

                </Paper>
            </div>
        </div>
    )
}

export default Login
