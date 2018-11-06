const authors = require('../data/authors.json')

function getAll(limit) {
    return limit ? authors.slice(0, limit) : elephants
}

module.exports = { getAll, getOne, create, update, remove }