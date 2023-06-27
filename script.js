const booksList = document.getElementById('books-list');
const form = document.getElementById("response");
const add = document.getElementById("add-book");
const cancel = document.getElementById("form-cancel")

var myLibrary = new Array();

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

form.addEventListener('submit', submitFunction);

add.addEventListener("click", addButton);

cancel.addEventListener("click", cancelButton);

booksList.addEventListener("click", removeBook)

booksList.addEventListener("click", changeReadStatus)

function addBookToLibrary(newBook){
    myLibrary.push(newBook);
}

function displayBooks(newBook){

    const book = document.createElement('li');
    book.classList.add("book");

    const bookNumber = createSpan("book-number");
    bookNumber.innerText = myLibrary.length + ".";
    book.appendChild(bookNumber);

    const bookTitle = createSpan("book-title");
    bookTitle.innerText = newBook.title;
    book.appendChild(bookTitle);

    const bookAuthor = createSpan("book-author");
    bookAuthor.innerText = newBook.author;
    book.appendChild(bookAuthor);

    const bookPages = createSpan("book-pages");
    bookPages.innerText = newBook.pages;
    book.appendChild(bookPages);

    const bookRead = createSpan("book-read");
    const readBtn = createRead();
    if(newBook.read == "Yes")
        readBtn.classList.add("read");
    else
        readBtn.classList.add("unread");
    readBtn.classList.add("readBtn");
    bookRead.appendChild(readBtn);
    bookRead.setAttribute("justify-content", "center");
    book.appendChild(bookRead);

    const bookDelete = createSpan("delete");
    const deleteBtn = createDelete();
    bookDelete.appendChild(deleteBtn);
    bookDelete.setAttribute("justify-content", "center");
    book.appendChild(bookDelete);

    booksList.appendChild(book);

    return;
}

function createDelete(){
    const deleteBtn = document.createElement("img");
    deleteBtn.src = "Images/remove.svg";
    deleteBtn.setAttribute("height", "35px");
    deleteBtn.setAttribute("width", "auto");
    deleteBtn.classList.add("deleteBtn");
    
    return deleteBtn;
}

function createRead(){
    const readBtn = document.createElement("div");
    
    return readBtn;
}

function removeBook(e){
    if(e.target.classList.contains("deleteBtn")){
        var deleteIndex = e.target.parentElement.parentElement.firstElementChild.textContent[0] - 1;

        myLibrary.pop(deleteIndex);

        booksList.removeChild(e.target.parentElement.parentElement);

        for(var j=deleteIndex; j<myLibrary.length; j++){
            booksList.children[j + 1].firstElementChild.textContent = j + 1 + ".";
        }
    }
}

function changeReadStatus(e){
    if(e.target.classList.contains("readBtn")){

        e.target.classList.toggle("read");
        e.target.classList.toggle("unread");
    }
}

function createSpan(className){
    const element = document.createElement('span');
    element.classList.add(className);
    return element;
}

function submitFunction(event){
    event.preventDefault();

    const bookTitle = document.getElementById("book-title");
    const bookAuthor = document.getElementById("book-author");
    const bookPages = document.getElementById("book-pages");
    const readStatus = document.getElementById("read-status");

    var readValue;
    if(readStatus.checked)
        readValue = "Yes";
    else
        readValue = "No";

    var addBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readValue);

    addBookToLibrary(addBook);

    displayBooks(myLibrary[myLibrary.length - 1]);

    form.classList.toggle("hidden");
    form.classList.toggle("visible");

    form.reset();
}

function cancelButton(e){
    form.classList.toggle("hidden");
    form.classList.toggle("visible");

    form.reset();
}

function addButton(e){
    form.classList.toggle("hidden");
    form.classList.toggle("visible");
}
