import React, { useEffect, useState } from 'react'
import { getCategories } from '../services/categories'

function ShowCategories() {

  const [categories, setCategories] = useState([])

  const getAllCategories = async () => {
    const token = sessionStorage.getItem('token')
    const result = await getCategories(token)
    setCategories(result.data)
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <>
      <h1 className='display-1 page-header'>Categories</h1>
      <div className='container d-flex justify-content-center mt-5'>
        <table className="table table-striped-columns w-75">
          <thead>
            <tr className='table-dark'>
              <th>Sr.no</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map((category, index) => {
                return (<tr key={category.category_id}>
                  <td>{index + 1}</td>
                  <td>{category.title}</td>
                  <td>{category.description}</td>
                </tr>)
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ShowCategories
