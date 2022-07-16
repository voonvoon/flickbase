const httpStatus = require('http-status');
///Middleware
const { ApiError } = require('../middleware/apiError');
/// Models
const{ User } = require('../models/user');

///Services
const userService = require('./user.service');

const createUser = async(email, password) => {
    try{
        //check the email doesn't exists
        if(await User.emailTaken(email)){
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry email already been taken!')
        }

        const user = new User({
            email,
            password
        });
        await user.save();
        return user;   
    } catch(error){
        throw error
    }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
}

const signInWithEmailAndPassword = async(email,password) =>{
    try{
        const user = await userService.findUserByEmail(email);
        if(!user){
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry Bad email!')
            //throw new Error('sorry, email does not exist');
        }

        if(!(await user.comparePassword(password))){
            //throw new Error('Hey! wrong password! insert a correct password!')
            throw new ApiError(httpStatus.BAD_REQUEST,'Hey! wrong password! insert a correct password!')
        }
        return user;
    } catch(error){
        throw error
    }
}


module.exports = {
    createUser,
    genAuthToken,
    signInWithEmailAndPassword
}

