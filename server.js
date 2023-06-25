const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const port = process.env.PORT || 4000;
const userRoute = require("./routes/userRoute");

dotenv.config();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoute);

app.listen(port, () => console.log(`Server started on ${port}`));
