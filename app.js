class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.returnInfo = function () {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

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

    const container = document.querySelector(".card-container");

    const div = document.createElement("div");

    div.setAttribute("id", "book-card");

    div.innerHTML = `
    <h2>${book.title}</h2>
    <h3>by ${book.author}</h3>
    <p>${book.pages}</p>
    <p>${book.read}</p>
    <a href="#" class="btn btn-delete">X</a>
    `;

    container.appendChild(div);

    // const image = document.createElement('img');
    // image.className = 'check';
    // image.src = 'checkmark.svg';

    // if (document.querySelector('#read').checked === true) {
    //   div.appendChild(image);
    // }
  }

  static deleteBook(el) {
    if (el.classList.contains("btn-delete")) {
      el.parentElement.remove();
    }
  }
  // Display alert messages
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".form-container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#read").checked = false;
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(pages) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.pages === pages) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Display Books

document.addEventListener("DOMContentLoaded", UI.displayBooks());

// Event: Add a Book

document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  // Validate
  if (title === "" || author === "" || pages === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instantiate book
    const book = new Book(title, author, pages, read);

    console.log(book);

    // Add book to UI
    UI.addBookToLibrary(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert("Book Added", "success");

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a book
document.querySelector(".card-container").addEventListener("click", (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from Store
  Store.removeBook(e.target.previousElementSibling.textContent);

  // Show success message
  UI.showAlert("Book Removed", "success");
});

// Custom error messages
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");

titleInput.addEventListener("input", () => {
  titleInput.setCustomValidity("");
  titleInput.checkValidity();
});

authorInput.addEventListener("input", () => {
  authorInput.setCustomValidity("");
  authorInput.checkValidity();
});

pagesInput.addEventListener("input", () => {
  pagesInput.setCustomValidity("");
  pagesInput.checkValidity();
});

titleInput.addEventListener("invalid", () => {
  if (titleInput.value === "") {
    titleInput.setCustomValidity("Enter the title!");
  } else {
    titleInput.setCustomValidity(
      "Titles can only contain upper and lowercase letters. Try again!"
    );
  }
});

authorInput.addEventListener("invalid", () => {
  if (authorInput.value === "") {
    authorInput.setCustomValidity("Enter the author!");
  } else {
    authorInput.setCustomValidity(
      "Authors can only contain upper and lowercase letters. Try again!"
    );
  }
});

pagesInput.addEventListener("invalid", () => {
  if (pagesInput.value === "") {
    pagesInput.setCustomValidity("Enter the title!");
  } else {
    pagesInput.setCustomValidity(
      "Pages can only contain numbers. Try again!"
    );
  }
});
