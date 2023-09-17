addNote()
let personalNotes = document.querySelector(".your-notes")
personalNotes.style.display = "none"

// Adding time
const domDate = document.querySelector(".date")
setInterval(() => {
    let time = new Date().toLocaleString()
    time = time.replace(",", " |")
    domDate.innerHTML = time
}, 1000);

// Working with desktop elements

let showPersonalNotes = document.querySelector(".myhiddennotes")

let hideNote = document.querySelector(".hide-note")

showPersonalNotes.addEventListener("dblclick", () => {
    personalNotes.style.display = "block"
})

hideNote.addEventListener("click", () => {
    personalNotes.style.display = "none"
})

// Working With Refresh List
let refreshContainer = document.querySelector(".refresh-container")
let refreshList = document.querySelector(".right-click-list")
let xPosition, yPosition;

document.addEventListener("mousemove", (e) => {
    xPosition = e.clientX;
    yPosition = e.clientY;

})

refreshList.style.display = "none"

refreshContainer.addEventListener("click", (e) => {
    refreshList.style.top = yPosition + "px"
    refreshList.style.bottom = yPosition + "px"
    refreshList.style.left = xPosition + "px"
    refreshList.style.right = xPosition + "px"
    if (refreshList.style.display !== "block") {
        refreshList.style.display = "block"
    } else {
        refreshList.style.display = "none"
    }
})

let hover = document.querySelector(".hoverOnView")
let views = document.querySelector(".view-list")

hover.addEventListener("mouseover", () => {
    views.style.display = "block"
})

hover.addEventListener("mouseleave", () => {
    views.style.display = "none"
})

views.addEventListener("mouseover", ()=>{
    views.style.display = "block"
})

views.addEventListener("mouseleave", ()=>{
    views.style.display = "none"
})

let onRefresh = document.querySelector(".onRefresh")
let windows = document.querySelector("#windows")

onRefresh.addEventListener("click", () => {
    windows.style.display = "none"
    refreshList.style.display = "none"
    setTimeout(() => {
        windows.style.display = "block"
    }, 100);
})

// Working On Startup Functionality

let startup = document.querySelector('.onLoading')

setTimeout(() => {
    startup.style.opacity = "0"
}, 4000);

setTimeout(() => {
    startup.style.display = "none"
}, 5000);

// Working on notes

let form = document.getElementById("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let noteData = document.querySelector("#note")
    let noteTitle = document.querySelector("#note-title")
    let gotError = document.getElementById("gotError")

    let myNotes = localStorage.getItem("notes")
    let myObj;
    if (myNotes == null) {
        myObj = []
    } else {
        myObj = JSON.parse(myNotes)
    }

    let noteWithTitle = {
        note: noteData.value,
        title: noteTitle.value
    }
    if(noteData.value.length >= 2 && noteTitle.value.length >= 2){
        myObj.push(noteWithTitle)
        noteData.value = ""
        noteTitle.value = ""
        gotError.style.display = "none"
    }else{
        gotError.style.display = "block"
    }
    

    localStorage.setItem("notes", JSON.stringify(myObj))
    
    addNote()
})

function addNote(){
    let myNotes = localStorage.getItem("notes")
    let myObj;
    if (myNotes == null) {
        myObj = []
    } else {
        myObj = JSON.parse(myNotes)
    }
    let html = ``
    myObj.forEach((element, index) => {
        html+= `<div class= "card">
                  <h2>${element.title}</h2>
                   <p>${element.note}</p>
                 <button class="deleteNote" id="${index}" onclick=deleteNote(this.id)>Delete Note ${index + 1}</button>
             </div>`
    });
    let cards = document.querySelector(".cards")
    cards.innerHTML = html
}

function deleteNote(myid){
    let myNotes = localStorage.getItem("notes")
    let myObj;
    if (myNotes == null) {
        myObj = []
    } else {
        myObj = JSON.parse(myNotes)
    }
    myObj.splice(myid, 1)
    localStorage.setItem("notes", JSON.stringify(myObj))
    addNote()
}

// Adding Styles by views list

let viewsList = Array.from(document.getElementsByClassName("view-list"))
let desktopIcons = Array.from(document.getElementsByClassName("desktop-icon"))
viewsList.forEach((element, index)=>{
    element.addEventListener("click", (e)=>{
      let currentid = e.target.id
      if(currentid == 1){
        desktopIcons.forEach((elem)=>{
            elem.style.width = "110px"
            elem.style.height = "110px"
        })
      }else if(currentid == 2){
        desktopIcons.forEach((elem)=>{
            elem.style.width = "80px"
            elem.style.height = "80px"
        })
      }else if(currentid == 3){
        desktopIcons.forEach((elem)=>{
            elem.style.width = "50px"
            elem.style.height = "50px"
        })
      }else if(currentid == 4){
        desktopIcons.forEach((elem)=>{
            elem.style.width = "35px"
            elem.style.height = "35px"
        })
      }
    })

})

// Working on my pc

let hiddenpc = document.querySelector(".myhiddencomputer")
let mycomputer = document.querySelector(".my-computers")
let hidecomputer = document.querySelector(".hide-computer")

mycomputer.style.display = "none"
hiddenpc.addEventListener("dblclick", ()=>{
    if(mycomputer.style.display == "none"){
        mycomputer.style.display = "block"
    }
})

hidecomputer.addEventListener("click", ()=>{
    if(mycomputer.style.display !== "none"){
        mycomputer.style.display = "none"
    }
})

// Implementing The Dragable Functionality

let yourNotesContainer = document.querySelector(".your-notes-container")
let yourNotes = document.querySelector(".dragup")

function ondrag({movementX, movementY}){
    let getStyle = window.getComputedStyle(yourNotesContainer)
    let left = parseInt(getStyle.left)
    let top = parseInt(getStyle.top)
    yourNotesContainer.style.left = `${left + movementX}px`
    yourNotesContainer.style.top = `${top + movementY}px`
    console.log(movementX, movementY)
}
yourNotes.addEventListener("mousedown", ()=>{
    yourNotes.addEventListener("mousemove", ondrag)
    yourNotes.style.cursor = "pointer"
})
document.addEventListener("mouseup", ()=>{
    yourNotes.removeEventListener("mousemove", ondrag)
    yourNotes.style.cursor = "default"
})

