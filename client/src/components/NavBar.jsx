import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function NavBar() {

  const location = useLocation() //Now, location.pathname gives you the current URL.

  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const onLogout = async () => {
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevents the form from reloading the page
    //why is the default behaviour to reload the page when submitting a form? Ans - This is because the browser assumes you are submitting data to the server, which might involve navigating to a different page or processing data.
    if (searchTerm.trim()) {
      const query = `?search=${encodeURIComponent(searchTerm.trim())}`; //ensure that the search term is safely added to the URL, particularly when it contains special characters or spaces.
      /* Without encoding:

            Search term: hello world&cats=dog

            URL: http://localhost:5173/container/allBlogs?search=hello world&cats=dog

            This could break the query because &cats=dog would be interpreted as another parameter.

            With encoding (encodeURIComponent('hello world&cats=dog')):

            Encoded: hello%20world%26cats%3Ddog

            URL: http://localhost:5173/container/allBlogs?search=hello%20world%26cats%3Ddog

            This makes sure that the search term is properly sent in the query string without affecting the URL structure. */
      if (location.pathname === '/container/allBlogs') {
        navigate(`/container/allBlogs${query}`)
      }
      else if (location.pathname === '/container/myBlogs') {
        navigate(`/container/myBlogs${query}`)
      }
    }

  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/container/home' className={`nav-link ${location.pathname === '/container/home' ? 'bg-dark-subtle active text-primary' : ''}`}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/container/myBlogs' className={`nav-link ${location.pathname === '/container/myBlogs' ? 'bg-dark-subtle active text-primary' : ''}`}>My Blogs</Link>
              </li>
              <li className="nav-item">
                <Link to='/container/allBlogs' className={`nav-link ${location.pathname === '/container/allBlogs' ? 'bg-dark-subtle active text-primary' : ''}`}>All Blogs</Link>
              </li>
              <li className="nav-item">
                <Link to='/container/addBlog' className={`nav-link ${location.pathname === '/container/addBlog' ? 'bg-dark-subtle active text-primary' : ''}`}>Add Blog</Link>
              </li>
              <li className="nav-item">
                <Link to='/container/addCategory' className={`nav-link ${location.pathname === '/container/addCategory' ? 'bg-dark-subtle active text-primary' : ''}`}>Add Categories</Link>
              </li>
              <li className="nav-item">
                <Link to='/container/showCategories' className={`nav-link ${location.pathname === '/container/showCategories' ? 'bg-dark-subtle active text-primary' : ''}`}>Show Categories</Link>
              </li>
            </ul>
            {(location.pathname == '/container/allBlogs' || location.pathname == '/container/myBlogs') && (
              <form className="d-flex" role="search" onSubmit={handleSearch} >
                <input className="form-control me-2" type="search" placeholder="Search" onChange={(e) => {
                  setSearchTerm(e.target.value)
                }} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>)}

            <button className="btn btn-danger ms-5" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
