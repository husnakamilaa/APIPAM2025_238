require("dotenv").config();
require("./config/database");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Visiograph running" });
});

//route login
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// buat yang anggota dulu
const anggotaRoutes = require("./routes/anggotaRoutes");
app.use("/api/anggota", anggotaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
