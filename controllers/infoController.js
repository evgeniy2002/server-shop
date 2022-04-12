const db = require ('../db')

class SearchController{
  async getInfoDevice(req, res) {
    const id = req.params.id
 
    const info = await db.query('select * from device_character where device_id = $1', [id])

    res.json(info.rows)
  }
}

module.exports = new SearchController()