class UserController {
  getUser = (req, res)=>{
    res.status(200).json("HOLAAAAAAAAAAAAAAA, PA TI MI COLAAAA")
  }
}
export default new UserController()