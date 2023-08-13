import  express from "express";
import { createGig ,  getGig ,  getGigs,  getSingle ,updateGig  } from "../controllers/gig.controller.js";
import { verifyToken } from "../middlewares/jwt.js";
const router = express.Router();

router.post("/new",verifyToken, createGig);
router.get("/getAllGigs", getGig)
router.get("/:id", getSingle)
router.put("/:id",verifyToken, updateGig)
router.get("/", getGigs)





export default router;