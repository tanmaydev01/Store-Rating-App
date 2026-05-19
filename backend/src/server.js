const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const Store = require("./models/Store");
const storeRoutes = require("./routes/storeRoutes");
const Rating = require("./models/Rating")
const ratingRoutes = require("./routes/ratingRoutes")

const app = express();

const PORT = 5000;


app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/stores",storeRoutes)
app.use("/api/ratings",ratingRoutes)

app.get("/", (req, res) => {
  res.send("Backend Running");
});


sequelize
  .sync({alter:true})
  .then(() => {
    console.log("PostgreSQL Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed");
    console.log(error);
  });



  