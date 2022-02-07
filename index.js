require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const path = require('path')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


app.get('/', (req, res) => {
  console.log(req.query)
})

  
// var connectionString = "postgres://kcppsrdxhmgmbh:42c250af8b8e7b5e9b6d62a13b7463e2bc81c8cb6778be380f4d71211d69a47b@ec2-18-235-114-62.compute-1.amazonaws.com:5432/de5go83igfi7o4"


app.post("/upload", function (req, res) {


  if (!req.files) {
    res.send("File was not found");
    return;
  }


  res.send("File Uploaded");


});

// Инициализация
// var s3 = new EasyYandexS3({
//   auth: {
//     accessKeyId: "LtBLTqTD13dSySWVtvxo",
//     secretAccessKey: "DBEzoXasiI4f69dqUR27RZW6XPSWeMNYXURorwlK",
//   },
//   Bucket: "shop-storage", // например, "my-storage",
//   debug: true // Дебаг в консоли, потом можете удалить в релизе
// });

// async function start() {
//   var upload = await s3.Upload({
//     path: path.resolve(__dirname, "./123.png")
//   }, "/images/");
//   console.log(upload);
// }

// // start()

app.listen(PORT, (req, res) => console.log('server been started on ' + PORT))



