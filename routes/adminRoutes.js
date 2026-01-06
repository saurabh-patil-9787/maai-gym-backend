const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const adminCtrl = require("../controllers/adminController");

router.use(adminAuth);

router.get("/gyms", adminCtrl.getAllGyms);
router.patch("/gym/:id/pay", adminCtrl.markGymPaid);
router.patch("/gym/:id/toggle", adminCtrl.toggleGymStatus);
router.get("/gym/:id/members", adminCtrl.getGymMembers);
router.get("/export/:id", adminCtrl.exportGymMembers);

module.exports = router;
