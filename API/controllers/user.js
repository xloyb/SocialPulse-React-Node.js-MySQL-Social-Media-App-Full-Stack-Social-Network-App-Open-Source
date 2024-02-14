import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;

  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" }); // in case tneket show this
    }
    const { password, ...info } = data[0];
    return res.json(info);
  });
};
