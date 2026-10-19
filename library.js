const myLibrary = [];

function Book(title, author, pages, read) {
    // the constructor...
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    // take params, create a book then store it in the array
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBoook);
}

function displayBooks() {
    console.log(myLibrary);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
displayBooks();