import express from 'express';
const router = express.Router();
import userControllers from '../controllers/user.controllers.js';
import authenticate from '../config/jwt.config.js';


//FIND ALL
router.get("/", authenticate, userControllers.findAll);
//FIND BY ID
router.get("/:id", authenticate, userControllers.findById);
//UPDATE BY ID
router.put("/:id", authenticate, userControllers.updateById);
//DELETE BY ID
router.delete("/:id", authenticate, userControllers.deleteById);

export default router;