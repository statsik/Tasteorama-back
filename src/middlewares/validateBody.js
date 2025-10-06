import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
    try {
        
        const validatedData = await schema.validateAsync(req.body, {
            abortEarly: false,
        });
        req.body = validatedData;
        next();
    } catch (err) {
        next(createHttpError(400, {
            message: err.message.replace(/"/g, ''),
            errors: err.details,
        }));
    }
};
