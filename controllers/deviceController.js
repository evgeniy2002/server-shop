
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

class DeviceController {
  async create(req, res) {
    let { name, price, brandId, desc } = req.body
    let device, location

    if (req.files) {
      const { img } = req.files
      let buffer = img.data

      var upload = await s3.Upload({
        buffer: buffer
      }, "/images/");
      location = upload.Location
    }

    if (!req.files) {
      device = await db.query('insert into device(device_name, price, brand_id, description) values($1,$2,$3,$4) returning *',
        [name, price, brandId, desc])
    } else {

      device = await db.query('insert into device(device_name, price, img, brand_id, description) values($1,$2,$3,$4,$5) returning *',
        [name, price, location, brandId, desc])
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

    
    const { eyeId, rating } = req.query
    
    const { newName, oldName, newDesc, newPrice } = req.body
    
    let device, location
    console.log(req.body)
    if (req.files) {

      const { img } = req.files
      let buffer = img.data

      var upload = await s3.Upload({
        buffer: buffer
      }, "/images/");
      location = upload.Location


      // device = await db.query(`update device set img = '${fileName}' where device_name = '${oldName}'`)
    }
    // if (newName.length, location !== null, newDesc.length, newPrice.length) {
    //   console.log('тут5')

    //   device = await db.query(`update device set device_name = $1, price = $2, img = $3, description = $4 where device_name = $5`,
    //   [newName, newPrice, location, newDesc, oldName])
    // }
    if (location && !newName && !newPrice && !newDesc) {
      console.log('тут4')
      device = await db.query(`update device set img = $1 where device_name = $2`, [location, oldName])

    }
    if (newDesc && !newName && !newPrice && !location) {
      console.log('тут3')
      device = await db.query(`update device set description = '${newDesc === ' ' ? '' : newDesc}' where device_name = '${oldName}'`)
    }
    if (newPrice && !newDesc && !newName && !location) {
      console.log('тут2')
      device = await db.query(`update device set price = $1 where device_name = $2`, [newPrice, oldName])
    }
    if (newName && !newPrice && !newDesc && !location) {
      console.log('тут1')
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