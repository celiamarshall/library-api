const express = require('express')
const router = express.Router()
const authors = require('../controllers/authors')
const books = require('../controllers/books')

router.get('/', books.getAll)
router.get('/:id', books.getOne)
router.post('/', books.create)
router.put('/:id', books.update)
router.delete('/:id', books.remove)

router.get('/:id/authors', authors.getAll)
router.post('/:id/authors', authors.create)
router.put('/:id/authors/:authorId', authors.update)
router.delete('/:id/authors/:authorId', authors.remove)

module.exports = router