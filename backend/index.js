const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv/config");
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Hello World....");
});

// user routes
const userRoute = require("./routes/user");
app.use("/api/users/", userRoute);

// Movies Routes
const moviesRoutes = require("./routes/movies");
app.use("/api/movies/", moviesRoutes);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });

mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (e) => console.log(`ERROR: ${e}`));

app.listen(process.env.PORT || 4000, () => {
  console.log("Listening to port 4000");
});
