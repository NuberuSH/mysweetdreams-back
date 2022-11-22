import express from "express";
import userController from "../controllers/user.js";


const router = express.Router();


//USUARIOS
//Login
router.get("/", userController.getUsers);
router.get("/:userID", userController.getUserById);

router.post("/add", userController.postUser);

//router.patch("/", userController.updateUser);

router.delete("/:userID", userController.deleteUser);

export default router;
