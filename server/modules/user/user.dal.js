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

  editUser = async (data, file) =>{
    const {user_name, user_lastname, user_address, user_birthdate, user_phone, user_description, user_id} = data;

    try {
      let sql = "UPDATE user SET user_name = ?, user_lastname = ?, user_address = ?, user_birthdate = ?, user_phone = ?, user_description = ? WHERE user_id = ?"
      let values = [user_name, user_lastname, user_address, user_birthdate, user_phone, user_description, user_id]
      if(file){
        sql = "UPDATE user SET user_name = ?, user_lastname = ?, user_address = ?, user_birthdate = ?, user_phone = ?, user_description = ?, user_avatar = ? WHERE user_id = ?"
        values = [user_name, user_lastname, user_address, user_birthdate, user_phone, user_description, file.filename, user_id]
      }
      const result = await executeQuery(sql, values);
      return result
      
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  addFavFilm = async (values) =>{
    try {
      let sql = "INSERT INTO film (film_id, film_title, film_image, user_id) VALUES (?, ?, ?, ?)"
      const result = await executeQuery(sql, values);
      
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}

export default new UserDal()