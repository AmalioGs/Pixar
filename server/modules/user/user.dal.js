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
}

export default new UserDal()