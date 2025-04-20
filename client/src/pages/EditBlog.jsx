import React, { useEffect, useState } from 'react'
import { getAllBlogs, getMyBlog, updateBlog } from '../services/blog';
import { getCategories } from '../services/categories';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditBlog() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [details, setDetails] = useState({
        title: '',
        contents: '',
        category_id: ''
    })
    const [categories, setCategories] = useState([])

    const getDetails = async () => {
        const token = sessionStorage.getItem('token')
        const result = await getMyBlog(id, token)
        setDetails({
            title: result.data[0].title,
            contents: result.data[0].contents,
            category_id: result.data[0].category_id
        })

    }

    const getUpdatedCategories = async () => {
        try {
            const token = sessionStorage.getItem('token')
            const result = await getCategories(token)
            setCategories(result.data)

        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getUpdatedCategories()
        getDetails()
    }, [])

    const onSubmit = async () => {
        const token = sessionStorage.getItem('token')
        const { title, contents, category_id } = details
        try {
            const result = await updateBlog(id, title, contents, category_id, token)
            if(result.status == 'success'){
                toast.success('Blog updated successfully')
                navigate('/container/myBlogs')
            }
            else{
                toast.error('Something went wrong')
            }
        } catch (e) {
            console.log(e);
            
        }
    }

    return (
        <div>
            <h1 className="page-header display-1">Edit Blog</h1>
            <div className="container w-75">
                <div className="container mb-4 ">
                    <label htmlFor="title" className="form-label ms-2">Title</label>
                    <input type="text" id='title' className='form-control rounded-pill' value={details.title} onChange={(e) => { setDetails({ ...details, title: e.target.value }) }} />
                </div>
                <div className="container mb-4 ">
                    <label htmlFor="contents" className="form-label ms-2">Contents</label>
                    <textarea id="contents" className="form-control rounded-pill" value={details.contents} onChange={(e) => { setDetails({ ...details, contents: e.target.value }) }}></textarea>
                </div>
                <div className="container mb-4 ">
                    <select id="categories" className="form-select rounded-pill ms-2" value={details.category_id} onChange={(e) => setDetails({ ...details, category_id: e.target.value })}
                    >
                        <option value="">Select a category</option>
                        {
                            categories.map((category) => {
                                return <option key={category.category_id} value={category.category_id} className="form-select rounded-pill ms-2">{category.title}: {category.description}</option>
                            })
                        }
                    </select>
                </div>
                <div className="container d-flex justify-content-center">
                    <button className="btn btn-success btn-lg rounded-pill ms-2 w-25" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default EditBlog
