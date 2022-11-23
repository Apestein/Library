let myLibrary = [];
const main = document.querySelector('main')
const modal = document.querySelector('.modal')
const addBtn = document.querySelector('.add-book')
const form = document.querySelector('.add-form')
const modalX = document.querySelector('span')

modalX.onclick = () => modal.style.display = 'none'
addBtn.onclick = () => modal.style.display = 'block'
form.onsubmit = (e) => {
    e.preventDefault()
    const author = document.querySelector('#author').value
    const title = document.querySelector('#title').value
    const pages = document.querySelector('#pages').value
    const read = document.querySelector('#read').checked
    const book = new Book(author, title, pages, read)
    addBookToLibrary(book)
    displayBook(book, myLibrary.length-1)
    modal.style.display = 'none'
}

function Book(author, title, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

Book.prototype.changeRead = function() {
    if (this.read) this.read = false 
    else this.read = true
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function displayBook(book, index) {
    const article = document.createElement('article')
    if (book.read) article.classList.add('read')
    article.setAttribute('data', index)
    for (const [key, value] of Object.entries(book)) {
        if (key === 'read') continue
        const p = document.createElement('p')
        p.textContent = `${key}: ${value}`
        article.appendChild(p)
    }
    let readBtn = document.createElement('button')
    readBtn.classList.add('readBtn')
    readBtn.onclick = () => {
        if (book.read) {
            /* book.changeRead() */
            book.read = false
            readBtn.textContent = 'Not Read'
        } else {
            /* book.changeRead() */
            book.read = true
            readBtn.textContent = 'Read'
        }
    }
    if (book.read) readBtn.textContent = 'Read'
    else readBtn.textContent = 'Not Read'
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('removeBtn')
    removeBtn.textContent = 'Remove'
    removeBtn.onclick = () => {
        myLibrary.splice(article.getAttribute('data'), 1)
        main.innerHTML = ''
        displayBooks(myLibrary)
    }
    article.appendChild(readBtn)
    article.appendChild(removeBtn)
    main.appendChild(article)
}

function displayBooks(books) {
    books.forEach((book, index) => displayBook(book, index));
}

let book1 = new Book('author1', 'title1', 100, true)
let book2 = new Book('author2', 'title2', 100, false)
addBookToLibrary(book1)
addBookToLibrary(book2)
displayBooks(myLibrary)