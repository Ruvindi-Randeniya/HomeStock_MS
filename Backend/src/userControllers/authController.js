const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../userModels/userModel");

const register = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Empty JSON body received" });
        }

        const { firstname, lastname, username, password, role } = req.body;

        if (!firstname || !lastname || !username || !password || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Ensure firstname & lastname contain only letters
        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
            return res.status(400).json({ message: "Firstname and Lastname must contain only letters" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }


         // Ensure password is at least 6 characters
         if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Validate role
        const validRoles = ["admin", "HouseholdOwner", "user"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role selected" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, lastname, username, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: `User registered with username ${username}` });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: `User with username ${username} not found` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, username, password, role } = req.body; // ✅ Added 'role' here

        if (!firstname && !lastname && !username && !password && !role) {
            return res.status(400).json({ message: "At least one field is required for update" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const nameRegex = /^[A-Za-z]+$/;

        // Validate firstname & lastname if provided
        if (firstname && !nameRegex.test(firstname)) {
            return res.status(400).json({ message: "Firstname must contain only letters" });
        }
        if (lastname && !nameRegex.test(lastname)) {
            return res.status(400).json({ message: "Lastname must contain only letters" });
        }

        // Check if the username already exists (if updating username)
        if (username && username !== user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: "Username already taken" });
            }
            user.username = username;
        }

        // Ensure password is at least 6 characters if updating
        if (password && password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Validate role if provided
        const validRoles = ["admin", "HouseholdOwner", "user"];
        if (role && !validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role selected" });
        }

        // ✅ Update fields only if they are provided
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (role) user.role = role;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.status(200).json({ message: "User updated successfully", user });

    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};



module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
};
