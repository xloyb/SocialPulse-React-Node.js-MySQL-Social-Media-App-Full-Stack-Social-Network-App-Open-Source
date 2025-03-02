import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json("All fields are required!");
  }

  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [req.body.username], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Internal server error");
    }
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const insertUserQuery = "INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)";
    const values = [req.body.username, req.body.email, hashedPassword, req.body.name];

    db.query(insertUserQuery, values, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json("Internal server error");
      }
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json("Username and password are required!");
  }

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Internal server error");
    }
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPassword) return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);

    const { password, ...others } = data[0];
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    }).status(200).json(others);
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  }).status(200).json("User has been logged out.");
};
