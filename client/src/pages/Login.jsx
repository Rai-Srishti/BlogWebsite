import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/user'
import { toast } from 'react-toastify'

function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const onLogin = async () => {
        //console.log('hi');
        
        const { email, password } = user
        const result = await loginUser(email, password)
        
        if(result.status == 'success'){
            toast.success('Logged in successfully')
            sessionStorage.setItem('token',result.data.token)
            navigate('/container/home')
        }
        else{
            console.log(result);
            
            toast.error('Something went wrong...')
        }
    }

    return (
        <div className='d-flex' style={{ minHeight: '100vh' }}>
            <div className="container d-flex flex-column justify-content-center">
                <h1 className="display-3 text-center mb-5">Login</h1>
                <div className='container w-75'>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label ms-2">Email address</label>
                        <input type="email" className="form-control rounded-pill" id="email" placeholder="Your Email" onChange={(e) => {
                            setUser({ ...user, email: e.target.value })
                        }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label ms-2">Password</label>
                        <input type="password" className="form-control rounded-pill" id="password" placeholder="Your Password" onChange={(e) => {
                            setUser({ ...user, password: e.target.value })
                        }} />
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-success rounded-pill" onClick={onLogin}>Login</button>
                        <span className="ms-2">Don't have an account? Register <Link to='/registration' className="">here</Link></span>
                    </div>
                </div>

            </div>
            <div className="container d-none d-lg-flex flex-column justify-content-center">
                <h1 className="display-1 text-center fw-semibold">Blog Website</h1>
                <h4 className='text-center mt-5'>Where words come to life and ideas take flight.</h4>
            </div>
        </div>
    )
}

export default Login
