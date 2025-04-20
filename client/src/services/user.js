import { toast } from 'react-toastify'

import axios from 'axios'

export async function registerUser(full_name, email, phone_no, password, confirm_password) {
    const url = `http://localhost:4000/user/register`
    const body = {
        full_name,
        email,
        phone_no,
        password,
        confirm_password
    }
    try {
        const response = await axios.post(url, body)
        console.log(response);
        
        return response.data
    } catch (e) {
        toast.error('Something went wrong...')
    }
}

export async function loginUser(email, password) {
    const url = `http://localhost:4000/user/login`
    
    const body = {
        email,
        password
    }

    try {
        const response =await axios.post(url, body)
        return response.data
    }
    
    catch (e) {
        //toast.error('Something went wrong...')
        console.log(e);
    }
}