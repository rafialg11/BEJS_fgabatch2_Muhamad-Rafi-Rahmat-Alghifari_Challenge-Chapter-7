const prisma = require('../config/prisma');

async function createUser(userData) {
    try{                      
        const user = await prisma.user.create({
            data: {
              email: userData.email,
              name: userData.name,
              password: userData.password
            }
          })       
        return user;
    }catch (error) {
        throw error;
    }
}
async function getOne(email) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getOne
}