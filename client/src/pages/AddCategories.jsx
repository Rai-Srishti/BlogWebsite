import React, { useState } from 'react'
import { addCategory } from '../services/categories'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AddCategories() {
  const [category, setCategory] = useState({
    title: '',
    description: ''
  })
  const navigate = useNavigate()

  const onSubmit = async () => {
    const { title, description } = category
    const token = sessionStorage.getItem('token')
    const result = await addCategory(title, description, token)
    if(result.status=='success'){
      toast.success("Category added successfully")
      navigate('/container/addBlog')
    }
    else{
      toast.error(result.error)
    }
  }
  return (
    <div>
      <h1 className='page-header display-1'>Add Category</h1>
      <div className='container mt-5'>
        <div className='container mb-4'>
          <label htmlFor="title" className="form-label ms-2">Title: </label>
          <input type="text" className='form-control rounded-pill' id='title' onChange={(e) => {
            setCategory({ ...category, title: e.target.value })
          }} />
        </div>
        <div className="container mb-4">
          <label htmlFor="description" className="form-label ms-2">Description: </label>
          <textarea type="text" className='form-control rounded-pill' id='description' onChange={(e) => {
            setCategory({ ...category, description: e.target.value })
          }} />
        </div>
        <div className='container d-flex justify-content-center'>
          <button className="btn btn-lg btn-success rounded-pill w-25" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default AddCategories
