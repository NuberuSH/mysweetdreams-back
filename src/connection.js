"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var MONGO_URL = 'mongodb://127.0.0.1:27017/sd-bd';
var startDatabase = function () {
    mongoose_1["default"].connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            console.log("Error de conexión con la bd");
        }
        else {
            console.log("Conexión con la bd correcta");
        }
    });
    return;
};
exports["default"] = startDatabase;
