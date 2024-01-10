
const bookShelf = document.querySelector('.bookshelf');
const addBookButton = document.querySelector('.new-book');
const showMeButton = document.querySelector('.show');
const countMeButton = document.querySelector('.count');

const nameInput = document.querySelector('#book-name');
const authorInput = document.querySelector('#book-author');
const yearInput = document.querySelector('#book-year');


const myLibrary = [];
let counter = 0;

function Book(name, author, year) {
  this.name = name;
  this.author = author;
  this.year = year;
};

addBookButton.addEventListener('click', function(event) {
  event.preventDefault();
  checkInputFields();
});

countMeButton.addEventListener('click', function() {
  console.log(`mylibrary objects: ${myLibrary.length}`);
});



// FUNCTIONS

function addBookToLibrary() {
  const name = nameInput.value;
  const author = authorInput.value;
  const year = yearInput.value;

  let book = new Book(name, author, year);
  myLibrary.push(book);
  displayBook(book);
};


function displayBook(leBook) {
  const card = document.createElement("div");
  card.className = "book";
  let idCounter = counter++;
  card.dataset.number = idCounter;

  const nameGroup = document.createElement("div");
  nameGroup.className = "name-group";
  const name = document.createElement("div");
  name.className = "name";
  name.textContent = `Name:`;
  const nameAnswer = document.createElement("div");
  nameAnswer.className = "name-answer";
  nameAnswer.textContent = `"${leBook.name}"`
  nameGroup.appendChild(name);
  nameGroup.appendChild(nameAnswer);

  const authorGroup = document.createElement("div");
  authorGroup.className = "author-group";
  const author = document.createElement("div");
  author.className = "author";
  author.textContent = "Author:";
  const authorAnswer = document.createElement("div");
  authorAnswer.className = "author-answer";
  authorAnswer.textContent = `"${leBook.author}"`;
  authorGroup.appendChild(author);
  authorGroup.appendChild(authorAnswer);

  const yearGroup = document.createElement("div");
  yearGroup.className = "year-group";
  const year = document.createElement("div");
  year.className = "year";
  year.textContent = "Year:";
  const yearAnswer = document.createElement("div");
  yearAnswer.className = "year-answer";
  yearAnswer.textContent = `${leBook.year}`;
  const grouped = document.createElement('div');
  grouped.className = "grouped";

  const deleteButton = document.createElement("button");
  deleteButton.className = 'delete-button';
  deleteButton.textContent = "x";


  grouped.appendChild(yearAnswer);
  grouped.appendChild(deleteButton);
  yearGroup.appendChild(year);
  yearGroup.appendChild(grouped);


  card.appendChild(nameGroup);
  card.appendChild(authorGroup);
  card.appendChild(yearGroup);

  bookShelf.appendChild(card);


  // DELETING THE BOOK FUNCTIONALITY
  deleteButton.addEventListener('click', function() {
    if (idCounter == card.dataset.number) {
      myLibrary.splice(idCounter, 1);
      document.querySelector(`[data-number="${card.dataset.number}"]`).remove();
      console.log('ITS WORKING');
    }
    
  });

  name.addEventListener('click', function() {
    console.log(`idCounter: ${idCounter}`);
    console.log(`dataset num: ${card.dataset.number}`);
    console.log(`${idCounter == card.dataset.number}`);
    console.log(`just counter: ${counter}`);
  });
};

function clearInputFields() {
  nameInput.value = "";
  yearInput.value = "";
  authorInput.value = "";
}

function checkInputFields() {
  if (nameInput.value == "" || yearInput.value == "" || authorInput.value == "") {
    console.log("WHAT");
  } else {
    addBookToLibrary();
    clearInputFields();
  }
}