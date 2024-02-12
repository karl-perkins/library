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

function displayBooks() {
	libraryData.innerHTML = '';

	myLibrary.forEach((book, idx) => {
		const bookRow = libraryData.insertRow();
		bookRow.dataset.indexNumber = idx;
		
		bookRow.insertCell(0).textContent = book.title;
		bookRow.insertCell(1).textContent = book.author;
		bookRow.insertCell(2).textContent = book.pages;
		bookRow.insertCell(3).textContent = book.read;
		
		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete-button');
		deleteButton.textContent = 'Del';
		deleteButton.addEventListener('click', (e) => {
				const parentRow = e.target.closest('tr');
				const parentRowIndex = parentRow.getAttribute('data-index-number');
				myLibrary.splice(parentRowIndex, 1);
				displayBooks();
		});
		bookRow.appendChild(deleteButton);
	});
}

// Test data
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 208, 'No');
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 336, 'No');
addBookToLibrary('Moby-Dick', 'Hermal Melville', 576, 'No');
addBookToLibrary('1984', 'George Orwell', 352, 'No');
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 384, 'No');

displayBooks();

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
	displayBooks();

	form.reset();
	dialog.close();
});