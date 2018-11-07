const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('dev'))

const routes = require('./routes/library')
app.use('/books', routes)

app.use((req, res, next) => {
    next({ status: 404, error: { message: 'Not found' } })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json(err)
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)