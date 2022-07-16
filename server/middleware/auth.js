const passport = require('passport');
const { ApiError } = require('./apiError');
const httpStatus = require('http-status');
const { roles } = require('../config/roles');
 
const verify = (req,res,resolve,reject,rights) => async(err,user) => {
    if(err || !user){
        return reject(new ApiError(httpStatus.UNAUTHORIZED,'Sorry , unauthorized!get out!'))
    }
    req.user = {
        _id: user._id,
        email:user.email,
        role:user.role,
        verified:user.verified
    }

    //check is the user can do or not?
    if(rights.length){
        const action = rights[0] // createAny, readAny...
        const resource = rights[1] //test...
        const permission = roles.can(req.user.role)[action](resource);
        if(!permission.granted){
            return reject(new ApiError(httpStatus.FORBIDDEN,'Sorry , you have no right to here, get out!'))
        }
        res.locals.permission = permission; //from access-control method
    }
    resolve()
}

const auth = (...rights) => async(req,res,next)=>{
    return new Promise((resolve,reject)=>{
        passport.authenticate('jwt',{ session: false }, verify(req,res,resolve,reject,rights))(req,res,next)
    })
    .then(()=> next())
    .catch((err)=> next(err))
}



module.exports = auth;