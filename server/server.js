const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const categoryRouter = require('./routes/category')
const authorization = require('./routes/authorization')

const app = express()

app.use(cors())
app.use(express.json())
app.use(authorization)
app.use('/user', userRouter)
app.use('/blog', blogRouter)
app.use('/category', categoryRouter)

app.listen(4000, 'localhost', () => {
    console.log('Express server started at port 4000');
    
})