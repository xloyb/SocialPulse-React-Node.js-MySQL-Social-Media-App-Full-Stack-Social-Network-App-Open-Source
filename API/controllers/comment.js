import { db } from "../connect.js";
import jwt from  "jsonwebtoken";
import moment from "moment";

export const getComments =(req,res) =>{

      const q = `SELECT c.*,username, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
     WHERE c.postId = ? ORDER BY c.createdAt DESC`;


      db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
     
//console.log(req.query.postId)

};



export const addComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO comments(`desc`, `createdAt`, `userId`,`postId`) VALUES (?)";
      const values = [
        req.body.desc,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.postId
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comments has been Added.");
      });
    });
  };