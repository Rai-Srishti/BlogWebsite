import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addBlog } from '../services/blog'
import { toast } from 'react-toastify'
import { getCategories } from '../services/categories'

function AddBlog() {

    const navigate = useNavigate()

    const [details, setDetails] = useState({
        title: '',
        contents: ''
    })

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    const getUpdatedCategories = async () => {
        const token = sessionStorage.getItem('token')
        const result = await getCategories(token)
        
        setCategories(result.data)
        console.log(categories);
        
    }
    useEffect(() => {
        getUpdatedCategories()
    }, [])

    const onSubmit = async () => {
        const { title, contents } = details
        const token = sessionStorage.getItem('token')
        const result = await addBlog(title, contents, selectedCategory, token)
        
        if (result.status == 'success') {

            toast.success('Blog added successfully')
            navigate('/container/myBlogs')
        }
        else {
            if(selectedCategory==''){
                toast.error('Please choose a category')
            }
            toast.error(result.error)
        }
    }

    return (
        <div>
            <h1 className='display-1 page-header'>Add Blog</h1>
            <div className='container w-75'>
                <div className="container mb-4">
                    <label htmlFor='title' className="form-label ms-2">Title</label>
                    <input type="text" className="form-control rounded-pill" id='title' onChange={(e) => {
                        setDetails({ ...details, title: e.target.value })
                    }} />
                </div>
                <div className="container mb-4">
                    <label htmlFor="contents" className="form-label ms-2">Contents</label>
                    <textarea className="form-control rounded-pill" id='contents' onChange={(e) => {
                        setDetails({ ...details, contents: e.target.value })
                    }} />
                </div>
                <div className="container mb-4">
                    <select className="form-select rounded-pill ms-2" onChange={(e) =>{
                        setSelectedCategory(e.target.value)
                        
                    }}>
                        <option value=''>Select a category</option>
                        {
                            categories.map((category)=>{
                                return (
                                <option key={category.category_id} value={category.category_id}> {category.title}: {category.description}</option>
                                )
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

export default AddBlog
