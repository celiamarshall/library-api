const authors = require('./data/authors.json')
const books = require('./data/books.json')

function checkForAuthorId(id) {
    const errors = []
    const authorWithId = authors.find(author => author.id === id)

    if (!authorWithId) {
        errors.push('Author not found')
        return { errors }
    }

    return authorWithId
}

function checkForBook(id) {
    const errors = []
    const bookWithId = books.find(book => book.id === id)

    if (!bookWithId) {
        errors.push('Book not found')
        return { errors }
    }

    return bookWithId
}

function checkForAuthor(firstName, lastName) {
    const authorsWithFirstName = authors.filter(author => author.firstName === firstName)
    const authorWithSameName = authorsWithFirstName.find(author => author.lastName === lastName)

    if (!authorWithSameName) return false

    return authorWithSameName
}

module.exports = { checkForAuthorId, checkForBook, checkForAuthor }