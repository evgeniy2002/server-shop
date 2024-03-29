require('dotenv').config()
const express = require('express')
const cors = require('cors')


const app = express()
const fileUpload = require('express-fileupload')
// const searchRouter = require('./routes/searchRouter')
// const typeRouter = require('./routes/typeRouter')
// const deviceRouter = require('./routes/deviceRouter')
// const brandRouter = require('./routes/brandRouter')
// const authRouter = require('./routes/authRouter')
// const path = require('path')
const router = require('./routes/index')



const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "allowedHeaders": ["Content-Type"]
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(fileUpload({}))


app.use('/api', router)

// app.use('/api/type', createProxyMiddleware({ target: 'https://shrouded-reaches-17656.herokuapp.com/api/type', changeOrigin: true }));

// app.use(function (req, res, next) {
  
//   res.setHeader('Access-Control-Allow-Origin', 'https://murmuring-beyond-94675.herokuapp.com');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  
  
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// app.options("*", cors({ origin: 'https://murmuring-beyond-94675.herokuapp.com', optionsSuccessStatus: 200 }));

// app.use(
  //   proxy('/api/type', {
    //     target: 'https://shrouded-reaches-17656.herokuapp.com/api/type',
    //     secure: false,
    //     changeOrigin: true
    //   })
    //   )
    
    // app.use('/api/type', {
      
      // })
      // app.use('/api/device',deviceRouter)
      // app.use('/api/brand', brandRouter)
      // app.use('/api/search', searchRouter)
      // app.use('/api/admin_panel', authRouter)
      
      
      // const corsConfig = {
  //   origin: 'https://murmuring-beyond-94675.herokuapp.com/',
  //   credentials: true,
  //   methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
  //   allowedHeaders: ['Content-Type', 'Authorization']
  // };
  


// app.use(cors({
//   origin: true,
//   credentials: true,
//   methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(function (req, res, next) {

//   res.setHeader('Access-Control-Allow-Origin', 'https://murmuring-beyond-94675.herokuapp.com');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   next();
// });

// app.use(cors({ origin: "https://murmuring-beyond-94675.herokuapp.com", optionsSuccessStatus: 200 }));

// app.options('*', cors(corsConfig));
// app.use(cors({
//   origin: 'https://murmuring-beyond-94675.herokuapp.com',
//   credentials: true
// }))

// app.use(express.static(path.resolve(__dirname, 'static')))



// app.use(function (req, res, next) {

//   res.setHeader('Access-Control-Allow-Origin', 'https://murmuring-beyond-94675.herokuapp.com');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });



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





