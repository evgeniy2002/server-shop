const db = require('../db')
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class AuthController {
  async registration(req, res) {
    // try {
    //   const { name, password } = req.body

    //   const hashPassword = bcrypt.hashSync(password, 7)

    //   const new_user = await db.query('insert into admin_user( user_name, password ) values($1, $2) returning *', [name, hashPassword])

    //   res.json(new_user.rows[0])
    //   return res.json({ message: 'Пользователь успешно зарегестрирован' })
    // } catch (e) {
    //   console.log(e)
    //   res.status(400).json({ message: 'registration error' })
    // }
  }
  async login(req, res) {
    try {
      const { name, password } = req.body
      
      // const admin_password = await db.query('select password from admin_user where user_name = $1', [name])
      const admin_id = await db.query('select id from admin_user where user_name = $1', [name])
  
      // const validPassword = bcrypt.compareSync(password, admin_password.rows[0].password);
   
      // if(!validPassword){
      //   return res.status(400).json({message: 'invalid password'})
      // }
      // alert(admin_id, 'hey hey')
      const token = jwt.sign({ id: admin_id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
      return res.status(200).json({ token: token })

    } catch (e) {
     
      res.status(400).json({ message: 'login error' })
    }
  }
}

module.exports = new AuthController()