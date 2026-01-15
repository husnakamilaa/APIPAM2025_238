const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const kerusakanController = require("../controllers/kerusakanController");

router.post("/", authMiddleware, kerusakanController.createKerusakan);
router.get("/", authMiddleware, kerusakanController.getAllKerusakan);
router.get("/:id", authMiddleware, kerusakanController.getKerusakanById);
router.put("/:id", authMiddleware, kerusakanController.updateKerusakan);
router.delete("/:id", authMiddleware, kerusakanController.deleteKerusakan);

module.exports = router;