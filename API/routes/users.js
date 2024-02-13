import express from "express";
import { getUser } from "../controllers/user.js";

const router=express.Router();

router.get("/find/:userID",getUser)

export default router;