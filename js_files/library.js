// const crypto = require("crypto")

function generateUUID() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    }
const myLibrary = [];

function Book(title, author, pages, read_status)
{
    if (!new.target)
    {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    // the constructor...
    // this.uuid = crypto.randomUUID();
    this.uuid = generateUUID();
    this.title = title;
    this.author = author;
    this.pages = pages ;
    this.read_status = read_status;
}

Book.prototype.change_status = function ()
{
    this.read_status = !(this.read_status);
}

function addBookToLibrary(title,author,pages,read_status)
{
    // take params, create a book then store it in the array
    let book = new Book(title,author,pages,read_status)
    myLibrary.push(book)

}

function removeBookFromLibrary(book_uuid)
{
    for (let i = 0; i < myLibrary.length; i++)
    {
        let current_book = myLibrary[i];
        if (current_book.uuid == book_uuid)
        {
            myLibrary.splice(i,1);
            return;
        }
    }
    return "Not found"
}

function change_reading_status(book_uuid)
{
    for (let i = 0; i < myLibrary.length; i++)
    {
        let current_book = myLibrary[i];
        if (current_book.uuid == book_uuid)
        {
            current_book.change_status();
            return;
        }
    }
    return "Not found"
}


function change_visiblity(form_name)
{
    if (form_name.style.display=="block")
    {
        form_name.style.display = "none";
    }
    else
    {
        form_name.style.display = "block";
    }
}

// Add book to library list
document.addEventListener("DOMContentLoaded",  ()=>{

    // display form:
    document.getElementById("Add_Book").addEventListener("click",()=>{
        const form_name = document.getElementById("book_form")
        change_visiblity(form_name);
    })


    const book_data = document.getElementById("submit");
    // check it book data is there or not
    if (!book_data) {
        console.error("Submit button not found in DOM");
        return;
    }

    book_data.addEventListener("click", ()=>{
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let statuss = document.getElementById("read_status").value;
        addBookToLibrary(title,author,pages,statuss)
        for(let i = 0;i<myLibrary.length; i++)
        {
            console.log(myLibrary[i].title);
        }
    })
})
