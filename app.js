class Book {
    constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.returnInfo = function() {
        return(`${title} by ${author}, ${pages} pages, ${read}`);
      }
    }
}

class UI {
  static displayBooks() {
    // const myLibrary = [
    //   {
    //       title: 'Poopy',
    //       author: 'John King',
    //       pages: 765,
    //       read: false
    //   },
    //   {
    //       title: 'Nice Ways',
    //       author: 'Ramona Shindig',
    //       pages: 214,
    //       read: true
    //   },
    // ];

    const books = Store.getBooks();

    // const books = myLibrary;

    books.forEach((book) => UI.addBookToLibrary(book));
  }

  static addBookToLibrary(book) {
    // const list = document.querySelector('#book-list');

    // const row = document.createElement('tr');

    // row.innerHTML = `
    //   <td>${book.title}</td>
    //   <td>${book.author}</td>
    //   <td>${book.pages}</td>
    //   <td><a href="#" class="btn btn-danger btn-sm 
    //   delete">X</a></td>
    // `;

    // list.appendChild(row);

    const container = document.querySelector('.card-container');

    const div = document.createElement('div');

    div.setAttribute('id', 'book-card');

    div.innerHTML = `
      <h2>${book.title}</h2>
      <h3>by ${book.author}</h3>
      <p>${book.pages} pages</p>
      <a href="#" class="btn btn-delete">X</a>
    `;

    container.appendChild(div);

    // const image = document.createElement('img');

    // image.src = '5a294e63b3bd25.1553178515126564837362.png';

    // document.getElementById('#book-card').appendChild(image);

  }

  static deleteBook(el) {
    if (el.classList.contains('btn-delete')) {
      el.parentElement.remove();
    }
  }
  // Display alert messages
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.form-container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks());

// Event: Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {

  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;

  // Validate
  if (title === '' || author === '' || pages === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instantiate book
    const book = new Book(title, author, pages);

    console.log(book);

    // Add book to UI
    UI.addBookToLibrary(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a book
document.querySelector('.card-container').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'danger');
})
