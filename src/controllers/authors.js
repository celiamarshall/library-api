const models = require('../models/authors')

function getAll(req, res, next) {
    const id = req.params.id
    const limit = req.query.limit
    const result = models.getAll(id)

    if (result.errors) {
        return next({ status: 400, error: { message: result.errors } })
    }

    res.json(result)
}

function create(req, res, next) {
    const id = req.params.id
    const result = models.create(id, req.body.authors)

    if (result.errors) {
        return next({ status: 400, error: { message: result.errors } })
    }

    res.status(201).json({ data: result })
}

function update(req, res, next) {
    const id = req.params.id
    const authorId = req.params.authorId
    const result = models.update(id, authorId, req.body.authors)

    if (result.errors400) {
        return next({ status: 400, error: { message: result.errors400 } })
    }

    if (result.errors404) {
        return next({ status: 404, error: { message: result.errors404 } })
    }

    res.status(201).json({ data: result })
}

function remove(req, res, next) {
    const id = req.params.id
    const authorId = req.params.authorId
    
    const result = models.remove(id, authorId)

    if (result.errors) {
        return next({ status: 400, error: { message: result.errors } })
    }

    res.status(200).json({ data: result })
}


module.exports = { getAll, create, update, remove }
