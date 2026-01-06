const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

/**
 * GET all members of a gym
 */
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch members" });
  }
});

/**
 * ADD member
 */
router.post("/", async (req, res) => {
  try {
    const { gymId, name, mobile, joiningDate } = req.body;

    const expiryDate = new Date(joiningDate);
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    const member = await Member.create({
      gymId,
      name,
      mobile,
      joiningDate,
      expiryDate,
    });

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to add member" });
  }
});

/**
 * MARK PAID
 */
router.patch("/:id/pay", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    const newExpiry = new Date();
    newExpiry.setMonth(newExpiry.getMonth() + 1);

    member.expiryDate = newExpiry;
    member.status = "active";
    await member.save();

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to update payment" });
  }
});

/**
 * TOGGLE ACTIVE / INACTIVE
 */
router.patch("/:id/toggle", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    member.status = member.status === "active" ? "inactive" : "active";
    await member.save();
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle status" });
  }
});

module.exports = router;
