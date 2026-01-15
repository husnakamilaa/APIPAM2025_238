const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const barangController = require("../controllers/barangController");

router.post("/", authMiddleware, barangController.createBarang);
router.get("/", authMiddleware, barangController.getAllBarang);
router.get("/search", authMiddleware, barangController.searchBarang);
router.get("/:id", authMiddleware, barangController.getBarangById);
router.put("/:id", authMiddleware, barangController.updateBarang);
router.delete("/:id", authMiddleware, barangController.deleteBarang);

module.exports = router;
