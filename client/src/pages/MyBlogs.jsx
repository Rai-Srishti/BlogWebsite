import React, { useEffect, useState } from 'react'
import { deleteBlog, getMyBlogs } from '../services/blog'
import { toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom'

function Myblogs() {

  const [blogs, setBlogs] = useState([])
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  /* URLSearchParams is a tool in JavaScript that helps you turn the query string (the part after ?) into something you can easily read and use.
  For example, if the URL is ?term=apple, URLSearchParams will make it easy to get the value of term, which is apple.


  */

  //location.search given you whatever is after '?'
  //we are using search (location.search) because in the NavBar component we have set the query string like this: const query = `?search=${encodeURIComponent(searchTerm.trim())}`;
  const searchTerm = queryParams.get('search') || '';


  const getUpdatedBlogs = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const result = await getMyBlogs(token)
      setBlogs(result.data)
    } catch (e) {
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    getUpdatedBlogs()
  }, [])

  const onDelete = async (blog_id) => {
    const token = sessionStorage.getItem('token')
    const result = await deleteBlog(blog_id, token)
    if (result.status == 'success') {
      toast.success('Blog successfullt deleted')
      getUpdatedBlogs()
    }
    else {
      toast.error("Something went wrong")
    }
  }

  const filteredBlogs = blogs.filter(blog =>
    blog.blog_title.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive search
  )

  return (
    <div>
      <div className="container d-flex justify-content-center">
        {(blogs.length == 0 || filteredBlogs.length === 0) ? (<h4 className="page-header display-1">No Blogs Found</h4>) :
          (<div className="container">
            <h1 className='page-header display-1 mb-4'>My Blogs</h1>
            <table className="table table-striped-columns">
              <thead>

                <tr className='table-dark'>
                  <td>Sr. No.</td>
                  <td>Title</td>
                  <td>Category</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {
                  filteredBlogs.map((blog, index) => {
                    return (<tr key={blog.blog_id}>
                      <td>{index + 1}</td>
                      <td>{blog.blog_title}</td>
                      <td>{blog.category_title}</td>
                      <td className=''>
                        <Link to={`/container/myBlog/${blog.blog_id}`} className='btn btn-outline-info me-3'>View</Link>
                        <button className='btn btn-outline-danger me-3' onClick={() => {
                          onDelete(blog.blog_id)
                        }}>Delete</button>
                        <Link to={`/container/editBlog/${blog.blog_id}`} className='btn btn-outline-warning me-3'>Edit</Link>
                      </td>
                    </tr>)
                  })
                }
              </tbody>
            </table>
          </div>)




        }
      </div>
    </div>
  )
}

export default Myblogs
