import jwt from "jsonwebtoken";
import config from "../config.js";
function usermiddleware(req, res, next) {
  const authheader = req.headers.authorization;

  if (!authheader || !authheader.startsWith("Bearer")) {
    return res.status(401).json({ error: "No token provider" });
  }
  const token = authheader.split(" ")[1];
  try {
    const decode = jwt.verify(token, config.JWT_USERPASSWORD);
    req.userId = decode._id;
    next();
  } catch (e) {
    return res.status(500).json({ error: "Invalid token or expired!" });
  }
}
export default usermiddleware;
