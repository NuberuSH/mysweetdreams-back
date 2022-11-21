import { express } from "express";

//USUARIOS
//Login
express.router.post("/", userController.postUser());
express.router.get("/", userController.getUser());
express.router.patch("/", userController.updateUser());
express.router.delete("/", userController.deleteUser());
