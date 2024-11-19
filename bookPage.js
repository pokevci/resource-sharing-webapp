import books from 'assets/js/books.js';

const bookDetailsContainer = document.getElementById('book-details');

// Get book ID from query parameter
const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

// Find the book in the JSON data
const book = books.find(b => b._id === bookId);

if (book) {
  // Render book details
  bookDetailsContainer.innerHTML = `
    <h1>${book.bookTitle}</h1>
    <img src="${book.imageURL}" alt="${book.bookTitle}" style="width:200px;">
    <h2>Author: ${book.authorName}</h2>
    <p><strong>Category:</strong> ${book.category}</p>
    <p>${book.bookDescription}</p>
    <a href="${book.bookPDFURL}" target="_blank">Read PDF</a>
  `;
} else {
  // Show error if book not found
  bookDetailsContainer.innerHTML = '<p>Book not found!</p>';
}
