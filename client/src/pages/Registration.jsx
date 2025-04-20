import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../services/user'

function Registration() {

    const [user, setUser] = useState({
        name: '',
        phone_no: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const navigate = useNavigate()

    const onRegister = async () => {
        const { name, email, phone_no, password, confirm_password } = user
        const result = await registerUser(name, email,phone_no, password, confirm_password)
        if(result.status=='success'){
            toast.success('Registration Successful')
            navigate('/login')
        }
        else{
            toast.error(result.error)
        }
    }

    return (
        <div className='d-flex' style={{ minHeight: '100vh' }}>
            <div className="container d-flex flex-column justify-content-center">
                <h1 className="display-3 text-center mb-5">Registration</h1>
                <div className='container w-75'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label ms-2">Name</label>
                        <input type="text" className="form-control rounded-pill" id="name" placeholder="Your Name" onChange={(e) => {
                            setUser({ ...user, name: e.target.value })
                        }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label ms-2 ms-2">Phone Number</label>
                        <input type="tel" className="form-control rounded-pill" id="phone" placeholder="Your Phone Number" onChange={(e) => {
                            setUser({ ...user, phone_no: e.target.value })
                        }} />
                    </div>
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
                        <label htmlFor="confirm_password" className="form-label ms-2">Confirm Password</label>
                        <input type="password" className="form-control rounded-pill" id="confirm_password" placeholder="Confirm Password" onChange={(e) => {
                            setUser({ ...user, confirm_password: e.target.value })
                        }} />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-success rounded-pill" onClick={onRegister}>Register</button>
                        <span className="ms-2">Already have an account? Login <Link to='/login' className="">here</Link></span>
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

export default Registration
