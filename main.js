const themeToggles = {
    light: document.getElementById("on"),
    dark: document.getElementById("off")
};
const themeToggleBtns = document.querySelectorAll(".theme-toggle");
const root = document.documentElement;
const addBookBtn = document.getElementById("add-book");
const form = document.querySelector("form");
const shadow = document.querySelector("#form-shadow");
const cancelBtn = document.getElementById("cancel");
const okBtn = document.getElementById("ok");

addBookBtn.addEventListener("click", showForm);
cancelBtn.addEventListener("click", hideForm);
// okBtn.addEventListener("click", );
themeToggleBtns.forEach(toggleBtn => toggleBtn.addEventListener("click", switchTheme));

showCorrectThemeToggle();


let myLibrary = [];

function Book(title, author, pageNumber, readBook){
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.readBook = readBook;
};

Book.prototype.getInfo = function (){
    if(this.readBook){
        return `${this.title} by ${this.author}, ${this.pageNumber} pages, book read.`;
    }else{
        return `${this.title} by ${this.author}, ${this.pageNumber} pages, book not read yet.`;
    };
}

let bookOne = new Book("Separation", "abbie", 153, true);

// let user = prompt("");
myLibrary.push(bookOne)
// console.log(myLibrary);

function addBookToLibrary(user){
    // do stuff here
}







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
};