const db = require ('../db')

class SearchController{
  async getSearchDevice(req,res){
    const { name } = req.query

    let device = await db.query(`select * from device where device_name ilike '%${name}%'`)
    
    res.json(device.rows)

  }
}

module.exports = new SearchController()