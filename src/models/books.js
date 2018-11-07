const uuid = require('uuid/v4')
const fs = require('fs')
const utils = require('../utils')


function getAll(limit) {
    const books = JSON.parse(fs.readFileSync('src/data/books.json'))
    return limit ? books.slice(0, limit) : books
}

function getOne(id) {
    const books = JSON.parse(fs.readFileSync('src/data/books.json'))
    const errors = []

    const bookWithId = books.find(book => book.id === id)

    if (!bookWithId) {
        errors.push('Book not found')
        return { errors }
    }

    return bookWithId
}

//when creating a book, only the main author can be added. Additional authors can be added in the author route
function create({ name, description, authorFirstName, authorLastName }) {
    const errors = []
    const books = JSON.parse(fs.readFileSync('src/data/books.json'))
    const authors = JSON.parse(fs.readFileSync('src/data/authors.json'))

    if (!name || name > 100) {
        errors.push('name is required or name is longer than 30 characters')
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
        newBook.authors = [authorWithId.id]
    }

    else {
        const newAuthor = {
            id: uuid(),
            firstName: authorFirstName,
            lastName: authorLastName
        }
        authors.push(newAuthor)
        newBook.authors = [newAuthor.id]

        const authorsJSON = JSON.stringify(authors, null, 4)
        fs.writeFileSync('src/data/authors.json', authorsJSON)
    }

    books.push(newBook)

    const booksJSON = JSON.stringify(books, null, 4)
    fs.writeFileSync('src/data/books.json', booksJSON)

    return newBook
}


function update(id, { name, description, borrowed }) {
    const books = JSON.parse(fs.readFileSync('src/data/books.json'))
    const errors = []

    const bookWithId = books.find(book => book.id === id)

    if (!bookWithId) {
        errors.push('Book not found')
        return { status: 404, errors }
    }

    if (!name && !description && !borrowed) {
        errors.push('Please enter updated information')
        return { status: 400, errors }
    }

    if (name && name.length <= 30) {
        bookWithId.name = name
    }

    if (description) {
        bookWithId.description = description
    }

    if (borrowed) {
        if (borrowed === "true" || borrowed === true) {
            bookWithId.borrowed = true
        }
        else if (borrowed === "false" || borrowed === false) {
            bookWithId.borrowed = false
        }
        else {
            errors.push('Please enter true or false')
            return { status: 400, errors }
        }
    }

    books.push(bookWithId)

    const booksJSON = JSON.stringify(books, null, 4)
    fs.writeFileSync('src/data/books.json', booksJSON)

    return bookWithId
}

function remove(id) {
    const books = JSON.parse(fs.readFileSync('src/data/books.json'))
    const errors = []

    const bookWithId = books.find(book => book.id === id)

    if (!bookWithId) {
        errors.push('Book not found')
        return { errors }
    }

    bookIdx = books.indexOf(bookWithId)
    books.splice(bookIdx, 1)

    const booksJSON = JSON.stringify(books, null, 4)
    fs.writeFileSync('src/data/books.json', booksJSON)

    return bookWithId
}


module.exports = { getAll, getOne, create, update, remove }