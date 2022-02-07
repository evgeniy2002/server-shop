const  Pool  = require("pg").Pool;

const pool = new Pool({
  // user: "czuisgoyevoecp",
  // password: 'b0de9f9a3cd76f1147a359bc1a8615af828815a00b4a8cb8be3e20032c74e2a1',
  // host: 'ec2-23-23-162-138.compute-1.amazonaws.com',
  // port: 5432,
  // database: "d3r3eo0in5a99k"
  user: "kcppsrdxhmgmbh",
  password: '42c250af8b8e7b5e9b6d62a13b7463e2bc81c8cb6778be380f4d71211d69a47b',
  host: 'ec2-18-235-114-62.compute-1.amazonaws.com',
  port: 5432,
  database: "de5go83igfi7o4"
  // user: "postgres",
  // password: '5651637',
  // host: 'localhost',
  // port: 5432,
  // database: "online_store"
})

module.exports = pool
