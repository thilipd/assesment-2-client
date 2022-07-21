import React, { useState } from 'react'

import { Paper } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from './axios/axios';


const intialValue = {
    name: '',
    email: '',
    password: '',
    cpassword: ''
}

const SingUp = () => {

    const [userDetails, setUserDetails] = useState(intialValue);

    const navigate = useNavigate();

    const { name, email, password, cpassword } = userDetails;

    const handleChange = (e) => {

        const { value, name } = e.target;

        setUserDetails({ ...userDetails, [name]: value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (userDetails.cpassword !== userDetails.password) {
            return toast.error('Password does not match')
        }

        axios.post('/api/register', { ...userDetails })
            .then((res) => toast.success(res.data.msg))
            .catch((err) => {

                if (err.response.status == 400) {
                    toast.error(err.response.data.msg)
                }

                toast.error(err.message);

            })

        setUserDetails(intialValue);

        setTimeout(navigate('/login'), 2000)

        console.log(userDetails)
    }





    return (
        <div className="container">
            <div className='loginContainer .d-flex justify-content-center .align-items-center'>
                <Paper elevation={3}
                    className='.d-flex justify-content-center .align-items-center'
                    sx={{ width: '40vw', padding: '20px' }}
                >
                    <h2 className='col'>SignUp</h2>

                    <form onSubmit={(e) => handleSubmit(e)} className="col registerForm">
                        <label>
                            <div className="lableContainer">
                                Name:
                            </div>
                            <div className="inputContainer">
                                <input type="text"
                                    name='name'
                                    value={name}
                                    onChange={handleChange}
                                    autoFocus required />
                            </div>
                        </label><br /><br />

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
                                Password
                            </div>
                            <div className="inputContainer">
                                <input type="password"
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
                                    autoFocus required />
                            </div>
                        </label><br /><br />

                        <label>
                            <div className="lableContainer">
                                Confirm password
                            </div>
                            <div className="inputContainer">
                                <input type="password"
                                    name='cpassword'
                                    value={cpassword}
                                    onChange={handleChange}
                                    autoFocus required />
                            </div>
                        </label><br /><br />
                        <input className='btn btn-primary' type="submit" value="Submit" />
                    </form><br /><br />


                    <div className="signIn">
                        <Link to="/login">Already a user</Link>
                    </div>

                </Paper>
            </div>
        </div>
    )
}

export default SingUp
