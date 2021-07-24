const express = require('express')
const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  name: String,
  pages: Number,
  author: String
})

const Book = mongoose.model('Book', BookSchema)

try {
  mongoose.connect('mongodb+srv://admin:naseel123@mongodb.uzm1l.mongodb.net/books', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
  })
} catch (err) {
  console.error(err)
}

const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    res.send(books)
  } catch (err) {
    console.error(err)
  }
})

app.post('/books', async (req, res) => {
  try {
    const book = await Book.create({
      name: req.body.name,
      pages: req.body.pages,
      author: req.body.author
    })
    res.send(book)
  } catch (err) {
    console.error(err)
  }
})

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    res.send(book)
  } catch (err) {
    console.error(err)
  }
})

app.listen(3000, () => {
  console.log('Server started');
})