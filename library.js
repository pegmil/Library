// 1. DATA: the class and array
class Book {
    // the constructor...
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

const myLibrary = [];

// 2. DOM REFERENCES
// The DOM container
const container = document.getElementById("library-container");

// Popup Modal DOM references
const modal = document.getElementById('addBookPopup');
const openBtn = document.getElementById('add-book-btn');
const closeBtn = document.getElementById('close-modal-btn');
const bookForm = document.getElementById('book-form');

// 3. FUNCTIONS: logic and rendering

// Add a book to the library
function addBookToLibrary(title, author, pages, read) {
    const uniqueID = crypto.randomUUID();
    // take params, create a book then store it in the array
    const newBook = new Book(uniqueID, title, author, pages, read);
    myLibrary.push(newBook);
}

// Remove a book from the library
function removeBookFromLibrary(bookId) {
    const index = myLibrary.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    displayBooks();
}

// Display the books in the library
// code used for webpage interaction
function displayBooks() {

    // Clear our container first to avoid duplicating data if called again
    container.innerHTML = "";

    myLibrary.forEach((book) => {

        // Create a structural card div for each book
        const card = document.createElement('div');
        card.classList.add('book-card');

        // Generate the inner content for the card(s)
        card.innerHTML = `
        <div class="card-content">
            <div class="card-field inline-field">
                <span class="field-label">Title: </span>
                <span class="book-data book-title">${book.title}</span>
            </div>

            <div class="card-field inline-field">
                <span class="field-label">Id: </span>
                <span class="book-data book-id">${book.id}</span>
            </div>

            <div class="card-field inline-field">
                <span class="field-label">Author: </span>
                <span class="book-data book-author">${book.author}</span>
            </div>

            <div class="card-field inline-field">
                <span class="field-label">Number of Pages: </span>
                <span class="book-data book-pages">${book.pages}</span>
            </div>

            <div class="card-field inline-field">
                <span class="field-label">Status: </span>
                <span class="status-badge ${book.read ? 'read' : 'unread'}">
                    ${book.read ? 'Read' : 'Not Read Yet'}
                </span>
            </div>


            <div class="card-button">
            <button class="toggle-read-btn" data-book-id="${book.id}">${book.read ? 'Mark as Unread' : 'Mark as Read'}
            </button>

            <button class="remove-btn" data-book-id="${book.id}">Remove</button>
            </div>
        </div>
        `;

        // Put the new element inside the container
        container.appendChild(card);
    });
}

// 4. EVENT LISTENERS: everything that reacts to the user
// Open the popup when the "+Add Book" button is clicked
openBtn.addEventListener('click', () => {
    modal.showModal();
});

// Hide the modal when the cancel button is clicked
closeBtn.addEventListener('click', () => {
    bookForm.reset();
    modal.close();
});

// Close the modal if the user clicks outside the backdrop
modal.addEventListener('click', (lightDismiss) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        lightDismiss.clientX < dialogDimensions.left ||
        lightDismiss.clientX > dialogDimensions.right ||
        lightDismiss.clientY < dialogDimensions.top ||
        lightDismiss.clientY > dialogDimensions.bottom
    ) {
        bookForm.reset();
        modal.close();
    }
});

// Save form data (new book)
bookForm.addEventListener('submit', (event) => {

    // Prevent the books from reloading (default list of books)
    event.preventDefault();

    // Get user input
    const formData = new FormData(event.target);

    const bookObject = Object.fromEntries(formData.entries());
    bookObject.pages = Number(bookObject.pages);
    bookObject.read = bookObject.read === 'on'; // converts on to true
    addBookToLibrary(bookObject.title, bookObject.author, bookObject.pages, bookObject.read);
    displayBooks();
    bookForm.reset();
    modal.close();
})

// Remove the book on the card where the remove button is selected
container.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('.remove-btn');
    if (removeBtn) {
        removeBookFromLibrary(removeBtn.dataset.bookId);
    }

    const toggleBtn = event.target.closest('.toggle-read-btn');
    if (toggleBtn) {
        const book = myLibrary.find((b) => b.id === toggleBtn.dataset.bookId);
        if (book) {
            book.toggleRead();
            displayBooks();
        }
    }
});

// Display the books (used to test out the display of data initially)
//document.getElementById("show-books-btn").addEventListener("click", displayBooks);

// 5. STARTUP: runs once when the page loads
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Sense and Sensibility', 'Jane Austen', 427, false);
addBookToLibrary('The Lorax', 'Dr. Seuss', 72, true);
addBookToLibrary('Book and Dagger', 'Elyse Graham', 356, true);

// Show all books when the page loads
displayBooks();

// code used to test via console
/*
function displayBooks(libraryArray) {
   // console.log(myLibrary);
   console.log("== My Current Library ==\n");

   libraryArray.forEach((book) => {
       const bookInfo = `
       Id: ${book.id}
       Title: ${book.title}
       Author: ${book.author}
       Pages: ${book.pages}
       Status: ${book.read ? "Yes" : "Not Yet"}
       -----------------------`;
       console.log(bookInfo);
   });

}

function runTest() {
   console.log("--- STARTING TESTS ---");
   //addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
   //addBookToLibrary('Sense and Sensibility', 'Jane Austen', 427, false);
   //addBookToLibrary('The Lorax', 'Dr. Seuss', 72, true);
   displayBooks(myLibrary);
}

runTest();
*/

