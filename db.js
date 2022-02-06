const  Pool  = require("pg").Pool;

const pool = new Pool({
  // user: "czuisgoyevoecp",
  // password: 'b0de9f9a3cd76f1147a359bc1a8615af828815a00b4a8cb8be3e20032c74e2a1',
  // host: 'ec2-23-23-162-138.compute-1.amazonaws.com',
  // port: 5432,
  // database: "d3r3eo0in5a99k"
  user: "postgres",
  password: '5651637',
  host: 'localhost',
  port: 5432,
  database: "online_store"
})

module.exports = pool
