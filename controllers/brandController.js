const uuid = require('uuid')
const db = require('../db')
const path = require('path')

class BrandController {
  async createBrand(req, res) {
    const { name, typeId } = req.body

    let brand, fileName

    if (req.files) {

      const { img } = req.files

      fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
    }
    if (!req.files) {
      brand = await db.query('insert into brand (brands_name, type_id) values ($1, $2) returning *', [name, typeId])
    } else {
      brand = await db.query('insert into brand (brands_name, img, type_id) values ($1, $2, $3) returning *', [name, fileName, typeId])
    }

    res.json(brand.rows[0])
  }
  async getAllBrand(req, res) {
    const { typeId } = req.query

    let brand;

    if (typeId) {
      brand = await db.query(`select * from brand where type_id = $1 order by brands_name asc`, [typeId])
    }
    if (!typeId) {
      brand = await db.query('select * from brand')
    }

    res.json(brand.rows)
  }
  async deleteBrand(req, res) {
    const { brandId } = req.query

    let brand

    brand = await db.query(`delete from brand where id = ${brandId}`)

    res.json(brand.rows)
  }
  async updateInfo(req, res) {
    const { newName, oldName } = req.body

    let brand, fileName


    if (req.files) {

      const { img } = req.files

      fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
    }


    if (fileName) {
      brand = await db.query(`update brand set img = '${fileName}' where brands_name = '${oldName}'`)

    }
    if (newName && !req.files) {
      console.log('name')
      brand = await db.query(`update brand set brands_name = '${newName}' where brands_name = '${oldName}'`)
    }
    if (newName && req.files) {
      brand = await db.query(`update brand set brands_name = '${newName}', img = '${fileName}' where brands_name = '${oldName}'`)
    }

    res.json(brand)
  }
}

module.exports = new BrandController()