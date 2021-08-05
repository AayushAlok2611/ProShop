const notFound = (req,res,next)=>{
    const error = new Error(`Not found - ${req.originalUrl}`);//throwing a new error if trying to access an undefined
                                                                //route
    res.status(404);
    next(error);
}

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ===200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === 'production' ? null :err.stack //stack trace is visible only in development mode
    })
}

export {notFound,errorHandler};