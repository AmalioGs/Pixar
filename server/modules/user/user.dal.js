import { executeQuery } from "../../config/db.js"

class UserDal {
  register = async (values)=>{
    try {
      let sql = "INSERT INTO user (user_name, user_lastname, user_email, user_password, terms_accepted) VALUES (?, ?, ?, ?, ?)"
      const result = await executeQuery(sql, values);
            
    } catch (error) {
      throw error
    }
  }

  findUserByEmail = async (user_email) =>{
    try {
      let sql = "SELECT * FROM user WHERE user_email = ? AND user_is_deleted = 0"
      const result = await executeQuery(sql, [user_email])
      return result

    } catch (error) {
      throw error
    }
  }

  getUserById = async (id) =>{
    try {
      let sql = "SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0"
      const user = await executeQuery(sql, [id])
      return user
      
    } catch (error) {
      throw error
      
    }
  }
}

export default new UserDal()