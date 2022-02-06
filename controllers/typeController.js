
const db = require('../db')
const uuid = require('uuid')
const path = require('path')

class TypeController {
  async create(req, res) {
    const { name } = req.body
    let type, fileName
    if (req.files) {

      const { img } = req.files

      fileName = uuid.v4() + '.jpg'
      console.log(fileName)
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
    }
    if (!req.files) {
      type = await db.query('insert into type (type_name) values ($1) returning *', [name])
    } else {
      type = await db.query('insert into type (type_name, img) values ($1, $2) returning *', [name, fileName])
    }

    res.json(type.rows[0])
  }
  async getAll(req, res) {

    const { typeId, typeOrder } = req.query

    let types


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

    let type, fileName

    if (req.files) {

      const { img } = req.files

      fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
    }


    // type = await db.query(`update type set img = '${fileName}' where type_name = '${oldName}'`)
    if (fileName) {
      type = await db.query(`update type set img = '${fileName}' where type_name = '${oldName}'`)

    }

    if (newName && !req.files) {
      type = await db.query(`update type set type_name = '${newName}' where type_name = '${oldName}'`)
    }
    if (newName && req.files) {
      type = await db.query(`update type set type_name = '${newName}', img = '${fileName}' where type_name = '${oldName}'`)
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

  async updateInfo(req, res) {
    const { newName } = req.body

    const { newImg } = req.files

    const fileName = uuid.v4() + '.jpg'
    img.mv(path.resolve(__dirname, '..', 'static', fileName))

    const type = await db.query('update type set type_name = $1, img = $2 where newName = $3', [newName, newImg, oldName])

    res.json(type.rows[0])
  }
}

module.exports = new TypeController()