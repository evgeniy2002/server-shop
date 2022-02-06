const uuid = require('uuid')
const path = require('path')
const db = require('../db')
const { off } = require('process')
const e = require('express')

class DeviceController {
  async create(req, res) {
    let { name, price, brandId, desc } = req.body
    let device, fileName

    if(req.files){

      const { img } = req.files
  
      fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
    }

    if(!req.files){
       device = await db.query('insert into device(device_name, price, brand_id, description) values($1,$2,$3,$4) returning *',
       [name, price, brandId, desc])
    }else{

      device = await db.query('insert into device(device_name, price, img, brand_id, description) values($1,$2,$3,$4,$5) returning *',
        [name, price, fileName, brandId, desc])
    }


    res.json(device.rows[0])
 
  }
  async getAll(req, res) {
    let device

    let { brandId, typeOrder, orderBy, limit, page, maxPrice, lowerRange, upperRange } = req.query


    page = page || 1
    limit = limit || 12
    let offset = page * limit - limit

    if (brandId) {
      device = await db.query(`select * from device where brand_id = $1 limit $2 offset $3`, [brandId, limit, offset])
    }
    if (typeOrder && orderBy) {
      if (typeOrder === 'in_24_hour') {
        device = await db.query(`select * from device where brand_id = $1 and create_at >= now() - interval '1 day' `, [brandId])
      } else {
        device = await db.query(`select * from device where brand_id = $1 order by ${typeOrder === 'low_price' ? 'price' : typeOrder} ${orderBy} limit $2 offset $3`, [brandId, limit, offset])
      }

    }
    if (maxPrice === '1') {
      device = await db.query(`select max(price) from device where brand_id = ${brandId}`)
    }
    if (lowerRange && upperRange) {
      if (typeOrder === 'in_24_hour') {
        device = await db.query(`select * from device where brand_id = ${brandId} and price between ${lowerRange} and ${upperRange} and create_at >= now() - interval '1 day'`)
      } else {
        device = await db.query(`select * from device where brand_id = ${brandId} and price between ${lowerRange} and ${upperRange}`)
      }

    }
    if (!brandId && typeOrder && orderBy) {
      device = await db.query(`select * from device where rating > 5 limit 9 offset $1`, [offset])
    }
    if (!Object.keys(req.query).length) {
      device = await db.query('select * from device')
    }








    res.json(device.rows)


  }
  async getOne(req, res) {
    const id = req.params.id

    const device = await db.query('select * from device where id = $1', [id])

    res.json(device.rows[0])
  }

  async updateCountEye(req, res) {

    let device,fileName

    const { eyeId, rating } = req.query

    const { newName, oldName, newDesc, newPrice } = req.body



    console.log(req.body)

    if (req.files) {

      const { img } = req.files
  
      fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))


      // device = await db.query(`update device set img = '${fileName}' where device_name = '${oldName}'`)
    }
    if (newName, fileName, newDesc, newPrice) {
    
      device = await db.query(`update device set device_name = '${newName}', price = ${newPrice}, img = '${fileName}', description = '${newDesc}' where device_name = '${oldName}'`)
    }
    if(fileName && !newName && !newPrice && !newDesc){
      device = await db.query(`update device set img = '${fileName}' where device_name = '${oldName}'`)

    }
    if (newDesc && !newName && !newPrice && !fileName) {
      device = await db.query(`update device set description = '${newDesc === ' ' ? '' : newDesc}' where device_name = '${oldName}'`)
    }
    if (newPrice && !newDesc && !newName && !fileName) {
      device = await db.query(`update device set price = ${newPrice} where device_name = '${oldName}'`)
    }
    if (newName && !newPrice && !newDesc && !fileName) {
      device = await db.query(`update device set device_name = '${newName}' where device_name = '${oldName}'`)
    }


    if (eyeId) {
      await db.query(`update device set rating = ${rating} where id = ${eyeId}`)

    }

    res.json(device)

  }

  async deleteDevice(req, res) {
    const { brandId, deviceName, allDevice } = req.query


    let device

    if (allDevice && deviceName.length) {
      device = await db.query(`delete from device where device_name = '${deviceName}' and brand_id = ${brandId}`)
    }
    if (allDevice && !deviceName.length) {
      device = await db.query(`delete from device where brand_id = ${brandId}`)
    }
    res.json(device)
  }

}

module.exports = new DeviceController()