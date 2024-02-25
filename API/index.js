import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import relationshipRoutes from "./routes/relationships.js";
import storiesRoutes from "./routes/stories.js";
import multer from "multer";
const app = express();

// Middleware order matters, so place CORS before other middleware and route declarations (that shit is by chatgbt)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());
app.use(cookieParser());



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/uploads/posts')
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) that shit saves images without extention
    cb(null, Date.now() + file.originalname);
  }
})

const upload = multer({ storage: storage })


app.post("/api/upload",upload.single("file"), (req,res)=>{
  const file = req.file;
  res.status(200).json(file.filename)
});

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/stories", storiesRoutes);


app.listen(8800, () => {
  console.log("MyDevify Social is working ...");
});
