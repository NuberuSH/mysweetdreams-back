import { Request, Response } from 'express';
import { User } from '../models/user.js';

const controller: any = {}; //He puesto any porque si no me decia que "getUsers property does not exist on type {}"

const emailValidator: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passValidator: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

controller.getUsers = async (req: Request, res: Response): Promise<void> => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
        return;
    }catch (err) {
        res.status(500);
        return;
    }
};

controller.getUserById = async (req: Request, res: Response): Promise<void> => {
    try{
        const userID = req.params.userID;
        const user = await User.findById(userID);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send("Error");
    }

}

controller.postUser = async (req: Request, res: Response): Promise<void> => {
    const newUser = new User({...req.body});

    if(!newUser.email || !newUser.password || !newUser.birthdate){
        res.status(400).send("Missing required parameters");
        return;
    }

    if (!newUser.email.match(emailValidator)) {
        res.status(400).send("Incorrect mail");
        return;
    }
    if (!newUser.password.match(passValidator)) {
        res.status(400).send("Invalid pass");
        return;
    }

    newUser.save();
    res.status(200).send("OK");
    return;
};

controller.deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userID = req.params.userID;
    try{
        await User.findByIdAndRemove(userID)
        res.status(200).send("OK");
        return;
    } catch (err) {
        res.status(500).send("Error deleting")
    }
};

controller.updateUserById = async (req: Request, res: Response): Promise<void> => {
    const filter = {
        userID : req.params.userID
    };

    const update = {
        name : req.body.name,
        email : req.body.email,
        birthdate: new Date(req.body.birthdate),              
    };

    User.findOneAndUpdate(filter, update, function(err: Error){
        if(err){
            res.status(400).send("error");
        }else{
            res.status(200).send("OK");
        }
    });
}

export default controller;
