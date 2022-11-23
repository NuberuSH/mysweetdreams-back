"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var user_js_1 = __importDefault(require("../controllers/user.js"));
var router = (0, express_1.Router)();
//USUARIOS
//Login
router.get("/", user_js_1["default"].getUsers);
router.get("/:userID", user_js_1["default"].getUserById);
router.post("/add", user_js_1["default"].postUser);
router.patch("/:userID", user_js_1["default"].updateUserById);
router["delete"]("/:userID", user_js_1["default"].deleteUser);
exports["default"] = router;
