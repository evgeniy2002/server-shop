require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const fileUpload = require('express-fileupload')
const searchRouter = require('./routes/searchRouter')
const typeRouter = require('./routes/typeRouter')
const deviceRouter = require('./routes/deviceRouter')
const brandRouter = require('./routes/brandRouter')
const authRouter = require('./routes/authRouter')
const path = require('path')

// const domainsFromEnv = process.env.CORS_DOMAINS || ""

// const whitelist = domainsFromEnv.split(",").map(item => item.trim())


app.use(
  cors({
    origin: ["https://murmuring-beyond-94675.herokuapp.com"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    origin: true,
  })
);
app.use(express.json())


// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
// }

// app.use(cors({ origin: "https://murmuring-beyond-94675.herokuapp.com/", credentials: true }))
// app.use(cors(corsOptions))

// app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api/type', typeRouter)
app.use('/api/device', deviceRouter)
app.use('/api/brand', brandRouter)
app.use('/api/search', searchRouter)
app.use('/api/admin', authRouter)



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





