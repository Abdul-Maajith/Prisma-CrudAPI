import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import postRoute from "./routes/post";
import userRoute from "./routes/user";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

dotenv.config();

app.use("/api/user", userRoute)
app.use("/api/post", postRoute);

app.listen(5000, () => {
    console.log("Listening on port 5000");
})