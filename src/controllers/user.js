import { User } from '../models/user.js';

const controller = {};

controller.getUser = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
        return;
    }catch (err) {
        res.status(500);
        return;
    }
}

controller.postUser = async (req, res) => {
    const newUser = new User({...req.body});
    if (!newUser.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        res.status(400).send("Incorrect mail");
        return;
    }
    if (!newUser.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)) {
        res.status(400).send("Invalid pass");
        return;
    }

    newUser.save();
    res.status(200).send("OK");
    return;
}

controller.deleteUser = async (req, res) => {
    const userID = req.params;
    User.findByIdAndRemove(userID);
    res.status(200).send("OK");
    return
}


export default controller;