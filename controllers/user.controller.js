const { user } = require('../config/prisma');
const userService = require('../services/user.service');

async function createUser(req, res) {
    try{
        const {email, name, password} = req.body;
        const createdUser = await userService.createUser(email, name, password);
        res.status(201).json({            
            message: 'User created successfully',
            data: createdUser
        });
    } catch (error) { 
        console.log(error);
        res.status(500).json({
            message: "Something went wrong, please try again"
        });
    }
}

async function login(req, res) {
    try {        
        const {email, password} = req.body; 
        if (!email || !password) {
            return res.status(400).json({
                status: false, 
                message: 'All fields are required' 
            });
        };       
        const userToken = await userService.login(email, password);
        res.status(200).json({            
            message: 'User logged in successfully',
            token: userToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong, please try again"
        });
    }
}

async function resetPassword(req, res) {
    try {
        const {email} = req.body;
        const reset = await userService.resetPassword(email);               
        res.status(200).json({
            message: 'User password reset successfully, check your email for new password',
            data: reset
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong, please try again"
        });
    }
}

module.exports = {
    createUser,
    login,
    resetPassword
}