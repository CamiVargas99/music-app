import express from 'express';
const router = express.Router();
import sessionControllers from '../controllers/session.controllers.js';
import authenticate from '../config/jwt.config.js';



//LOGIN
router.post("/login", sessionControllers.login);
router.post("/register", sessionControllers.register);
//LOGOUT
router.delete("/logout", sessionControllers.logout);
//SESSION
router.get("/session", authenticate, sessionControllers.session);

export default router;