const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

class AuthController {
  // async registration(req, res) {
  //   try {
  //     const { name, password } = req.body

  //     const hashPassword = bcrypt.hashSync(password, 7)

  //     const new_user = await db.query('insert into admin_user( user_name, password ) values($1, $2) returning *', [name, hashPassword])

  //     res.json(new_user.rows[0])
  //     return res.json({ message: 'Пользователь успешно зарегестрирован' })
  //   } catch (e) {
  //     console.log(e)
  //     res.status(400).json({ message: 'registration error' })
  //   }
  // }
  async login(req, res) {
    try {
      const { login, password } = req.body

      const admin_id = await db.query('select id from admin_user where user_name = $1', [login])
      const admin_password = await db.query('select password from admin_user where user_name = $1', [login])


      // const matchPassword = async (enteredpassword, oldPassword) => {
      //   return await bcrypt.compare(enteredpassword, oldPassword)
      // }

      // if(!matchPassword(password, admin_password.rows[0].password)){
      //     return res.status(400).json({ message: 'invalid password' })

      // }
      // console.log(admin_password.rows)
      
      // console.log(validPassword)
      if(admin_id.rows.length){
        const token = jwt.sign({ id: admin_id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
        return res.status(200).json({ token: token })

      }
      const validPassword = bcrypt.compareSync(password, admin_password.rows[0].password);
    
      if(!validPassword){
        return res.status(400).json({ message: 'invalid password' })
      }

    } catch (e) {

      res.status(400).json({ message: 'login error' })
    }
  }
}

module.exports = new AuthController()