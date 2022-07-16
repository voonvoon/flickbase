const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError'); 

const { userService, authService, emailService } = require('../services');


const userController = {
    async profile(req,res,next){
        try{
            const user = await userService.findUserById(req.user._id) //cuz we using the auth , the auth gives us _id back.
            if(!user){
                throw new ApiError(httpStatus.NOT_FOUND,'User not found idiot!')
            }

            res.json(res.locals.permission.filter(user._doc))
        } catch(error){
            next(error) // so can funnel the error to the middleware the way we want to!
        }
    },
    async updateProfile(req,res,next) {
        try{
           const user = await userService.updateUserProfile(req)
           res.json(res.locals.permission.filter(user._doc))
        } catch(error){
            next(error) // so can funnel the error to the middleware the way we want to!
        }
    },

    async updateUserEmail(req,res,next){
        try{
            const user = await userService.updateUserEmail(req);
            const token = await authService.genAuthToken(user);

            ///later will create 
            await emailService.registerEmail(user.email, user);

            res.cookie('x-access-token',token)
            .send({
                user:res.locals.permission.filter(user._doc),
                token
            })

         } catch(error){
             next(error) 
         }
    },
    async verifyAccount(req,res,next){
        try{
            const token = userService.validateToken(req.query.validation);
            const user = await userService.findUserById(token.sub); // the id inside sub

            if(!user) throw new ApiError(httpStatus.NOT_FOUND,'User not found!')
            // if verified: true..
            if(user.verified) throw new ApiError(httpStatus.NOT_FOUND,'User already verified!');

            user.verified = true;
            user.save();
            res.status(httpStatus.CREATED).send({
                email: user.email,
                verified: true
            })

        } catch(error){
            next(error)
        }
    }
}

module.exports = userController;