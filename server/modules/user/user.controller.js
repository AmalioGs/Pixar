import { hashPassword } from "../../utils/hashUtils.js";
import UserDal from "./user.dal.js";

class UserController {
  getUser = (req, res)=>{
    res.status(200).json("HOLAAAAAAAAAAAAAAA, PA TI MI COLAAAA")
  }

  register = async (req, res)=>{
    try {
      const {user_name, user_lastname, user_email, user_password, repPassword, accept} = req.body;

      // let values = 

      if(!user_name || !user_lastname || !user_email || !user_password || !repPassword || !accept){
        throw new Error("Debes cumplimentar los campos");

      } else if (user_password !== repPassword){
        throw new Error("Las contraseñas deben coincidir");

      } else {
        const hash = await hashPassword(user_password) //ponemos await porque al ser async debe de poseerlo.
        const result = await UserDal.register([user_name, user_lastname, user_email, hash, accept])
        res.status(200).json({msg:"Todo OK!"})
      }

    } catch (error) {
      res.status(400).json({msg: error.message});

    }
  }
}
export default new UserController()