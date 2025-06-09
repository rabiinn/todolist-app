import logger from "./logger.js";


const requestLogger = (req, res, next) => {
    logger.info('Method', req.method);
    logger.info('body', req.body);
    next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}
const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }

    else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'expected `username` to be unique' })
    }
    next(err)
}

export default { errorHandler, requestLogger, unknownEndpoint}