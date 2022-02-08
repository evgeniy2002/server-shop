require('dotenv').config()
const express = require('express')
const cors = require('cors')
// const router = require('./routes/index')
const app = express()
const fileUpload = require('express-fileupload')

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
// app.use('/api', router)


let PORT = process.env.PORT || 8080

app.get('/', (req, res) => res.status(200).json('hello'))

app.listen(PORT, (req, res) => console.log('server been started on ' + PORT))





