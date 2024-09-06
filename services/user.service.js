const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const mailer = require('../config/mailer');

async function createUser(email, name, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.createUser({
            email: email,
            name: name,
            password: hashedPassword
        })                
        return user;
    } catch (error) {
        throw error;
    }
}

async function login(email, password) {
    try{        
        const user = await userModel.getOne(email);
        if (!user) {
            return res.status(401).json({ 
                status: false, 
                message: 'Invalid credentials' 
            });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            throw new Error('Invalid credentials');
        };
        
        const payloadToken = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payloadToken, secret, { expiresIn: '1h' });        

        return token;
    } catch (error) {
        throw error;
    }
}

async function resetPassword(email) {
    try {        
        const user = await userModel.getOne(email);
        if (!user) {
            throw new Error('User not found');
        };
        //send change password email
        const data = {        
            from: "no-reply@localhost",
            to: email,
            subject: `Reset Password`,
            text: `Hello ${user.name}, please click on the following link to reset your password: ${process.env.CLIENT_URL}/change-password/${user.email}`,
        }
        const response = mailer.transporter.sendMail(data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function changePassword(email, newPassword) {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await userModel.changePassword(email, hashedPassword);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,  
    login,
    resetPassword,
    changePassword
}