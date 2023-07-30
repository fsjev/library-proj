const themeToggles = {
    light: document.getElementById("on"),
    dark: document.getElementById("off")
};
const themeToggleBtns = document.querySelectorAll(".theme-toggle");
const root = document.documentElement;
const addBookBtn = document.getElementById("add-book");
const form = document.querySelector("form");
const errorMsg = document.getElementById("error-msg");
const shadow = document.querySelector("#form-shadow");
const cancelBtn = document.getElementById("cancel");
const okBtn = document.getElementById("ok");

const gridContainer = document.querySelector("main .container");
let library = [];

showCorrectThemeToggle();

addBookBtn.addEventListener("click", showForm);
cancelBtn.addEventListener("click", hideForm);
shadow.addEventListener("click", hideForm);
okBtn.addEventListener("click", addBookToArray);

themeToggleBtns.forEach(toggleBtn => toggleBtn.addEventListener("click", switchTheme));


function Book(title, author, pageNumber, isRead){
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.isRead = isRead;
};

function createBookObject(){
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pageNumber = document.getElementById("page-number").value;
    const radioBtns = {
        yes: document.getElementById("yes"),
        no: document.getElementById("no")
    };
    let bookReadBool;

    for(let prop in radioBtns){
        if(radioBtns[prop].checked === true){
            let checked = radioBtns[prop];
            if(checked.value === "yes"){
                bookReadBool = true;
            }else{
                bookReadBool = false;
            };
            break;
        };
    };

    return new Book(title, author, Number(pageNumber), bookReadBool);
};


function addBookToArray(){
    let newBook = createBookObject();

    if(library.some((book) => book.title === newBook.title)){
        errorMsg.classList.add("show-error");
    }else{
        library.push(newBook);
        hideForm();
    }
    updateGridContainer();
}; 

function setBookCard(book){
    const card = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pageNumber = document.createElement("p");
    const bookReadBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    card.setAttribute("class", "card");
    title.setAttribute("class", "entry");
    title.setAttribute("id", "title-entry");
    author.setAttribute("class", "entry");
    author.setAttribute("id", "author-entry");
    pageNumber.setAttribute("class", "entry");
    pageNumber.setAttribute("id", "page-number-entry");
    bookReadBtn.setAttribute("id", "boolean-btn");
    bookReadBtn.setAttribute("class", "false");
    bookReadBtn.onclick = setbookReadBool;
    removeBtn.setAttribute("id", "remove-btn");
    removeBtn.onclick = removeBook;
    title.textContent = book.title;
    author.textContent = book.author;
    pageNumber.textContent = `${book.pageNumber} pages`;

    if(book.isRead){
        bookReadBtn.setAttribute("class", "true");
        bookReadBtn.textContent = "You've read this book";
    }else{
        bookReadBtn.setAttribute("class", "false");
        bookReadBtn.textContent = "You haven't read this book";
    }
    removeBtn.textContent = "Remove";


    gridContainer.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pageNumber);
    card.appendChild(bookReadBtn);
    card.appendChild(removeBtn);
};

function updateGridContainer(){
    gridContainer.innerHTML = "";
    for(let book of library){
        setBookCard(book);
    };
};

// console.log(gridContainer.dataset.indexNumber);

function setbookReadBool(e){
    let title = e.target.parentNode.firstChild.innerHTML;
    let book = library.find(book => book.title === title);
    book.isRead = book.isRead? false: true;
    updateGridContainer();
};

function switchTheme(){
    let theme = root.getAttribute("class");
    let newTheme = theme === "light"? "dark": "light";
    root.setAttribute("class", newTheme);
    showCorrectThemeToggle();
};

function showCorrectThemeToggle(){
    if(root.className === "light"){
        themeToggles.light.style.cssText = "display: none;"
        themeToggles.dark.style.cssText = "display: block;"
    }else{
        themeToggles.dark.style.cssText = "display: none;"
        themeToggles.light.style.cssText = "display: block;"
    }
};

function showForm(){
    if(form.className === "hide"){
        shadow.setAttribute("class", "show");
        form.setAttribute("class", "show");
    }else{
        shadow.setAttribute("class", "hide");
        form.setAttribute("class", "hide");
    }
};

function hideForm(){
    shadow.setAttribute("class", "hide");
    form.setAttribute("class", "hide");
    errorMsg.classList.remove("show-error");
    form.reset();
};

function removeBook(e){
    let title = e.target.parentNode.firstChild.innerHTML;
    // let book = library.find(book => book.title === title);
    library = library.filter(book => book.title !== title);
    updateGridContainer();
};
