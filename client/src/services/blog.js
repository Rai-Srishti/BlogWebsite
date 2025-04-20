import axios from "axios"
import { toast } from "react-toastify"

export async function addBlog(title, contents, category_id, token) {
    const url = `http://localhost:4000/blog/add`
    const body = {
        title,
        contents,
        category_id
    }


    try {
        const response = await axios.post(url, body, {
            headers: {
                token
            }
        })
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export async function getMyBlogs(token) {
    const url = `http://localhost:4000/blog/my_blogs`
    try {
        const response = await axios.get(url, {
            headers: {
                token
            }
        })
        return response.data
    } catch (e) {
        console.log(result.error);

    }
}

export async function deleteBlog(blog_id, token) {
    const url = `http://localhost:4000/blog/${blog_id}`
    try {
        const response = await axios.delete(url, {
            headers:{
                token
            }
        })
        return response.data
    } catch (e) {
        console.log(response.error);
        
    }
}

export async function getMyBlog(id, token) {
    const url = `http://localhost:4000/blog/${id}`
    try {
        const response = await axios.get(url, {
            headers:{
                token
            }
        })
        return response.data
    } catch (e) {
        console.log(e);
        
    }
}

export async function getAllBlogs() {
    const url = `http://localhost:4000/blog/all_blogs`
    try {
        const response = await axios.get(url)
        return response.data
    } catch (e) {
        console.log(e);
    }
}

export async function updateBlog(id, title, contents, category_id ,token){
    const url = `http://localhost:4000/blog/${id}`
    const body = {
        title,
        contents,
        category_id
    }

    try {
        const response = await axios.patch(url, body, {
            headers:{
                token
            }
        })
        return response.data
    } catch (e) {
        console.log(e);
        
    }

}