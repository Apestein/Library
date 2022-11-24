import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyApa0C4fxHyhqFePbSMAPSqs39oywuPQow",
  authDomain: "library-16c6a.firebaseapp.com",
  projectId: "library-16c6a",
  storageBucket: "library-16c6a.appspot.com",
  messagingSenderId: "59755844753",
  appId: "1:59755844753:web:12c00d7fa0a305db835b30",
}
const app = initializeApp(firebaseConfig)

let myLibrary = []
const main = document.querySelector("main")
const modal = document.querySelector(".modal")
const addBtn = document.querySelector(".add-book")
const form = document.querySelector(".add-form")
const modalX = document.querySelector("span")
const signInButtonElement = document.querySelector("#login-btn")
const signOutButtonElement = document.querySelector("#logout-btn")
const userNameElement = document.querySelector("#user-name")
const userPicElement = document.querySelector("#profile-img")

modalX.onclick = () => (modal.style.display = "none")
addBtn.onclick = () => (modal.style.display = "block")
/* form.onsubmit = (e) => {
  e.preventDefault()
  const author = document.querySelector("#author").value
  const title = document.querySelector("#title").value
  const pages = document.querySelector("#pages").value
  const read = document.querySelector("#read").checked
  const book = new Book(author, title, pages, read)
  addBookToLibrary(book)
  displayBook(book, myLibrary.length - 1)
  modal.style.display = "none"
} */
form.onsubmit = async (e) => {
  e.preventDefault()
  try {
    modal.style.display = "none"
    await addDoc(collection(getFirestore(), "book"), {
      author: document.querySelector("#author").value,
      title: document.querySelector("#title").value,
      pages: document.querySelector("#pages").value,
      read: document.querySelector("#read").checked,
      timestamp: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error)
  }
}
signInButtonElement.onclick = async () => {
  var provider = new GoogleAuthProvider()
  await signInWithPopup(getAuth(), provider)
}

function signOutUser() {
  signOut(getAuth())
}

function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), authStateObserver)
}

function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || "/images/profile_placeholder.png"
}

function getUserName() {
  return getAuth().currentUser.displayName
}

function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl()
    var userName = getUserName()

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage =
      "url(" + addSizeToGoogleProfilePic(profilePicUrl) + ")"
    userNameElement.querySelector("#user-name").textContent = userName

    // Show user's profile and sign-out button.
    userNameElement.style.display = "block"
    userPicElement.style.display = "block"
    signOutButtonElement.style.display = "block"

    // Hide sign-in button.
    signInButtonElement.style.display = "none"
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.style.display = "none"
    userPicElement.style.display = "none"
    signOutButtonElement.style.display = "none"

    // Show sign-in button.
    signInButtonElement.style.display = "block"
  }
}
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf("googleusercontent.com") !== -1 && url.indexOf("?") === -1) {
    return url + "?sz=150"
  }
  return url
}

function Book(author, title, pages, read) {
  this.author = author
  this.title = title
  this.pages = pages
  this.read = read
}

Book.prototype.changeRead = function () {
  if (this.read) this.read = false
  else this.read = true
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

function displayBook(book, index) {
  const article = document.createElement("article")
  if (book.read) article.classList.add("read")
  article.setAttribute("data", index)
  for (const [key, value] of Object.entries(book)) {
    if (key === "read") continue
    const p = document.createElement("p")
    p.textContent = `${key}: ${value}`
    article.appendChild(p)
  }
  let readBtn = document.createElement("button")
  readBtn.classList.add("readBtn")
  readBtn.onclick = () => {
    if (book.read) {
      book.read = false
      readBtn.textContent = "Not Read"
    } else {
      book.read = true
      readBtn.textContent = "Read"
    }
  }
  if (book.read) readBtn.textContent = "Read"
  else readBtn.textContent = "Not Read"
  const removeBtn = document.createElement("button")
  removeBtn.classList.add("removeBtn")
  removeBtn.textContent = "Remove"
  removeBtn.onclick = () => {
    myLibrary.splice(article.getAttribute("data"), 1)
    main.innerHTML = ""
    displayBooks(myLibrary)
  }
  article.appendChild(readBtn)
  article.appendChild(removeBtn)
  main.appendChild(article)
}

function displayBooks(books) {
  books.forEach((book, index) => displayBook(book, index))
}

let book1 = new Book("author1", "title1", 100, true)
let book2 = new Book("author2", "title2", 100, false)
addBookToLibrary(book1)
addBookToLibrary(book2)
displayBooks(myLibrary)

initFirebaseAuth()
