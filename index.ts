import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/user";
import loginRoute from "./routes/login";
import followRoute from "./routes/follow";
import postRoute from "./routes/post";
import likeRoute from "./routes/like";
import commentRoute from "./routes/comment";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`Heyy`);
});
app.use("/user", userRoute);
app.use("/login", loginRoute);
app.use("/follow", followRoute);
app.use("/post", postRoute);
app.use("/like", likeRoute);
app.use("/comment", commentRoute);

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
