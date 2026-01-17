const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const peminjamanController = require("../controllers/peminjamanController");

router.post("/", peminjamanController.createPeminjaman);
router.get("/", peminjamanController.getAllPeminjaman);
router.get("/:id", peminjamanController.getPeminjamanById);
router.put("/:id", peminjamanController.updatePeminjaman);
router.delete("/:id", peminjamanController.deletePeminjaman);

module.exports = router;
