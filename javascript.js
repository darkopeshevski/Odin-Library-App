
const bookShelf = document.querySelector('.bookshelf');
const addBookButton = document.querySelector('.new-book');
const deleteAllBooksButton = document.querySelector('.show');
const countMeButton = document.querySelector('.count');

const nameInput = document.querySelector('#book-name');
const authorInput = document.querySelector('#book-author');
const yearInput = document.querySelector('#book-year');


const myLibrary = [];
let counter = 0;

class Book {
  constructor(name, author, year) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.readStatus = false;
  }

  toogleReadStatus() {
    if (this.readStatus === false) {
      this.readStatus = true;
    }
    else {
      this.readStatus = false;
    }
  };
}

// function Book(name, author, year) {
//   this.name = name;
//   this.author = author;
//   this.year = year;
//   this.readStatus = false;

//   Book.prototype.toogleReadStatus = function() {
//     if (this.readStatus === false) {
//       this.readStatus = true;
//     }
//     else {
//       this.readStatus = false;
//     }
//   }
// };

addBookButton.addEventListener('click', function(event) {
  event.preventDefault(); // ova go sprecuva submit button da isprati info do server, a bez toa nisto d`a ne proraboti kako sto treba.
  checkInputFields();
  
});

changeInputColor(nameInput, authorInput, yearInput);

countMeButton.addEventListener('click', function() {
  console.log(`mylibrary objects: ${myLibrary.length}`);
});

deleteAllBooksButton.addEventListener('click', function() {
  myLibrary.length = 0;
  const allDivs = document.querySelectorAll('.book');
  allDivs.forEach(div => {
    div.remove();
  })
})

// FUNCTIONS

function addBookToLibrary() {
  const name = nameInput.value;
  const author = authorInput.value;
  const year = yearInput.value;

  let book = new Book(name, author, year);
  myLibrary.push(book);
  createAndDisplayBook(book); // a closure that "snapshots" whatever is in the book object.
};


function createAndDisplayBook(leBook) {
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

  const grouped = document.createElement('div');
  grouped.className = "grouped";

  const deleteButton = document.createElement("button");
  deleteButton.className = 'delete-button';
  deleteButton.textContent = "x";

  grouped.appendChild(name);
  grouped.appendChild(deleteButton);
  nameGroup.appendChild(grouped);
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

 
  const readGroup = document.createElement('div');
  readGroup.className = 'read-group';
  const read = document.createElement('div');
  read.className = "read-status";
  read.textContent = "Read:";
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.id = 'checkbox';
  checkBox.className = 'checkbox';
  checkBox.checked = leBook.readStatus;
  //tuka negde da pisam enclosure funkcija, ako se klikne na checkboksot, da se povika leBook.toogleReadStatus(), i pak checkbox.checked da se updejtira spored leBook.readstatus.
  checkBox.addEventListener('click', function() {
    leBook.toogleReadStatus();
    checkBox.checked = leBook.readStatus;
    console.log(leBook.readStatus);
  })
  readGroup.appendChild(read);
  readGroup.appendChild(checkBox);
  

  yearGroup.appendChild(year);
  yearGroup.appendChild(yearAnswer);

  card.appendChild(nameGroup);
  card.appendChild(authorGroup);
  card.appendChild(yearGroup);
  card.appendChild(readGroup);

  bookShelf.appendChild(card);

  // DELETING THE BOOK FUNCTIONALITY
  deleteButton.addEventListener('click', function() {
    if (idCounter == idCounter) {
      myLibrary.splice(idCounter, 1); //Ovde ne e okej, nikogas nema da se izbrisat tocnite 'books' od data-modelot.
      document.querySelector(`[data-number="${card.dataset.number}"]`).remove(); // se brisat samo od UI-to pravilno.
    }
  });

  name.addEventListener('click', function() {
    console.log(`idCounter: ${idCounter}`);
    console.log(`dataset num: ${card.dataset.number}`);
    console.log(`${idCounter == card.dataset.number}`);
    console.log(`just counter: ${counter}`);
    console.log(myLibrary);
    console.log(leBook.readStatus);
  });
};

function clearInputFields() {
  nameInput.value = "";
  yearInput.value = "";
  authorInput.value = "";

  nameInput.style.backgroundColor = `rgb(255, 255, 255)`;
  yearInput.style.backgroundColor = `rgb(255, 255, 255)`;
  authorInput.style.backgroundColor = `rgb(255, 255, 255)`;
  
}

// HANDLING THE "WRONG" INPUT FIELD LOGIC.
function checkInputFields() {
  const name = nameInput.value;
  const year = yearInput.value;
  const author = authorInput.value;

  if (name === "" && year === "" && author === "") {
    stylizeWrongInputs();

  } else {
    
    if (name === "" || nameInput.value === "Write the book's name!") {
      nameInput.style.backgroundColor = `rgb(255, 125, 125)`;
      nameInput.value = "Write the book's name!";
    }
    if (author === "" || authorInput.value === "Write the book's author!") {
      authorInput.style.backgroundColor = `rgb(255, 125, 125)`;
      authorInput.value = "Write the book's author!";

    }
    if (year === "" || yearInput.value === "Write the book's year!") {
      yearInput.style.backgroundColor = `rgb(255, 125, 125)`;
      yearInput.value = "Write the book's year!";

    }
    if (name && author && year)  {

      if (nameInput.value !== "Write the book's name!" && authorInput.value !== "Write the book's author!" && yearInput.value !== "Write the book's year!") {
        addBookToLibrary();
        clearInputFields();
      } 
    }
  }
};

function stylizeWrongInputs() {
    nameInput.style.backgroundColor = `rgb(255, 125, 125)`;
    yearInput.style.backgroundColor = `rgb(255, 125, 125)`;
    authorInput.style.backgroundColor = `rgb(255, 125, 125)`;

    nameInput.value = "Write the book's name!";
    yearInput.value = "Write the book's year!";
    authorInput.value = "Write the book's author!";
};

function changeInputColor(name, author, year) {
  name.addEventListener('focus', function() {
    if (name.value === "Write the book's name!") {
      name.style.backgroundColor = `rgb(255, 255, 255)`;
      name.value = "";
    }
  })

  author.addEventListener('focus', function() {
    if (author.value === "Write the book's author!") {
      author.style.backgroundColor = `rgb(255, 255, 255)`;
      author.value = "";
    }
  })

  year.addEventListener('focus', function() {
    if (year.value === "Write the book's year!") {
      year.style.backgroundColor = `rgb(255, 255, 255)`;
      year.value = "";
    }
  })
};

