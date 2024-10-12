import express from "express";
import {login, registor, UserDetails} from "../Controller/authController.js"
const router = express.Router();

router.post('/login', login);
router.post('/register', registor);
router.get('/userDetail', UserDetails);

export default router; 