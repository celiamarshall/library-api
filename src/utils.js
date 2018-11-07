const fs = require('fs')

function checkForAuthorId(id) {
    const authors = JSON.parse(fs.readFileSync('src/data/authors.json'))
    const errors = []
    const authorWithId = authors.find(author => author.id === id)

    if (!authorWithId) {
        errors.push('Author not found')
        return { errors }
    }
    const authorIdx = authors.indexOf(authorWithId)
    return authorIdx
}

function checkForBook(id) {
    const books = JSON.parse(fs.readFileSync('src/data/books.json'))
    const errors = []
    const bookWithId = books.find(book => book.id === id)

    if (!bookWithId) {
        errors.push('Book not found')
        return { errors }
    }

    const bookIdx = books.indexOf(bookWithId)
    return bookIdx
}

function checkForAuthor(firstName, lastName) {
    const authors = JSON.parse(fs.readFileSync('src/data/authors.json'))
    const authorsWithFirstName = authors.filter(author => author.firstName === firstName)
    const authorWithSameName = authorsWithFirstName.find(author => author.lastName === lastName)

    if (!authorWithSameName) return false

    return authorWithSameName
}

module.exports = { checkForAuthorId, checkForBook, checkForAuthor }