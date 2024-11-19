import books from './books.js';

const bookListContainer = document.getElementById('book-list');

// Render books as clickable links
books.forEach(book => {
  const bookDiv = document.createElement('div');
  bookDiv.innerHTML = `
    <a href="book.html?id=${book._id}">
      <img src="${book.imageURL}" alt="${book.bookTitle}" style="width:100px;">
      <h2>${book.bookTitle}</h2>
      <p>by ${book.authorName}</p>
    </a>
  `;
  bookListContainer.appendChild(bookDiv);
});
