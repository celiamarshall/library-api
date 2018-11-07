const books = require('../data/books.json')
const authors = require('../data/authors.json')
const uuid = require('uuid/v4')
const fs = require('fs')
const utils = require('../utils')

//const books = JSON.parse(fs.readFileSync('../data/books.json'))
//const authors = JSON.parse(fs.readFileSync('../data/authors.json'))

function getAll(limit) {
    return limit ? books.slice(0, limit) : books
}

function getOne(id) {
    const errors = []

    const bookWithId = books.find(book => book.id === id)

    if (!bookWithId) {
        errors.push('Book not found')
        return { errors }
    }

    return bookWithId
}

function create({ name, description, authorFirstName, authorLastName }) {
    const errors = []

    if (!name) {
        errors.push('name is required')
        return { errors }
    }

    if (!description) {
        errors.push('description is required')
        return { errors }
    }

    if (!authorFirstName || !authorLastName) {
        errors.push('author is required')
        return { errors }
    }

    const newBook = {
        id: uuid(),
        name,
        borrowed: false,
        description
    }

    const authorWithId = utils.checkForAuthor(authorFirstName, authorLastName)

    if (authorWithId) {
        newBook.authors = [ authorWithId.id ]
    }

    else {
        const newAuthor = {
            id: uuid(),
            firstName: authorFirstName,
            lastName: authorLastName
        }
        authors.push(newAuthor)
        newBook.authors = [ newAuthor.id ]
    }

    books.push(newBook)

    // const booksJSON = JSON.stringify(books)
    // fs.writeFileSync('../data/books.json', booksJSON)

    // const authorsJSON = JSON.stringify(authors)
    // fs.writeFileSync('../data/authors.json', authorsJSON)

    return newBook
}


function update(id, { name, description, borrowed }) {
    const errors404 = []
    const errors400 = []

    const bookWithId = books.find(book => book.id === id)

    if (!bookWithId) {
        errors404.push('Book not found')
        return { errors404 }
    }

    if (!name && !description && !borrowed) {
        errors400.push('Please enter updated information')
        return { errors400 }
    }

    if (name) { 
        bookWithId.name = name
    }

    if (description) {
        bookWithId.description = description
    }

    if (borrowed) {
        if (borrowed === "true") {
            bookWithId.borrowed = true
        }
        else if (borrowed === "false") {
            bookWithId.borrowed = false
        }
        else {
            errors400.push('Please enter true or false')
            return { errors400 }
        }
    }

    books.push(bookWithId)

    // const booksJSON = JSON.stringify(books)
    // fs.writeFileSync('../data/books.json', booksJSON)

    return bookWithId
}

function remove(id) {
    const errors = []

    const bookWithId = books.find(book => book.id === id)

    if (!bookWithId) {
        errors.push('Book not found')
        return { errors }
    }

    bookIdx = books.indexOf(bookWithId)
    books.splice(bookIdx, 1)

    // const booksJSON = JSON.stringify(books)
    // fs.writeFileSync('../data/books.json', booksJSON)

    return bookWithId
}


module.exports = { getAll, getOne, create, update, remove }