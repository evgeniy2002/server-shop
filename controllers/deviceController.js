
const db = require('../db')
const EasyYandexS3 = require("easy-yandex-s3");

let s3 = new EasyYandexS3({
  auth: {
    accessKeyId: "LtBLTqTD13dSySWVtvxo",
    secretAccessKey: "DBEzoXasiI4f69dqUR27RZW6XPSWeMNYXURorwlK",
  },
  Bucket: "shop-storage"
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

    let { brandId, typeOrder, orderBy, limit, page, maxPrice, getBestseller } = req.query


    page = page || 1
    limit = limit || 12
    let offset = page * limit - limit

    if (brandId) {
   
      device = await db.query(`select * from device where brand_id = $1 order by rating desc limit $2 offset $3`, [brandId, limit, offset])
    }
    if (typeOrder && orderBy) {

        device = await db.query(`select * from device where brand_id = $1 order by ${typeOrder === 'low_price' ? 'price' : typeOrder} ${orderBy} limit $2 offset $3`, [brandId, limit, offset])
      

      if (typeOrder === 'create_at') {
        device = await db.query(`select * from device where brand_id = $1 and create_at > (current_timestamp - '1 day'::interval) `, [brandId])
      }

    }
    if (maxPrice === '1') {
      device = await db.query(`select max(price) from device where brand_id = ${brandId}`)
    }

    if (!brandId) {
      device = await db.query(`select * from device where rating > 10 limit $1 offset $2`, [limit, offset])
    }
    if (getBestseller === 'true') {
      device = await db.query(`select * from device where click_to_link > 1 order by click_to_link desc limit $1 offset $2`, [limit, offset])

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


    const { eyeId, linkId, rating, click_to_link } = req.query

    const { newName, oldName, newDesc, newPrice, availabelProduct } = req.body

    let device, location

    if (req.files) {

      const { img } = req.files
      let buffer = img.data

      var upload = await s3.Upload({
        buffer: buffer
      }, "/images/");
      location = upload.Location


      
    }

    if (location && !newName && !newPrice && !newDesc) {

      device = await db.query(`update device set img = $1 where device_name = $2`, [location, oldName])

    }
    if (newDesc && !newName && !newPrice && !location) {
  
      device = await db.query(`update device set description = '${newDesc === ' ' ? '' : newDesc}' where device_name = '${oldName}'`)
    }
    if (newPrice && !newDesc && !newName && !location) {

      const current_price = await db.query(`select price from device where device_name = $1`, [oldName])

      await db.query(`update device set old_price = $1 where device_name = $2`, [current_price.rows[0].price, oldName])


      const percent_val = Math.floor(100 - (newPrice / current_price.rows[0].price) * 100)


      await db.query(`update device set percent = $1 where device_name = $2`, [percent_val, oldName])

      if (percent_val <= 0) {
        await db.query(`update device set percent = 0, old_price = 0 where device_name = $1`, [oldName])
      }

      device = await db.query(`update device set price = $1 where device_name = $2`, [newPrice, oldName])

    }
    if (newName && !newPrice && !newDesc && !location) {
      await db.query(`update device set device_name = '${newName}' where device_name = '${oldName}'`)
    }

    if (availabelProduct) {
      await db.query(`update device set product_availability = '${availabelProduct === 'есть' ? true : false}' where device_name = $1`, [oldName])
    }


    if (eyeId) {
      await db.query(`update device set rating = ${rating} where id = ${eyeId}`)

    }
    if(linkId && !eyeId){
      await db.query(`update device set click_to_link = ${click_to_link} where id = ${linkId}`)
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