const jwt = require('jsonwebtoken')

const result = require('../utils/result')
const config = require('../utils/config')

function authorization(req, res, next) {
    if (req.url == '/user/register' || req.url == '/user/login' || req.url == '/blog/all_blogs') {
        next()
    }
    else {
        const token = req.headers.token
        if (token) {
            try {
                const payload = jwt.verify(token, config.secret)
                req.headers.id = payload.id
                next()
            }
            catch (e) {
                return res.send(result.createErrorResult('Invalid Token'))
            }

        }
        else {
            return res.send(result.createErrorResult('Token is Missing'))
        }
    }

}


module.exports = authorization