const express = require("express");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
const {
  allUserDetails,
  updateUserDetails,
  deleteUserDetails,
} = require("../../controller/admin/adminController");
const router = express.Router();

router.get("/all-users", adminAuthMiddleware, allUserDetails);
router.put("/update-user/:id", adminAuthMiddleware, updateUserDetails);
router.delete("/delete-user/:id", adminAuthMiddleware, deleteUserDetails);

module.exports = router;
