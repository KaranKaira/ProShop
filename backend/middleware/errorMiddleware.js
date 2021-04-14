const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error); //? this next function calls the errorHandler below 
}

const errorHandler = (err,req,res,next)=>{
    //? err == error from above bcoz it was sent with next
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    console.log('next middleware');
    console.log(res.statusCode);

    //! msg that will show as json and not html
    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack,
        statusCode : res.statusCode
    })
}

export  {errorHandler , notFound}