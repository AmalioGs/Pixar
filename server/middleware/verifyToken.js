import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const tokenBearer = req.headers.authorization;

  if (!tokenBearer) {
    res.status(401).json({ message: "No autorizado" });

  } 
  else {
    let token = tokenBearer.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_KEY, (error) => {
      
      if (error) {
        res.status(401).json({ message: "No autorizado" });
      } 

      else {
        req.token = token;
        next();
      }
    });
  }
};
