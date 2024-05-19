const express = require("express");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const {
  allUserDetails,
  updateUserDetails,
} = require("../controller/admin/adminController");
const router = express.Router();

router.get("/all-users", adminAuthMiddleware, allUserDetails);
router.put("/update-user/:id", adminAuthMiddleware, updateUserDetails);

module.exports = router;
