const express = require("express");
const router = express.Router();
const User = require("../models").User;
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {validateToken} = require("../middleware/AuthMiddleware");

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const user = User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash
    });
    res.json(user);
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) res.json({ error: "User Doesn't Exist" });
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });
    const accessToken = sign({email: user.email, id: user.id}, "importantsecret")
    res.json(accessToken);
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
