import express from "express";
import "dotenv/config";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import userrouter from "./routes/userrouter.js";
import mongodb from "./config/mongodb.js";
import cloudinaryfunc from "./config/cloudinary.js";
import adminrouter from "./routes/adminroute.js";
import foodrouter from "./routes/foodsroute.js";
// import userrouter from "./routes/userrouter.js";

const app = express();

// APP CONFIG
const PORT = process.env.PORT || 3956;
mongodb();
cloudinaryfunc();

// MIDDLEWARE
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.use('/api/user', userrouter);
app.use('/api/admin', adminrouter);
app.use('/api/product', foodrouter);

app.get("/", (req, res) => {
  res.send("API is Running");
});
app.listen(PORT, () => {
  console.log(`Server is Started at Port : localhost:${PORT}`);
});
