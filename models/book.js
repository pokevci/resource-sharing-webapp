const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookTitle: { type: String, required: true },
    authorName: { type: String, required: true },
    imageURL: { type: String, required: true },
    category: { type: String, required: true },
    bookDescription: { type: String, required: true },
    bookPDFURL: { type: String, required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
