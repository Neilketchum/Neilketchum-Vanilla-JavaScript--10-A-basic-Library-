// Book Constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructor 
function UI(){}
UI.prototype.addBookToList = function(book){
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
UI.prototype.clearFields = function(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}
UI.prototype.showAlert = function(message,className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form")
    // Insert alert
    container.insertBefore(div,form);
    setTimeout(function(){
        document.querySelector('.alert').remove()
    },3000)
}
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
        removeBookFromStore(target.parentElement.previousElementSibling.textContent);
        this.showAlert("Book Deleted ",'success')
    }
}
// Event Listners
document.querySelector('#book-form').addEventListener('submit',function(e){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector("#isbn").value;
    
    const book = new Book(title,author,isbn);
    
    // Instantiating a UI object
    const ui = new UI();
    // Add book to list
    
    // Clear Inputs
    ui.clearFields();
    if(title === "" || isbn === ""||author === "" ){
        ui.showAlert("Please fil all the fields","error");
    }else{
        ui.addBookToList(book);
        addBookToStore(book);
        ui.showAlert("Book Added:",'success')
    }
    e.preventDefault();
})
document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI()
    ui.deleteBook(e.target);    
})
function getBooksLocalStorage(){
    let books;
    if(localStorage.getItem('books') === null){
        books = []
    }else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}
function addBookToStore(book){
    books = getBooksLocalStorage();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books))
}
function removeBookFromStore(isbn){
    books =  getBooksLocalStorage()
    books.forEach(function(book,index){
        if(book.isbn === isbn){
            books.splice(index,1);
        }
    });
    localStorage.setItem('books',JSON.stringify(books));
}
document.addEventListener('DOMContentLoaded', displayBooks);
function displayBooks(){
    books = getBooksLocalStorage();
    const ui = new UI();
    books.forEach(function(book){
        ui.addBookToList(book);
    })
}