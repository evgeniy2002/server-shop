const  Pool  = require("pg").Pool;


const pool = new Pool({
  // user: "czuisgoyevoecp",
  // password: 'b0de9f9a3cd76f1147a359bc1a8615af828815a00b4a8cb8be3e20032c74e2a1',
  // host: 'ec2-23-23-162-138.compute-1.amazonaws.com',
  // port: 5432,
  // database: "d3r3eo0in5a99k"
  // connectionString: process.env.DATABASE_URL || 'postgres://kcppsrdxhmgmbh:42c250af8b8e7b5e9b6d62a13b7463e2bc81c8cb6778be380f4d71211d69a47b@ec2-18-235-114-62.compute-1.amazonaws.com:5432/de5go83igfi7o4',
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // database: process.env.DB_NAME,
  // ssl: {
  //   rejectUnauthorized: false
  // }
  user: "postgres",
  password: '5651637',
  host: 'localhost',
  port: 5432,
  database: "online_store"
})

module.exports = pool
