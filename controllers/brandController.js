const db = require('../db')
const EasyYandexS3 = require("easy-yandex-s3");

let s3 = new EasyYandexS3({
  auth: {
    accessKeyId: "LtBLTqTD13dSySWVtvxo",
    secretAccessKey: "DBEzoXasiI4f69dqUR27RZW6XPSWeMNYXURorwlK",
  },
  Bucket: "shop-storage", // например, "my-storage",
  debug: true // Дебаг в консоли, потом можете удалить в релизе
});

class BrandController {
  async createBrand(req, res) {
    const { name, typeId } = req.body

    let brand, location

    if (req.files) {
      const { img } = req.files
      let buffer = img.data

      var upload = await s3.Upload({
        buffer: buffer
      }, "/images/");
      location = upload.Location
    }
    if (!req.files) {
      brand = await db.query('insert into brand (brands_name, type_id) values ($1, $2) returning *', [name, typeId])
    } else {
      brand = await db.query('insert into brand (brands_name, img, type_id) values ($1, $2, $3) returning *', [name, location, typeId])
    }

    res.json(brand.rows[0])
  }
  async getAllBrand(req, res) {
    const { brandId, brandOrder } = req.query

    let brand;

    if (brandId && !brandOrder) {

      brand = await db.query(`select * from brand where type_id = $1 order by brands_name desc`, [brandId])

    }
    if (!brandId && !brandOrder) {

      brand = await db.query('select * from brand')
    }
    if (brandOrder && !brandId) {

      brand = await db.query('select brand.id, brand.brands_name, brand.img, type.type_name from brand, type where brand.type_id = type.id order by brand.rating desc limit 10')
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

    const { eyeId, rating } = req.query

    let brand, location


    if (req.files) {

      const { img } = req.files
      let buffer = img.data

      var upload = await s3.Upload({
        buffer: buffer
      }, "/images/");
      location = upload.Location
    }


    if (location) {
      brand = await db.query(`update brand set img = $1 where brands_name = $2`, [location, oldName])

    }
    if (newName && !req.files) {

      brand = await db.query(`update brand set brands_name = $1 where brands_name = $2`, [newName, oldName])
    }
    if (newName && req.files) {
      brand = await db.query(`update brand set brands_name = $1, img = $2 where brands_name = $3`, [newName, location, oldName])
    }

    if (eyeId) {
      await db.query(`update brand set rating = ${rating} where id = ${eyeId}`)

    }

    res.json(brand)
  }
}

module.exports = new BrandController()