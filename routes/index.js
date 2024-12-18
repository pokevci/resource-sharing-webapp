var express = require("express");
const Book = require("../models/book");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const books = await Book.find();
  // console.log(books);

  res.render("index", { books });
});

router.get('/search', async (req, res) => {
  const searchQuery = req.query.search;
  //console.log(searchQuery);

  let searchedBooks;

  // If a search query is provided, filter the books by bookTitle
  if (searchQuery) {
    searchedBooks = await Book.find({ bookTitle: { $regex: searchQuery, $options: 'i' } }); // Case-insensitive search
  } else {
    // If no search query, return an empty array
    searchedBooks = [];
  }

  res.render('search', {
    books: searchedBooks, // Use searchedBooks for rendering
    searchQuery
  });
});

router.post("/", async (req, res) => {
  try {
    const {
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      bookPDFURL,
    } = req.body;

    // Create a new book instance
    const newBook = new Book({
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      bookPDFURL,
    });

    // Save the book to the database
    await newBook.save();

    // Send a response
    res
      .status(201)
      .json({ message: "Book added successfully!", book: newBook });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add book", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    // Find the book by ID
    const book = await Book.findById(bookId);

    if (!book) {
      res.redirect("/");
      return;
    }

    // Send the found book as a response
    res.render("book", { book });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve book", error: error.message });
  }
});

module.exports = router;
