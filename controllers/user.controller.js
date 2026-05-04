const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../Util/jwt")

exports.getAllusers = async (req, res, next) => {
    try {
        const allUsers = await User.find().select("-password");
        return res.status(200).json({ Message: "All users", allUsers })
    } catch (error) {
        next(error);
    }
}

exports.register = async (req, res, next) => {
    try {
        const Checkuser = await User.findOne({ email: req.body.email });
        if (Checkuser) { return res.status(400).json({ Message: "Email already exists please use a different email or login." })}

        const password = await bcrypt.hash(req.body.password, 10);
        req.body.password = password;

        const newUser = new User(req.body);
        await newUser.save();

        newUser.password = undefined;

        const token = generateToken(newUser._id, newUser.role);

        return res.status(201).json({ Message: "User is created successfully", newUser, token });
        
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) { return res.status(401).json({ Message: "Invaild Email or password" })}

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) { return res.status(401).json({ Message: "Invaild Email or password" })}

        const token = generateToken(user._id, user.role);

        return res.status(200).json({ Message: "logedin successfully", token });

    } catch (error) {
        next(error);
    }
}