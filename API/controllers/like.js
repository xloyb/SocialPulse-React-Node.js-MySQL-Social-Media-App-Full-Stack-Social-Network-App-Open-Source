import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const getLikes = (req,res) =>{

    const q = `SELECT userId from Likes WHERE postId = ?`;


     db.query(q, [req.query.postId], (err, data) => {
       if (err) return res.status(500).json(err);
      //  console.log(data.map(like=>like.userId));
      return res.status(200).json(data.map(like=>like.userId));
      //return res.status(200).json(data);
     });
    

} 



export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.postId
    ];


    const fullQuery = q + " with parameters: " + JSON.stringify(values);
    console.log("Full Query:", fullQuery);


    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been Liked.");
    });
  });
};


export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
    

      const fullQuery = q + " with parameters: " + JSON.stringify([userInfo.id, req.query.postId]);
    console.log("Full Query:", fullQuery);

    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Like has been Deleted.");
    });
  });
};