const authors = require('../data/authors.json')
const books = require('../data/books.json')
const uuid = require('uuid/v4')
const utils = require('../utils')
const fs = require('fs')

//const books = JSON.parse(fs.readFileSync('../data/books.json'))
//const authors = JSON.parse(fs.readFileSync('../data/authors.json'))


function getAll(id) {
    const response = []
    const book = utils.checkForBook(id)

    if (book.errors) {
        return { errors: book.errors }
    }

    const authorIds = book.authors

    for (authorId of authorIds) {
        const authorWithId = authors.find(author => author.id === authorId)
        if (authorWithId) {
            response.push(`${authorWithId.firstName} ${authorWithId.lastName}`)
        }
    }

    return response
}

//can create multiple authors for a book, author input is an array of objects
function create(id, authorsInput) {
    const book = utils.checkForBook(id)
    
    if (book.errors) {
        return { errors: book.errors }
    }

    book.authors = []

    for (author of authorsInput) {
        const existingAuthor = utils.checkForAuthor(author.firstName, author.lastName)
        if (existingAuthor) {
            book.authors.push(existingAuthor.id)
        }
        else {
            author.id = uuid()
            book.authors.push(author.id)
            authors.push(author)
        }
    }

    // const booksJSON = JSON.stringify(books)
    // fs.writeFileSync('../data/books.json', booksJSON)

    // const authorsJSON = JSON.stringify(authors)
    // fs.writeFileSync('../data/authors.json', authorsJSON)

    return book
}

//updating one author, author input is an object
function update(id, authorId, authorInput) {
    const book = utils.checkForBook(id)

    if (book.errors) {
        return { errors: book.errors }
    }
    const author = utils.checkForAuthorId(authorId)

    if (author.errors) {
        return { errors: author.errors }
    }

    if(authorInput.firstName) {
        author.firstName = authorInput.firstName
    }

    if(authorInput.lastName) {
        author.lastName = authorInput.lastName
    }

    authors.push(author)

    // const authorsJSON = JSON.stringify(authors)
    // fs.writeFileSync('../data/authors.json', authorsJSON)

    return author
}

function remove(id, authorId) {
    const book = utils.checkForBook(id)

    if (book.errors) {
        return { errors: book.errors }
    }
    const author = utils.checkForAuthorId(authorId)

    if (author.errors) {
        return { errors: author.errors }
    }

    authorIdx = book.authors.indexOf(author)
    book.authors.splice(authorIdx, 1)

    // const booksJSON = JSON.stringify(books)
    // fs.writeFileSync('../data/books.json', booksJSON)

    // const authorsJSON = JSON.stringify(authors)
    // fs.writeFileSync('../data/authors.json', authorsJSON)

    return book
}


module.exports = { getAll, create, update, remove }