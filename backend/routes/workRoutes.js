const express = require("express");
const {
  getAllWorks,
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
} = require("../controllers/workController");

const router = express.Router();

router.get("/", getAllWorks);
router.get("/:id", getWorkById);
router.post("/", createWork);
router.put("/:id", updateWork);
router.delete("/:id", deleteWork);

module.exports = router;
