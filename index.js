require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const path = require('path')
const fileUpload = require('express-fileupload')
// const { Client } = require('pg');

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
// app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


app.get('/', (req, res) => {
  res.status(200).json('Hello server')
})

  

app.post("/upload", function (req, res) {


  if (!req.files) {
    res.send("File was not found");
    return;
  }


  res.send("File Uploaded");


});


app.listen(PORT, (req, res) => console.log('server been started on ' + PORT))



