import express from "express";
import userController from "../controllers/user.js";


const router = express.Router();


//USUARIOS
//Login
router.post("/add", userController.postUser);
router.get("/", userController.getUser);
//router.patch("/", userController.updateUser);
router.delete("/:userID", userController.deleteUser);

export default router;
