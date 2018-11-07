const uuid = require('uuid/v4')
const utils = require('../utils')
const fs = require('fs')


function getAll(id) {
    const authors = JSON.parse(fs.readFileSync('src/data/authors.json'))
    const books = JSON.parse(fs.readFileSync('src/data/books.json'))
    const response = []
    const bookIdx = utils.checkForBook(id)

    if (bookIdx.errors) {
        return { errors: bookIdx.errors }
    }

    const book = books[bookIdx]

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
    const authors = JSON.parse(fs.readFileSync('src/data/authors.json'))
    const books = JSON.parse(fs.readFileSync('src/data/books.json'))
    
    const bookIdx = utils.checkForBook(id)
    
    if (bookIdx.errors) {
        return { errors: bookIdx.errors }
    }

    const book = books[bookIdx]

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

    const authorsJSON = JSON.stringify(authors, null, 4)
    fs.writeFileSync('src/data/authors.json', authorsJSON)

    const booksJSON = JSON.stringify(books, null, 4)
    fs.writeFileSync('src/data/books.json', booksJSON)

    return book
}

//updating one author, author input is an object
function update(id, authorId, authorInput) {
    const authors = JSON.parse(fs.readFileSync('src/data/authors.json'))
    const bookIdx = utils.checkForBook(id)

    if (bookIdx.errors) {
        return { status: 404, errors: bookIdx.errors }
    }
    const authorIdx = utils.checkForAuthorId(authorId)

    if (authorIdx.errors) {
        return { status: 404, errors: authorIdx.errors }
    }

    const author = authors[authorIdx]

    if (!authorInput) {
        return {status: 400, errors: 'Please enter updated information'}
    }

    if(authorInput.firstName) {
        author.firstName = authorInput.firstName
    }

    if(authorInput.lastName) {
        author.lastName = authorInput.lastName
    }

    const authorsJSON = JSON.stringify(authors, null, 4)
    fs.writeFileSync('src/data/authors.json', authorsJSON)

    return author
}

function remove(id, authorId) {
    const authors = JSON.parse(fs.readFileSync('src/data/authors.json'))
    const books = JSON.parse(fs.readFileSync('src/data/books.json'))
    const bookIdx = utils.checkForBook(id)

    if (bookIdx.errors) {
        return { errors: bookIdx.errors }
    }

    const authorIdx = utils.checkForAuthorId(authorId)
    
    if (authorIdx.errors) {
        return { errors: authorIdx.errors }
    }

    const book = books[bookIdx]
    const author = authors[authorIdx]

    authorBookIdx = book.authors.indexOf(author)
    book.authors.splice(authorBookIdx, 1)

    const authorsJSON = JSON.stringify(authors, null, 4)
    fs.writeFileSync('src/data/authors.json', authorsJSON)


    const booksJSON = JSON.stringify(books, null, 4)
    fs.writeFileSync('src/data/books.json', booksJSON)


    return author
}


module.exports = { getAll, create, update, remove }