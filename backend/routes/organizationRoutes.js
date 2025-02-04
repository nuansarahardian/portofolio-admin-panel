const express = require("express");
const {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organizationController");

const router = express.Router();

router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);
router.post("/", createOrganization);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);

module.exports = router;
