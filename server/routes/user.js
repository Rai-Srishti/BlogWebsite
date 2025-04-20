const express = require('express')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')

const result = require('../utils/result')
const pool = require('../db/mysql')
const config = require('../utils/config')

const router = express.Router()


router.post('/register', (req, res) => {
    const { email, password, full_name, phone_no, confirm_password } = req.body
    if (password != confirm_password) {
        return res.send(result.createErrorResult("Oops! Your passwords don't match. Please try again"))
    }
    if (!full_name || full_name.length > 50) {
        return res.send(result.createErrorResult("Name must be 1-50 characters long."))
    }
    if (!email || email.length > 30) {
        return res.send(result.createErrorResult("Email must be 1-30 characters long."))
    }
    if (!phone_no || phone_no.length != 10) {
        return res.send(result.createErrorResult("Phone number must be 10 characters long."))
    }

    const encryptedPassword = cryptojs.SHA256(password).toString()
    const sql = `INSERT INTO users(full_name, phone_no, email, password) VALUES(?, ?, ?, ?)`
    pool.query(sql, [full_name, phone_no, email, encryptedPassword], (error, data) => {
        res.send(result.createResult(error, data))
    })

})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const encryptedPassword = cryptojs.SHA256(password).toString()
    const sql = `SELECT user_id, full_name, email FROM users WHERE email = ? AND password = ?`
    pool.query(sql, [email, encryptedPassword], (error, data) => {
        if (data) {
            if (data.length == 0) {
                return res.send(result.createErrorResult('Invalid Email or Password'))
            }
            else {
                const payload = {
                    id: data[0].user_id
                }
                const token = jwt.sign(payload, config.secret)
                const body = {
                    token,
                    name: data[0].full_name
                }
                return res.send(result.createSuccessResult(body))
            }
        }
        else {
            return res.send(result.createErrorResult(error))
        }
    })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const { full_name, email, password, phone_no } = req.body;

    const fields = [];
    const params = [];

    if (full_name) {
        if (full_name.length > 50) {
            return res.send(result.createErrorResult("Name must be 1-50 characters long.")); //send status .status(400)
        }
        fields.push("full_name = ?");
        params.push(full_name);
    }

    if (email) {
        if (email.length > 30) {
            return res.send(result.createErrorResult("Email must be 1-30 characters long.")); //send status 400
        }

        fields.push("email = ?");
        params.push(email);
    }

    if (password) {
        const encryptedPassword = cryptojs.SHA256(password).toString();
        fields.push("password = ?");
        params.push(encryptedPassword);
    }

    if (phone_no) {
        if (phone_no != 10) {
            return res.send(result.createErrorResult("Phone Number must be 10 characters long.")); //send status 400
        }
        fields.push("phone_no = ?");
        params.push(phone_no);
    }

    if (fields.length === 0) {
        return res.send(result.createErrorResult("No valid fields provided to update.")); //send status 400
    }


    const sql = `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`; //.join - concats all the elements of fields array to a string (in this example with a comma in between)
    params.push(id);

    pool.query(sql, params, (error, data) => {
        if (error) {
            return res.send(result.createErrorResult("Failed to update user.")); //send status 500
        }
        if (data.length == 0) {
            return res.send(result.createErrorResult("User not found.")); //send status 404
        }
        res.send(result.createSuccessResult(data));
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM users WHERE user_id = ?`
    pool.query(sql, [id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})


router.get('/', (req, res) => {
    const id = req.headers.id
    const sql = `SELECT full_name, phone_no ,email FROM users WHERE user_id = ?`
    pool.query(sql, [id], (error, data) => {

        if (data.length == 0) {
            return res.send(result.createErrorResult('User does not exist'))
        }
        else {
            return res.send(result.createSuccessResult(data))
        }
    }
    )
})

module.exports = router