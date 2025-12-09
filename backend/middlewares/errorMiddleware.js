import dotenv from "dotenv";
dotenv.config();

const errorHandler = (err,req,res,next) => {
    const statusCode = err.statusCode || 500;

    let message;

    switch(statusCode){
        case 401:
            message = err.message || "Unauthorized";
            break;
        case 400:
            message = err.message || "Bad Request";
            break;
        case 404:
            message = err.message || "Not Found";
            break;
        case 403:
            message = err.message || "Forbidden";
            break;
        case 500:
            message = err.message || "Internal Server Error";
            break;
        default:
            message = "Something went wrong";
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
}

export default errorHandler;
