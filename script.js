const myLibrary = [];
const libraryData = document.querySelector('#library-data');

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
}

function insertBookRow(book, idx) {
  const bookRow = libraryData.insertRow();
	bookRow.dataset.indexNumber = idx;
  
  const titleCell = bookRow.insertCell(0);
  const authorCell = bookRow.insertCell(1);
  const pagesCell = bookRow.insertCell(2);
  const readCell = bookRow.insertCell(3);
	
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete-button');
	deleteButton.textContent = 'Del';
	deleteButton.addEventListener('click', (e) => {
			const parentRow = e.target.closest('tr');
			const parentRowIndex = parentRow.getAttribute('data-index-number');
			parentRow.remove();
			myLibrary.splice(parentRowIndex, 1);
	});

  titleCell.textContent = book.title;
  authorCell.textContent = book.author;
  pagesCell.textContent = book.pages;
  readCell.textContent = book.read;
	bookRow.appendChild(deleteButton);
}

// Test data
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 208, 'No');
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 336, 'No');
addBookToLibrary('Moby-Dick', 'Hermal Melville', 576, 'No');
addBookToLibrary('1984', 'George Orwell', 352, 'No');
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 384, 'No');

myLibrary.forEach((book, idx) => insertBookRow(book, idx));

const dialog = document.querySelector('dialog');
const showButton = document.querySelector('dialog + button');

showButton.addEventListener('click', () => {
	dialog.showModal();
});

const form = document.querySelector('#form');

form.addEventListener("submit", (event) => {
  event.preventDefault();

	const formData = new FormData(form);

	addBookToLibrary(formData.get('title'), formData.get('author'), formData.get('pages'), formData.get('read'));
	insertBookRow(myLibrary.at(-1), myLibrary.length-1);

	form.reset();
	dialog.close();
});