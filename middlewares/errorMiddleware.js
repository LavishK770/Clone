const errorResponse = require("../utils/errorResponse");

const errorHandler=(err,req,res,next)=>{
    let er={ ...er }
    er.message=er.message


    //handle kro mongoose k error ko
    if(er.name==='castError'){
        const message='Resources not found'
        err=new errorResponse(message,404)
    }

    //duplicate key ka error
    if(er.code===11000){
        const message='Duplicate field value entered'
        err=new errorResponse(message,404)
    }

    //mongoose validation
    if(er.name==='ValidationError'){
        const message=Object.values(err.errors).map(val=>val.message) 
        error=new errorResponse(message,404)
        res.status(err.statusCode || 500).json({
            success:false,
            error:err.message || 'Server Error'
        })
    }
}

module.exports=errorHandler;