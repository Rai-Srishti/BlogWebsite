const express = require('express')

const pool = require('../db/mysql')
const result = require('../utils/result')


const router = express.Router()

router.post('/add', (req, res) => {
    const { title, contents, category_id } = req.body
    if (!title || title.length > 30) {
        return res.send(result.createErrorResult('Title length should be 1-30 character long.'))
    }
    if (!contents || contents.length > 100) {
        return res.send(result.createErrorResult('Content length should be 1-100 character long.'))
    }
    const sql = `INSERT INTO blogs( title, contents, user_id, category_id) VALUES (?, ?, ?, ?)`
    pool.query(sql, [title, contents, req.headers.id, category_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id

    const { title, contents, category_id } = req.body

    const fields = []
    const params = []

    if (title) {
        if (title.length > 50) {
            return res.send(result.createErrorResult("Title must be 1-50 characters long."))
        }
        fields.push("title = ?")
        params.push(title)
    }
    if (contents) {
        fields.push("contents = ?")
        params.push(contents)
    }
    if (category_id) {
        fields.push("category_id = ?")
        params.push(category_id)
    }
    params.push(id)
    const sql = `UPDATE blogs SET ${fields.join(", ")} WHERE blog_id = ?`
    pool.query(sql, params, (error, data) => {
        if (error) {

            return res.send(result.createErrorResult("Failed to update blog.")); //send status 500
        }
        if (data.length == 0) {
            return res.send(result.createErrorResult("blog not found.")); //send status 404
        }
        res.send(result.createSuccessResult(data));
    })
})



router.get('/all_blogs', (req, res) => {
    const sql = `SELECT blogs.user_id, blogs.blog_id, blogs.title AS blog_title, categories.title AS category_title FROM categories, blogs
    WHERE categories.category_id = blogs.category_id`

    pool.query(sql, (error, data) => {

        res.send(result.createResult(error, data))
    })
})



router.get('/my_blogs', (req, res) => {
    const sql = `SELECT blogs.blog_id, blogs.title AS blog_title, categories.title AS category_title FROM categories, blogs
    WHERE categories.category_id = blogs.category_id AND user_id = ?`
    pool.query(sql, [req.headers.id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT blog_id, title, contents, category_id FROM blogs WHERE blog_id = ?`
    pool.query(sql, [id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM blogs WHERE blog_id = ?`
    pool.query(sql, [id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router