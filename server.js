require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/gym", require("./routes/gymRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
