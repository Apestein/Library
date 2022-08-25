let myLibrary = [];
const main = document.querySelector('main')
const modal = document.querySelector('.modal')
const addBtn = document.querySelector('.add-book')

addBtn.onclick = () => modal.style.display = 'block'

function Book(author, title, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function displayBook(books) {
    books.forEach(book => {
    const gridItem = document.createElement('article')
    gridItem.classList.add('book')
    let txt = ''
    for (let x in book) {
        txt += book[x] + ' '
    }
    gridItem.textContent = txt
    main.appendChild(gridItem)
    });
}

let book1 = new Book('author1', 'title1', 100, true)
let book2 = new Book('author2', 'title2', 100, true)
addBookToLibrary(book1)
addBookToLibrary(book2)
displayBook(myLibrary)
