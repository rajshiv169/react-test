const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

dotenv.config();

const app = express();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello, world");
});

// requires api
const addressRoutes = require("./routes/address");

// routes
app.use("/api", addressRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`app is running at ${port}`);
  }
});
