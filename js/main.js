//setting game name
let gameName = "Guess The Word";
document.title= gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML=`${gameName} Game Created By <span> Youssef Abourehab <span>`;

//setting game options

let numberTry = 6;
let numberLetters = 4;
let currentTry = 1;
let numberOfHints = 1 ;

// manage words

let wordToGuess = '';
const words = ["book" , "ball" , "play" , "foot" , "lamp" , "edge" , "road" , "root" , "tree"];
wordToGuess= words[Math.floor(Math.random()*words.length)].toLowerCase();
let messageArea = document.querySelector(".message")
let list = document.querySelector("ul");

for (const word of words) {
    let listI = document.createElement("li");
    
    list.append(listI);
    listI.append( word);
    listI.setAttribute("value" , word) 

}
let myList = document.querySelectorAll("li")



// manage hints

const hintButton = document.querySelector(".hint");
document.querySelector('.hint span').innerHTML = numberOfHints



function generateInput (){
    const inputsContainer= document.querySelector(".inputs");
    // create try word
    for(let i = 1 ; i <= numberTry ; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`Try-${i}`);
        tryDiv.innerHTML = `<span> Try ${i} </span>`
        if(i !== 1) tryDiv.classList.add("disable-input")
        //create inputs
        for(let j = 1 ; j <= numberLetters ; j++){
            const input = document.createElement("input");
            $(input).attr({"id" :`guess-${i}-letter-${j}` ,"type":"text" ,"maxlength": "1" });
            tryDiv.appendChild(input)
            
        }

        inputsContainer.appendChild(tryDiv)
    }
    inputsContainer.children[0].children[1].focus()

    //disable all inputs except first one

    const inputsDisable = document.querySelectorAll(".disable-input input");
    inputsDisable.forEach((input)=> input.disabled =true);
    

    //navigation 

    const inputs  = document.querySelectorAll("input") ;
    $(inputs).keyup( function (e) { 

        e.target.value = e.target.value.toUpperCase();
        const nextInput = $(this).next();
        const prevInput = $(this).prev();
        if (e.key !== "Backspace" && e.key !== "ArrowLeft"){
        if (nextInput ) nextInput.focus();
        }
        else {
            if(e.key == "Backspace"){
                e.target.value = "";
                prevInput.focus();
                prevInput.value = "";
                
            }
            else{
            prevInput.focus();}
        }

    });
    
}


const guessButton =document.querySelector(".check");


guessButton.addEventListener("click" , handleGuess)

function handleGuess(){
    let successGuess = true;
    
    for(let i = 1 ; i <= numberLetters; i ++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`)
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i-1];
        //game logic
        if (letter == actualLetter) {
            inputField.classList.add("yes-inPlace")
        }
        else if (wordToGuess.includes(letter) && letter !== "" ) {
            inputField.classList.add("no-notPlace");
            successGuess=false;
        }
        else {
            inputField.classList.add("no-wrong")
            successGuess= false;
        }

    }
    
    // check if user win or lose

    if (successGuess) {
        
        messageArea.innerHTML = `You Win , The Word Is <span style ="color:green"> ${wordToGuess.toUpperCase()} </span> After ${currentTry} Try `;
        let allTries = document.querySelectorAll(".inputs > div")
        allTries.forEach((tryDiv) => tryDiv.classList.add("disable-input"))
        guessButton.disabled=true;
        hintButton.disabled = true;
        let myLi = Array.from( document.querySelectorAll("li")) ; 
        
        for (const li of myLi) {
            
            if (wordToGuess == li.getAttribute("value")){
                li.style.backgroundColor = "green"
            }
        }


    }
    else {
        document.querySelector(`.Try-${currentTry}`).classList.add("disable-input");
        let disInput =  document.querySelectorAll(`.Try-${currentTry} input`);
        disInput.forEach((input)=> input.disabled=true)
        currentTry++;
        if (currentTry <= numberTry){
        document.querySelector(`.Try-${currentTry}`).classList.remove("disable-input");
        let enInput =  document.querySelectorAll(`.Try-${currentTry} input`);
        enInput.forEach((input)=> input.disabled=false)
        
        enInput[0].focus();
        
        }
        else{
            guessButton.disabled=true;
            hintButton.disabled = true;
            messageArea.innerHTML = `You Lose , The Word Is <span> ${wordToGuess.toUpperCase()} </span> After ${currentTry - 1} Try `;
            let myLi = Array.from( document.querySelectorAll("li")) ; 
            for (const li of myLi) {
            
                if (wordToGuess == li.getAttribute("value")){
                    li.style.backgroundColor = "red"
                }
            }
        }
    }

}

// hint Button

$(hintButton).click(function () { 
    if (numberOfHints > 0) {
        numberOfHints--;
        hintButton.children[0].innerHTML = numberOfHints;
        
        hintButton.disabled = true;

        const enabledInputs = document.querySelectorAll("input:not([disabled])");
        
        const emptyEnabledInputs = Array.from(enabledInputs).filter((inputs)=> inputs.value === "");
        

        if (emptyEnabledInputs.length > 0) {
            const randomIndex = Math.floor (Math.random()* emptyEnabledInputs.length);
            
            const randomInput = emptyEnabledInputs[randomIndex]
            const indexToFill = Array.from(enabledInputs).indexOf(randomInput)
            randomInput.value = wordToGuess[indexToFill].toLocaleUpperCase();
            
        }


    }
    
});



$(document).ready(generateInput)