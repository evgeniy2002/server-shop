
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


class TypeController {
  async create(req, res) {
    const { name } = req.body

    let type, location


    if (req.files) {

      const { img } = req.files
      let buffer = img.data

      var upload = await s3.Upload({
        buffer: buffer
      }, "/images/");
      location = upload.Location
    }


    if (!req.files) {
      type = await db.query('insert into type (type_name) values ($1) returning *', [name])
    } else {

      type = await db.query('insert into type (type_name, img) values ($1, $2) returning *', [name, location])
    }

    res.json(type.rows[0])
  }
  async getAll(req, res) {

    const { typeId, typeOrder } = req.query

    let types
    // console.log(typeId)

    if (typeId) {
      types = await db.query(`select * from type where id = ${typeId}`)
    }
    if (!typeId) {
      types = await db.query('select * from type')
    }
    if (!typeId && typeOrder) {
      types = await db.query('select * from type where rating > 5 limit 9')
    }
    res.json(types.rows)
  }
  async updateCountEye(req, res) {
    const { typeId, rating } = req.query

    const { newName, oldName } = req.body

    let type, location

    if (req.files) {

      const { img } = req.files
      let buffer = img.data

      var upload = await s3.Upload({
        buffer: buffer
      }, "/images/");
      location = upload.Location
    }


    // type = await db.query(`update type set img = '${fileName}' where type_name = '${oldName}'`)
    if (location) {
      type = await db.query(`update type set img = $1 where type_name = $2`, [location, oldName])

    }

    if (newName && !req.files) {
      type = await db.query(`update type set type_name = $1 where type_name = $2`, [newName, oldName])
    }
    if (newName && req.files) {
      type = await db.query(`update type set type_name = $1, img = $2 where type_name = $3`, [newName, location, oldName])
    }


    if (typeId) {
      await db.query(`update type set rating = ${rating} where id = ${typeId}`)
    }


    res.json(type)

  }
  async deleteType(req, res) {
    const { typeId } = req.query

    let type

    type = await db.query(`delete from type where id = ${typeId}`)

    res.json(type.rows)
  }

}

module.exports = new TypeController()