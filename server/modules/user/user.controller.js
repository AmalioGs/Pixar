import { comparePassword, hashPassword } from "../../utils/hashUtils.js";
import { generateToken, getIdFromToken } from "../../utils/tokenUtils.js";
import UserDal from "./user.dal.js";

class UserController {
  getUser = (req, res) => {
    res.status(200).json("HOLAAAAAAAAAAAAAAA, PA TI MI COLAAAA");
  };

  register = async (req, res) => {
    try {
      const {
        user_name,
        user_lastname,
        user_email,
        user_password,
        repPassword,
        accept,
      } = req.body;

      // let values =

      if (
        !user_name ||
        !user_lastname ||
        !user_email ||
        !user_password ||
        !repPassword ||
        !accept
      ) {
        throw new Error("Debes cumplimentar los campos");
      } else if (user_password !== repPassword) {
        throw new Error("Las contraseñas deben coincidir");
      } else {
        const hash = await hashPassword(user_password); //ponemos await porque al ser async debe de poseerlo.
        const result = await UserDal.register([
          user_name,
          user_lastname,
          user_email,
          hash,
          accept,
        ]);
        res.status(200).json({ msg: "Todo OK!" });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

  login = async (req, res) => {
    const { user_email, user_password } = req.body;
    try {
      const result = await UserDal.findUserByEmail(user_email);
      console.log(result);

      if (result.length === 0) {
        res.status(401).json({ message: "Usuario no existe" });
      } 
      else {
        const user = result[0];
        const match = await comparePassword(user_password, user.user_password);

        if (match) {
          //Genera un token
          const token = generateToken(user.user_id)
          //Mandar un token
          res.status(200).json(token)

        } 
        else {
          res.status(401).json({ message: "Contraseña no coincide" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Error del servidor" });
    }
  };

  findUserById = async (req, res) =>{
    const id = getIdFromToken(req.token);
    const [user] = await UserDal.getUserById(id);
    
    res.status(200).json(user)
  }
}
export default new UserController();