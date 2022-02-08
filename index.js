require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const fileUpload = require('express-fileupload')
// const searchRouter = require('./routes/searchRouter')
const typeRouter = require('./routes/typeRouter')
const deviceRouter = require('./routes/deviceRouter')
// const brandRouter = require('./routes/brandRouter')
// const authRouter = require('./routes/authRouter')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api/type', typeRouter)
app.use('/api/device', deviceRouter)
// app.use('/api/brand', brandRouter)
// app.use('/api/admin', authRouter)
// app.use('/api/search', searchRouter)


let PORT = process.env.PORT || 8080

app.listen(PORT, (req, res) => console.log('server been started on ' + PORT))





// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const app = express()
// // const router = require('./routes/index.js')
// const fileUpload = require('express-fileupload')
// const path = require('path')
// const searchRouter = require('./routes/searchRouter')
// const typeRouter = require('./routes/typeRouter')
// const deviceRouter = require('./routes/deviceRouter')
// const brandRouter = require('./routes/brandRouter')
// const authRouter = require('./routes/authRouter')


// app.use(cors())
// app.use(express.json())
// app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload({}))
// // app.use('/api', router)

// app.use('/api/type', typeRouter)
// app.use('/api/device', deviceRouter)
// app.use('/api/search', searchRouter)
// app.use('/api/brand', brandRouter)
// app.use('/api/admin', authRouter)

// // router.get("/todos", function(req, res) {
// //   res.json(todos);
// // });


// let PORT = process.env.PORT || 8080

// app.get('/', (req,res) => {
//   res.status(200).json('hello')
// })

// app.listen(PORT, (req, res) => console.log('server been started on ' + PORT))





