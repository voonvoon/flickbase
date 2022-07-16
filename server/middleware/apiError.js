const mongoose = require('mongoose');
const httpStatus = require('http-status');

//since error is build within express, so we can extend Error from express, so whatever we get from express will get it here:
class ApiError extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}


//purpose: instead use above, we want to use below:
const handleError = (err,res) => {
    const { statusCode,message } = err;
    res.status(statusCode).json({
        status:'error',
        statusCode,
        message
    })
}

const convertToApiError = (err,req,res,next) =>{
    let error = err;
    
    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST :
        httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode,message)
    }
    next(error);
}

module.exports = {
    ApiError,
    handleError,
    convertToApiError
}