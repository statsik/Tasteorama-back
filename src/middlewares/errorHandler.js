import { HttpError } from 'http-errors';

export const errorHandler = async (err, req, res, next) => {
    if (err.status === 400 && err.errors) {
        return res.status(400).json({
            status: 400,
            message: err.message,
            errors: err.errors,
        });
    }

    if (err instanceof HttpError) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
            data: err.message,
        });
    }

    res.status(500).json({
        status: 500,
        message: "Something went wrong",
        data: err.message
    });
};
