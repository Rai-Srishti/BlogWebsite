const express = require('express')

const result = require('../utils/result')
const pool = require('../db/mysql')

const router = express.Router()

router.post('/add', (req, res) => {
    const { title, description } = req.body
    if(!title || title.length > 50){
        return res.send(result.createErrorResult('Title should be 1-50 characters long'))
    }
    else if(!description || description.length > 100){
        return res.send(result.createErrorResult("Description should be 1-100 characters long"))
    }
    const sql = `INSERT INTO categories(title, description) VALUES(?,?)`
    pool.query(sql, [title, description], (error, data) => {
        return res.send(result.createResult(error, data))
    })
})

router.get("/show", (req, res) => {
    const sql = `SELECT category_id, title, description FROM categories`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router