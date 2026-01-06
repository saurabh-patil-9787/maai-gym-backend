const Member = require("../models/Member");

exports.getMembers = async (req, res) => {
  const members = await Member.find();
  res.json(members);
};

exports.addMember = async (req, res) => {
  const member = await Member.create(req.body);
  res.json(member);
};
