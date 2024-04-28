const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const statsFilePath = path.join(__dirname, "utils", "files", "stats.json");
const usersFilePath = path.join(__dirname, "utils", "files", "users.json");
const stats = fs.readFileSync(statsFilePath, "utf-8");
const statsObj = JSON.parse(stats);
const users = fs.readFileSync(usersFilePath, "utf-8");
let usersObj = JSON.parse(users);

async function signUp(req, res) {
  const { name, email, password } = req.body;
  try {
    const existingUser = usersObj?.find((item) => item?.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = {
      name,
      email,
      password,
    };
    usersObj.push(newUser);

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = usersObj?.find(
      (item) => item?.email === email && item?.password === password
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign(
      {
        email: user?.email,
      },
      "secretkey",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      name: user?.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function changePassword(req, res) {
  const { email, newPassword } = req.body;
  try {
    usersObj = usersObj?.map((item) =>
      item?.email === email ? { ...item, password: newPassword } : item
    );
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllStats(req, res) {
  try {
    res.status(200).json(statsObj);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  signUp,
  login,
  changePassword,
  getAllStats,
};
