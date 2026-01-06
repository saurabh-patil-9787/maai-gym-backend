const Gym = require("../models/Gym");
const Member = require("../models/Member");

// 1️⃣ Get all gyms
exports.getAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.find().sort({ createdAt: -1 });

    const gymsWithStats = await Promise.all(
      gyms.map(async (gym) => {
        const activeMembers = await Member.countDocuments({
          gymId: gym._id,
          status: "active",
        });

        return {
          ...gym.toObject(),
          activeMembers,
        };
      })
    );

    res.json(gymsWithStats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gyms" });
  }
};

// 2️⃣ Mark gym subscription paid (extend 30 days)
exports.markGymPaid = async (req, res) => {
  const gym = await Gym.findById(req.params.id);
  if (!gym) return res.status(404).json({ message: "Gym not found" });

  const nextDate = new Date(
    Math.max(new Date(gym.subscriptionEnd), new Date())
  );
  nextDate.setDate(nextDate.getDate() + 30);

  gym.subscriptionEnd = nextDate;
  gym.status = "active";

  await gym.save();
  res.json(gym);
};

// 3️⃣ Toggle gym active/inactive
exports.toggleGymStatus = async (req, res) => {
  const gym = await Gym.findById(req.params.id);
  if (!gym) return res.status(404).json({ message: "Gym not found" });

  gym.status = gym.status === "active" ? "inactive" : "active";
  await gym.save();

  res.json(gym);
};

// 4️⃣ Get members of a gym (for admin view)
exports.getGymMembers = async (req, res) => {
  const members = await Member.find({ gymId: req.params.id });
  res.json(members);
};

// 5️⃣ Export gym members (CSV)
exports.exportGymMembers = async (req, res) => {
  const members = await Member.find({ gymId: req.params.id });

  let csv = "Name,Mobile,Age,Status\n";
  members.forEach((m) => {
    csv += `${m.name},${m.mobile},${m.age},${m.status}\n`;
  });

  res.header("Content-Type", "text/csv");
  res.attachment("members.csv");
  res.send(csv);
};
