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
    }
    // displayBookCard(library);
    hideForm();
}; 

function hideForm(){
    shadow.setAttribute("class", "hide");
    form.setAttribute("class", "hide");
    errorMsg.classList.remove("show-error");
    form.reset();
};

function createCard(){
    let div = document.createElement("div");
    div.setAttribute("class", "card");
    return div;
};

function createCardInnerElements(){
    let pArray = [];

    for(let i = 0;i < 3;i++){
        let p = document.createElement("p");
        p.setAttribute("class", "entry");
        if(i === 0){
            p.setAttribute("id", "title-entry");
        }else if(i === 1){
            p.setAttribute("id", "author-entry");
        }else if(i === 2){
            p.setAttribute("id", "page-number-entry");
        }
        pArray.push(p);
    };

    let divArray = [];

    for(let i = 0;i < 2;i++){
        let div = document.createElement("button");
        if(i === 0){
            div.setAttribute("id", "boolean-btn");
            div.setAttribute("class", "false");
        }else if(i === 1){
            div.setAttribute("id", "remove-btn");
        }
        divArray.push(div);
    };
    return pArray.concat(divArray);
};

// console.log(gridContainer.dataset.indexNumber);


function displayBookCard(){
    let card = createCard();
    let elementsArray = createCardInnerElements();
    
    gridContainer.appendChild(card);
    setBookInfo(elementsArray, card);

};

function setBookInfo(array, card){
    let bookDetails = [];
    for(let elem of array){
        card.appendChild(elem);
    };
    const title = array[0];
    const author = array[1];
    const pageNumber = array[2];
    const bookReadBtn = array[3];
    bookReadBtn.onclick = setbookReadBool;
    bookReadBtnGlobal = bookReadBtn;
    const removeBtn = array[4];
    // console.log(library[0]);
    for(let book of library){

        for(let prop in book){
            bookDetails.push(book[prop]);
        };
    };

    title.textContent = bookDetails[0];
    author.textContent = bookDetails[1];
    pageNumber.textContent = bookDetails[2];
    removeBtn.textContent = "Remove";
    let bookReadBool = bookDetails[3];
    styleBookReadBtn(bookReadBtn, bookReadBool);
    // removeBtn.addEventListener("click", ); remove card function
    bookDetails = [];

};

function setbookReadBool(){
    bookReadBoolGlobal = bookReadBoolGlobal? false: true;
    console.log(bookReadBoolGlobal);
    styleBookReadBtn(bookReadBtnGlobal);
};

function styleBookReadBtn(button, bool){
    if(bool){
        button.setAttribute("class", "true");
        button.textContent = "You've read this book";
    }else{
        button.setAttribute("class", "false");
        button.textContent = "You haven't read this book";
    }
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

// Book.prototype.getInfo = function (){
//     if(this.bookHasBeenRead){
//         return `${this.title} by ${this.author}, ${this.pageNumber} pages, book read.`;
//     }else{
//         return `${this.title} by ${this.author}, ${this.pageNumber} pages, book not read yet.`;
//     };
// }
