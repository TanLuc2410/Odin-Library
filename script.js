const dialog = document.querySelector("[data-modal]");
const addBtn = document.querySelector("[data-add-btn]");
const closeBtn = document.querySelector("[data-close-btn]");
const submitBtn = document.querySelector("[data-submit-btn]");
const removeBtn = document.querySelectorAll('.remove-btn');
const bookContainer = document.querySelector("[data-books-container]");


let myLibrary = [];

function Book(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
}

/////////CENTER THE MODAL
addBtn.addEventListener("click", () => { 
    const calculateAndCenterModal = () => {             // Idk why my modal isn't centered so I have to center it manually!
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const dialogWidth = dialog.offsetWidth;
        const dialogHeight = dialog.offsetHeight;

        const topPosition = (windowHeight - dialogHeight) / 2;
        const leftPosition = (windowWidth - dialogWidth) / 2;

        dialog.style.top = `${topPosition}px`;
        dialog.style.left = `${leftPosition}px`;
    }

    calculateAndCenterModal();
    requestAnimationFrame(calculateAndCenterModal);  // Recalculate on next repaint
    dialog.showModal();
});

//////////CLOSE THE MODAL BY CLICKING OUTSIDE 
dialog.addEventListener("click", e => {         
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
})

submitBtn.addEventListener("click", (event) => {
    formValidation();
    
    event.preventDefault();
    dialog.close();
})

closeBtn.addEventListener("click", () => {
    dialog.close();
})




function addBookToLibrary(title, author, status) {
    const newBook = new Book(title, author, status);
    myLibrary.push(newBook);
    displayingBooks();
}

function displayingBooks() {
    for (let i = myLibrary.length-1; i < myLibrary.length; i++) {
    //BOOK CARD
    const bookCard = document.createElement('div');
    bookContainer.appendChild(bookCard);


    //BOOK TITLE
    const bookTitle = document.createElement('p');
    bookTitle.classList.add("book-title");
    bookTitle.textContent = myLibrary[i].title;
    bookCard.appendChild(bookTitle);

    //BOOK AUTHOR
    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = myLibrary[i].author;
    bookCard.appendChild(bookAuthor);

    //BOOK STATUS
    const bookStatus = document.createElement('button');
    bookStatus.classList.add('read-btn');
    if (myLibrary[i].status === false) {
        bookStatus.innerText = 'Not Read'
    } else {
        bookStatus.innerText = 'Read'
        bookStatus.classList.add('isRead');
    }
    //TOGGLE READ BUTTON
    bookStatus.addEventListener("click", () => {
        if (!bookStatus.classList.contains('isRead')) {
            bookStatus.classList.add('isRead');
            bookStatus.innerText = 'Read'
            myLibrary[i].status = true;
        } else {
            bookStatus.classList.remove('isRead');
            bookStatus.innerText = 'Not Read'
            myLibrary[i].status = false;
        }
    })
    bookCard.appendChild(bookStatus);

    //BOOK REMOVE BUTTON
    const bookRemove = document.createElement('button');
    bookRemove.classList.add('remove-btn');
    bookRemove.textContent = 'Delete';
    bookCard.appendChild(bookRemove);
    bookRemove.addEventListener("click", () => {
        myLibrary = myLibrary.splice(i, 1);
        bookContainer.removeChild(bookCard);
    })
    }
}

function formValidation() {
    const $title = document.querySelector("[data-name]");
    const $author = document.querySelector("[data-author]");
    const $checkbox = document.querySelector("[data-checkbox]");
    const form = document.querySelector('[data-form]')

    if ($title.value === '' && $author.value === '') {
        alert('Please fill in the Name and Author of the Book!');
    } else if ($title.value === '' && $author.value !== '') {
        alert('Please fill in the Name of the Book!');
    } else if ($author.value === '' && $title.value !== '') {
        alert('Please fill in the Author of the Book!');
    }
    
    if ($title.value !== '' && $author.value !== '') {
        if ($checkbox.checked) {        
            addBookToLibrary($title.value, $author.value, true)
        } else {
            addBookToLibrary($title.value, $author.value, false)
        }
        form.reset();
    }
}

