const express = require('express')
const router = express.Router()
const authors = require('../controllers/authors')
const books = require('../controllers/books')

router.get('/', books.getAll)
router.get('/:id', books.getOne)
router.post('/', books.create)
router.put('/:id', books.update)
router.delete('/:id', books.remove)

router.get('/authors', authors.getAll)
router.get('/authors/:id', authors.getOne)
router.post('/authors', authors.create)
router.put('/authors/:id', authors.update)
router.delete('authors/:id', authors.remove)

module.exports = router