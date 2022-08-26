let myLibrary = [];
const main = document.querySelector('main')
const modal = document.querySelector('.modal')
const addBtn = document.querySelector('.add-book')
const form = document.querySelector('.add-form')

addBtn.onclick = () => modal.style.display = 'block'
form.onsubmit = (e) => {
    e.preventDefault()
    const author = document.querySelector('#author').value
    const title = document.querySelector('#title').value
    const pages = document.querySelector('#pages').value
    const read = document.querySelector('#read').checked
    const book = new Book(author, title, pages, read)
    addBookToLibrary(book)
    main.innerHTML = ''
    displayBook(myLibrary)
    modal.style.display = 'none'
}

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
    books.forEach((book, index) => {
    const article = document.createElement('article')
    article.classList.add('book')
    article.setAttribute('data', index)
    for (let x in book) {
        const p = document.createElement('p')
        p.textContent = book[x]
        article.appendChild(p)
    }
    let readBtn = document.createElement('button')
    readBtn.classList.add('readBtn')
    readBtn.onclick = () => {
        if (book.read) {
            book.read = false
            readBtn.textContent = 'Not Read'
        } else {
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
        article.remove()
        myLibrary.splice(article.getAttribute('data'), 1)
    }
    article.appendChild(readBtn)
    article.appendChild(removeBtn)
    main.appendChild(article)
    });
}

let book1 = new Book('author1', 'title1', 100, true)
let book2 = new Book('author2', 'title2', 100, false)
addBookToLibrary(book1)
addBookToLibrary(book2)
displayBook(myLibrary)
