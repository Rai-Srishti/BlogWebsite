import React, { useEffect, useState } from 'react'
import { deleteBlog, getAllBlogs } from '../services/blog'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function AllBlogs() {

  const [blogs, setBlogs] = useState([])
  const [currentUser, setCurrentUser] = useState('')

  const getBlogs = async () => {
    const result = await getAllBlogs()
    setBlogs(result.data)
  }

  useEffect(() => {
    getBlogs()

    const token = sessionStorage.getItem('token')
    if (token) {
      const decoded_id = jwtDecode(token)
      setCurrentUser(decoded_id.id)
    }
  }, [])

  const onDelete = async (blog_id) => {
    const token = sessionStorage.getItem('token')
    try {
      const result = await deleteBlog(blog_id, token)
      if (result.status == 'success') {
        toast.success('Blog deleted successfully')
        getBlogs()
      }
      else {
        toast.error("Something went wrong")
        console.log(result.error)
        console.log(blog_id)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="container d-flex justify-content-center">
      {blogs.length == 0 && (
        <h4 className="page-header display-1">No Blogs Found</h4>
      )}
      {blogs.length != 0 && (
        <div className="container">
          <h1 className='page-header display-1'>All Blogs</h1>
          <div className="container">
            <table className="table table-striped-columns">
              <thead>
                <tr className='table-dark'>
                  <th>Sr. No.</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  blogs.map((blog, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{blog.blog_title}</td>
                        <td>{blog.category_title}</td>
                        <td>
                          <Link to={`/container/myBlog/${blog.blog_id}`} className='btn btn-outline-info me-3'>View</Link>
                          {blog.user_id == currentUser && (
                            <>
                              <Link to={`/container/editBlog/${blog.blog_id}`} className='btn btn-outline-warning me-3'>Edit</Link>
                              <button className="btn btn-outline-danger" onClick={() => {
                                onDelete(blog.blog_id)
                              }}>
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllBlogs
