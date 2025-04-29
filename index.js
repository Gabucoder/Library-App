const booksContainer = document.querySelector(".books-container")
const output = document.querySelector(".output")
const newBookBtn = document.querySelector('#addBook')
const form = document.querySelector(".form")
const tittle = document.querySelector("#tittle")
const author = document.querySelector("#author")
const pages = document.querySelector("#pages")
const read = document.querySelector("#read")


window.onload = function () {
    form.style.display = 'none'
}

class Book {

    constructor(tittle, author, pages, read) {
        
        this.id = crypto.randomUUID()
        this.tittle = tittle
        this.author = author
        this.pages = pages 
        this.read = read
        
    }
    
    toogleReadStatus() {

        this.read = this.read === "read" ? "not read" : "read"
        return this.read
    }
}

class LibraryApp {

    constructor() {

        this.Library = [],

        this.eventHandler()
    }

    eventHandler() {

        newBookBtn.addEventListener('click', () => {

            if(form.style.display == "none") {

                form.style.display = "block"

            } else {
                form.style.display = "none"
            }
        
            form.addEventListener('submit', (event) => {
                
                event.preventDefault()
                   
                let bookTittle = tittle.value
                let booAuthor = author.value
                let bookPages = pages.value
                let readStatus = read.value
        
                tittle.value = ""
                author.value = ""
                pages.value = ""
                read.value = ""
        
                this.addBookToLibrary(bookTittle,booAuthor,bookPages,readStatus)
                this.displayBooks()
                
                
               
            })
        
        })

    }
    addBookToLibrary(tittle, author, pages, read) {

        const book = new Book(tittle, author, pages, read)
    
        this.Library.push(book)

    }

    displayBooks() {

        output.innerHTML = "";

        this.Library.forEach((book) => {

            const row = document.createElement('tr')
            row.classList.add('tr')

            const fields = ["id", "tittle", 'author', 'pages', "read"]
            fields.forEach((key)=> {
                const cell = document.createElement('td')
                cell.classList.add('td')
                cell.textContent = book[key]
                row.appendChild(cell)

            })
            
            const toggleBtn = document.createElement("button")
            toggleBtn.textContent = "Read Status"
            toggleBtn.classList.add("btn")
            toggleBtn.classList.add('toggleBtn')

            toggleBtn.addEventListener('click', () =>{

                book.toogleReadStatus()
                row.children[4].textContent = book.read;

            })

            row.appendChild(toggleBtn)

            const delBtn = document.createElement("button")
            delBtn.textContent = "Delete"
            delBtn.classList.add('btn')
            delBtn.classList.add('delBtn')

            delBtn.addEventListener('click', ()=> {

                let index = this.Library.indexOf(book)
                this.Library.splice(index, 1)
                row.remove()

            })

            
            row.appendChild(delBtn)
            
            output.appendChild(row)
        })

    }
    
}
const libraryApp = new LibraryApp()

