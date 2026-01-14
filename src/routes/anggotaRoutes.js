const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const anggotaController = require("../controllers/anggotaController");

// CREATE
router.post("/", authMiddleware, anggotaController.createAnggota);

// READ
router.get("/", authMiddleware, anggotaController.getAllAnggota);

// SEARCH
router.get("/search", authMiddleware, anggotaController.searchAnggota);

// GET by ID
router.get("/:id", authMiddleware, anggotaController.getAnggotaById);

// UPDATE
router.put("/:id", authMiddleware, anggotaController.updateAnggota);

// DELETE
router.delete("/:id", authMiddleware, anggotaController.deleteAnggota);

module.exports = router;
