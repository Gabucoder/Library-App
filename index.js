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

function Book (tittle, author, pages, read) {

    this.id = crypto.randomUUID()
    this.tittle = tittle
    this.author = author
    this.pages = pages
    this.read = read
    

}

Book.prototype.toogleReadStatus = function () {

    this.read = this.read === "read" ? "not read" : "read"
    return this.read
}


const Library = [];


function addBookToLibrary(tittle, author, pages, read) {

    const book = new Book(tittle, author, pages, read)
    
    Library.push(book)
}


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

        addBookToLibrary(bookTittle,booAuthor,bookPages,readStatus)
        displayBooks()
        
        
       
    })

})


function displayBooks() {

    output.innerHTML = "";

    Library.forEach((book) => {

        const row = document.createElement('tr')
        row.setAttribute('class', 'tr')

        for(let key of Object.keys(book)) {

            const cell = document.createElement('td')
            cell.setAttribute('class', 'td')
            cell.textContent = book[key]
            row.appendChild(cell)
            
        }
        const toggleBtn = document.createElement("button")
        toggleBtn.textContent = "Read Status"
        toggleBtn.setAttribute('class', "btn")
        toggleBtn.setAttribute('id', 'toggleBtn')

        toggleBtn.addEventListener('click', () =>{
            book.toogleReadStatus()
            row.children[4].textContent = book.read;

        })

        row.appendChild(toggleBtn)

        const delBtn = document.createElement("button")
        delBtn.textContent = "Delete"
        delBtn.setAttribute('class', 'btn')
        delBtn.setAttribute('id', 'delBtn')

        delBtn.addEventListener('click', ()=> {
            let index = Library.indexOf(book)
            Library.splice(index, 1)
            row.remove()

        })

        
        row.appendChild(delBtn)
        
        output.appendChild(row)
    })

}



