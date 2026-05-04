exports.valid = (schema) => {
    try {
        return (req, res, next) => {
            const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true })
            if (error) {
                return next(error)
            }
            next()
        }
    } catch (error) {
        next(error);
    }
}