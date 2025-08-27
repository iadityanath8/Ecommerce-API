const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// POST
// @route /api/users/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email })
        if (userExists) {

        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (e) {
        res.status(500).json({ message: "Server error", e });
    }
}

// POST 
// api/users/login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user),
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Server error", e });
    }
}

// GET 
// @post /api/users/

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        if (users) {
            res.status(201).json(users)
        } else {
            return res.status(400).json({ message: "User Not found" })
        }
    }
    catch (e) {
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
};

// Delete
// @route /api/users/:id
const userDelete = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id)
        if (user) {
            res.status(200).json({ message: "User deleted successfully" })
        } else {
            return res.status(404).json({ message: "User Not Found" })
        }
    } catch (e) {
        console.log(e)
        res.status(404).json({ message: "Internal Server Error" })
    }
}

// DELETE MY 
// @delete /api/users/:id

const deleteMyAccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Your account has been deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error });
    }
};


// Update
// @update /api/users/me
const updateMyaccount = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            message: "Profile updated successfully"
        });
    } catch (e) {
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = { registerUser, loginUser, getUsers, deleteMyAccount, userDelete,updateMyaccount };