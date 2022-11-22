import express from "express";
import userController from "../controllers/user.js";


const router = express.Router();


//USUARIOS
//Login
router.get("/", userController.getUsers);
router.get("/:userID", userController.getUserById);

router.post("/add", userController.postUser);

router.patch("/:userID", userController.updateUserById);

router.delete("/:userID", userController.deleteUser);

export default router;
