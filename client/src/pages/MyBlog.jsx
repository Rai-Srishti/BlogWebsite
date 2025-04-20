import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMyBlog } from '../services/blog'

function MyBlog() {
    const { id } = useParams()

    const [blog, setBlog] = useState({
        title: '',
        contents: ''
    })
    //- Prefer a single setState call for related updates (e.g., title + contents).
    //- No need to spread state if you're replacing all fields.

    const getBlogDetails = async () => {
        const token = sessionStorage.getItem('token')
        try {
            const result = await getMyBlog(id, token)
            setBlog({contents: result.data[0].contents, title: result.data[0].title }) 

        } catch (e) {
            console.log(e);

        }
    }

    useEffect(() => {
        getBlogDetails()
    }, [])

    return (
        <div className='container'>
            <h1 className='page-header display-1 mb-3'>{blog.title}</h1>
            <h5>{blog.contents}</h5>
        </div>
    )
}

export default MyBlog
