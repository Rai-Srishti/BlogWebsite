import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import ShowCategories from './pages/ShowCategories'
import AllBlogs from './pages/AllBlogs'
import AddCategories from './pages/AddCategories'
import MyBlogs from './pages/MyBlogs'
import Container from './pages/Container'
import AddBlog from './pages/AddBlog'
import MyBlog from './pages/MyBlog'
import EditBlog from './pages/EditBlog'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />

        <Route path='/container' element={<Container />}>

          <Route path='home' element={<Home />} />
          <Route path='allBlogs' element={<AllBlogs />} />
          <Route path='myBlogs' element={<MyBlogs />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='addCategory' element={<AddCategories />} />
          <Route path='showCategories' element={<ShowCategories />} />
          <Route path='myBlog/:id' element={<MyBlog/>}/>
          <Route path='editBlog/:id' element={<EditBlog/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

      <ToastContainer />
    </>
  )
}


export default App
