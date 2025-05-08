import { z } from "zod";
import validator from "validator";
import adminmodel from "../models/adminmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
const signup = async (req, res) => {
  const { email, password } = req.body;
  // console.log(firstname, lastname, email, password)
  const userSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 char long" }),
  });

  const validateData = userSchema.safeParse(req.body);

  if (!validateData.success) {
    return res
      .status(400)
      .json({ error: validateData.error.issues.map((err) => err.message) });
  }
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    const Exists = await adminmodel.findOne({ email });
    if (Exists) {
      return res.status(400).json({ error: "Email already Exists!" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid Email!" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Enter a Strong Password!" });
    }

    const adminuser = {
      email,
      password: hashpassword,
    };
    const admin = await adminmodel.create(adminuser);
    return res
      .status(200)
      .json({ success: true, message: "Signed up Sucessfully..", admin });
  } catch (e) {
    return res.status(500).json({ error: "Error in admin signup", e });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminmodel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "Email Does'nt Exists!" });
    }
    const matchpass = await bcrypt.compare(password, admin.password);
    if (matchpass) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }
    const token = jwt.sign(
      {
        _id: admin._id,
      },
      config.JWT_ADMINKEY,
      { expiresIn: "1d" }
    );
    const cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1 day
      httpOnly: true, //CAN'T BE ACCESS VIA JS DIRECTLY
      secure: process.env.NODE_ENV === "production", //true for https only
      sameSite: "Strict", //CFRF ATTACK
    };
    res.cookie("jwt", token, cookieOption);
    return res
      .status(200)
      .json({ success: true, message: "Login Sucessfully..", admin, token });
  } catch (e) {
    return res.status(500).json({ error: "Error in admin login", e });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout Sucessfully.." });
  } catch (e) {
    return res.status(500).json({ error: "Error in logout!" });
  }
};
export { signup, login, logout };
