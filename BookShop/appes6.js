class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        // Inseert collumns
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = '#' class = "delete">X</td>    
        `
        list.appendChild(row);
    }
    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form")
        // Insert alert
        container.insertBefore(div, form);
        setTimeout(function () {
            document.querySelector('.alert').remove()
        }, 3000)
    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove()
            this.showAlert("Book Deleted ", 'success')
        }

    }
    clearFields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }
}
// Local storage Classes
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks()
        books.forEach(function (book) {
            const ui = new UI;
            ui.addBookToList(book)
        });
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}
document.addEventListener('DOMContentLoaded', Store.displayBooks);
document.querySelector('#book-form').addEventListener('submit', function (e) {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector("#isbn").value;
    const book = new Book(title, author, isbn);

    // Instantiating a UI object
    const ui = new UI();
    // Add book to list

    // Clear Inputs
    ui.clearFields();
    if (title === "" || isbn === "" || author === "") {
        ui.showAlert("Please fil all the fields", "error");
    } else {
        ui.addBookToList(book);
        Store.addBook(book);
        ui.showAlert("Book Added:", 'success')
    }
    e.preventDefault();
})
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI()
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})
