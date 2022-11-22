import { User } from '../models/user.js';

const controller = {};

const emailValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

controller.getUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
        return;
    }catch (err) {
        res.status(500);
        return;
    }
};

controller.getUserById = async (req, res) => {
    try{
        const userID = req.params.userID;
        const user = await User.findById(userID);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send("Error");
    }

}

controller.postUser = async (req, res) => {
    const newUser = new User({...req.body});

    if(!newUser.email || !newUser.password || !newUser.birthdate){
        res.status(400).send("Missing required parameters");
        return;
    }

    if (!newUser.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        res.status(400).send("Incorrect mail");
        return;
    }
    if (!newUser.password.match(emailValidator)) {
        res.status(400).send("Invalid pass");
        return;
    }

    newUser.save();
    res.status(200).send("OK");
    return;
};

controller.deleteUser = async (req, res) => {
    const userID = req.params.userID;
    try{
        await User.findByIdAndRemove(userID)
        res.status(200).send("OK");
        return;
    } catch (err) {
        res.status(500).send("Error deleting")
    }
};

controller.updateUserById = async (req, res) => {
    const filter = {
        userID : req.params.userID
    };

    const update = {
        name : req.body.name,
        email : req.body.email,
        birthdate: req.body.birthdate,              
    };

    User.findOneAndUpdate(filter, update, function(err){
        if(err){
            res.status(400).send("error");
        }else{
            res.status(200).send("OK");
        }
    });
}

export default controller;
