import { User } from './models/user.js';

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
        res.status(400);
        return;
    }
    if (!newUser.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)) {
        res.status(400);
        return;
    }

    post(newUser);
    res.status(200).json(get());    //Carefull, Im returning all the users from de database for test
    return;
}

controller.deleteUser = async (req, res) => {
    const userID = req.params();
    destroy(userID);

}


// ------------------- FUNCTIONS WITH THE DATABASE ---------------------------



async function post(newUser) {
    return newUser.save();
};

async function destroy(userID) {
    return User.findByIdAndRemove(userID);
};

async function patch() {

};
