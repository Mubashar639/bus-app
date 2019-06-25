const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

// Routes
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const db = require("./config/keys").mongoURI;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/user", authRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/booking", bookingRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
  })
  .catch(err => console.log(`DB ERROR ${err}`));
