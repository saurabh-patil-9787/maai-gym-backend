const Gym = require("../models/Gym");

exports.createGym = async (req, res) => {
  try {
    const { name, ownerName, city } = req.body;

    if (!name || !ownerName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await Gym.findOne({ owner: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "Gym already exists" });
    }

    const gym = await Gym.create({
      name,
      ownerName,
      city,
      owner: req.user.id,
      subscriptionEnd: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
      status: "active",
    });

    res.status(201).json(gym);
  } catch (error) {
    console.error("Create gym error:", error);
    res.status(500).json({ message: "Failed to create gym" });
  }
};

exports.getMyGym = async (req, res) => {
  try {
    const gym = await Gym.findOne({ owner: req.user.id });

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    res.json(gym);
  } catch (error) {
    console.error("Get gym error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
