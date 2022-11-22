import { express } from "express";
const router = express.router();
//USUARIOS
//Login
router.post("/add", userController.postUser());
router.get("/", userController.getUser());
router.patch("/", userController.updateUser());
router.delete("/:userID", userController.deleteUser());

export { router };
