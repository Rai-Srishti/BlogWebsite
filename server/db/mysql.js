const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'D2_89596_Srishti',
    password: 'manager',
    database: 'hackathon_blog'
})

module.exports = pool