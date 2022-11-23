"use strict";
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, require: true },
    password: { type: String, require: true },
    birthdate: { type: Date, require: true },
    //role: {type: String, enum: ["user", "admin"]},
    updated: { type: Date, "default": Date.now() },
    created: { type: Date, "default": Date.now() }
});
exports.User = (0, mongoose_1.model)('users', userSchema);
