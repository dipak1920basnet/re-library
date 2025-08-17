// const crypto = require("crypto")
// Function to generate a UUID using Web Crypto API and custom format
function generateUUID() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    }

// Array to store all book objects
const myLibrary = [];

// Book constructor function
function Book(title, author, pages, read_status)
{
    // Ensure constructor is called with 'new'
    if (!new.target)
    {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    // the constructor...
    // this.uuid = crypto.randomUUID();

    // Generate unique ID for the book
    this.uuid = generateUUID();

    // Assign book data
    this.title = title;
    this.author = author;
    this.pages = pages ;

    // Normalize read_status input: convert string "read" to boolean true
    if (read_status == "read")
    {
        read_status = true;
    }
    else
    {
        read_status = false;
    }
    this.read_status = read_status;
}

// Method to toggle read status of a book (true ↔ false)
Book.prototype.change_status = function ()
{
    this.read_status = !(this.read_status);
}

// Create and add a new book to the library array
function addBookToLibrary(title,author,pages,read_status)
{
    // take params, create a book then store it in the array
    let book = new Book(title,author,pages,read_status)
    myLibrary.push(book)

}

// Perform 'toggle' or 'remove' action on a book based on its UUID
function change_remove_action(action, book_uuid)
{
    for (let i = 0; i < myLibrary.length; i++)
    {
        let current_book = myLibrary[i];

        // Find book with matching UUID
        if (current_book.uuid === book_uuid)
        {
            switch(action)
            {
                case "toggle":
                    // Change read status
                    current_book.change_status();
                    return current_book;
                case "remove":
                    // Remove book from library array
                    myLibrary.splice(i,1);
                    return null;
                default:
                    // Invalid action
                    return "Undefined action"; 
            }
        }
    }
    // UUID not found in library
    return "Not found"
}

// Show or hide an HTML element based on current display style
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

// Create a DOM template (card) for a book
function book_template(title,author,pages,read_status, uuid)
{
    let template = document.createElement('div');
    template.setAttribute("id",uuid);
    template.setAttribute("class","book_template")
    // Set inner HTML of the book card
    template.innerHTML = `
        <h2>Title: ${title}</h2>
        <h4>ID: ${uuid}</h4>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Pages:</strong> ${pages}</p>
        <p class="book_status"><strong>Status:</strong> ${read_status}</p>
        <button class="toggle_status" data-uuid="${uuid}">
            Toggle Status
        </button>
        <button class="remove_book" data-uuid="${uuid}">
            Remove Book
        </button>
    `;

    // Attach toggle status event listener to toggle button
    let toogleButton = template.querySelector(".toggle_status");
    toogleButton.addEventListener("click", ()=>
    {
        let uuid_value = toogleButton.dataset.uuid;
        
        // Perform toggle action and update DOM
        const updatedbook = change_remove_action("toggle",uuid_value);

        if (updatedbook)
        {
            const card = document.getElementById(uuid_value);
            const statusElem = card.querySelector(".book_status");
            if (statusElem)
            {
                // Update status text in card
                statusElem.innerHTML = `<strong>Status:</strong> ${updatedbook.read_status}`;
            }
        }
        
    })

    // Attach remove event listener to remove button
    let removeButton = template.querySelector(".remove_book");
    removeButton.addEventListener("click",()=>
    {
        let uuid_value = removeButton.dataset.uuid;

        // Remove card from DOM
        const remove_ = document.getElementById(uuid)
        if (remove_)
        {
            remove_.remove();
        }

        // Remove book from library array
        change_remove_action("remove",uuid_value);
    })

    // Return fully constructed book DOM element
    return template;
}

// Add book to library list and 
// Main: run after DOM is fully loaded
document.addEventListener("DOMContentLoaded",  ()=>{

    // display form:
    // Toggle visibility of form when "Add Book" button is clicked
    document.getElementById("Add_Book").addEventListener("click",()=>{
        const form_name = document.getElementById("book_form")
        change_visiblity(form_name);
    })

    // Get reference to submit button
    const book_data = document.getElementById("submit");
    
    // check it book data is there or not
    // Check if submit button exists in DOM
    if (!book_data) {
        console.error("Submit button not found in DOM");
        return;
    }

    // Handle click event on submit button
    book_data.addEventListener("click", ()=>{

        // Read input values from form fields
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let statuss = document.getElementById("read_status").value;
        
        // Create book and add to library array
        addBookToLibrary(title,author,pages,statuss)
        
        const library_show = document.querySelector(".main_library")
        
         // Only render the newly added book (last one in array)
        for(let i=0; i<myLibrary.length; i++)
        {
            if (i == myLibrary.length-1)
            {
                let book_ = myLibrary[i]

                 // Create book card and add to library container
                let template = book_template(book_.title, book_.author, book_.pages, book_.read_status, book_.uuid);
                library_show.append(template)
                break;
            }
            
        }
    })
})