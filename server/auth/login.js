const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({error: 'Invalid username or password'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generating the token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({ token }); //return token
    } catch (err) {
        console.error(err);
        res.status(500).json({error: message.err});
    }
};

module.export = loginUser;