const express = require("express");
const router = express.Router();
const Gym = require("../models/Gym");

/**
 * GET /api/gym/me
 * Get logged-in owner's gym
 */
router.get("/me", async (req, res) => {
  try {
    // TEMP: single gym (later we’ll add auth middleware)
    const gym = await Gym.findOne();

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    res.json(gym);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/gym
 * Create gym
 */
router.post("/", async (req, res) => {
  try {
    const { name, ownerName, city, monthlyFee } = req.body;

    const gym = await Gym.create({
      name,
      ownerName,
      city,
      monthlyFee,
    });

    res.status(201).json(gym);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create gym" });
  }
});

module.exports = router;
