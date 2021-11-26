const tileSize = 125;

//booléen pour savoir si jeu en marche ou non
let gameIsOn = true;

//tableau avec les tuiles cachées
let hiddenTiles = [["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"]];

let divArray = []

const gridContainer = document.getElementById("gridContainer")
const lines = document.getElementsByClassName("line")
const displayCounter = document.getElementById("number")
const displayMessage = document.getElementById("displayMessage")

//variable pour compter les clics
let clickCounter = 32; 
let randomLine
let randomCase

const drawPlayground = () => {
    randomLine = Math.floor(Math.random()*8)
    randomCase = Math.floor(Math.random()*8)
    for (let i = 0; i <hiddenTiles.length; i++) {
        gridContainer.innerHTML +=`<div class="line"></div>`
        for (let j = 0; j < hiddenTiles[i].length; j++) {
            if (hiddenTiles[i] === hiddenTiles[randomLine] && hiddenTiles[j] === hiddenTiles[randomCase]) {                     
                divArray.push("<div class='boxIntruder box'>intruder</div>")
                lines[i].innerHTML += `${divArray[i*8+j]}`
            } else {
                divArray.push("<div class='box'>(⌐■_■)</div>")
                lines[i].innerHTML += `${divArray[i*8+j]}`
                }
        }
    }
}

let boxes = document.getElementsByClassName("box")

//fonction qui permet de vérifier si le jeu est terminé
const checkIfOver = (calculatedIndex, clickCounter) => {
    if (clickCounter < 1) {
        gridContainer.removeEventListener("click", clickCallBack)
        displayMessage.innerHTML += "No more clicks remaining, try again :)"
    } else if (boxes[calculatedIndex].classList.contains("boxIntruder")) {
        gridContainer.removeEventListener("click", clickCallBack)
        displayMessage.innerHTML += `You found the intruder in ${32-clickCounter} clicks, well played :)`
    }
}
//fonction qui permet de savoir si souris est positionnée dans une tuile
const checkCollision = (rectX,rectY,xMouse,yMouse) => {
    if ( xMouse>rectX && xMouse < rectX+tileSize && yMouse > rectY && yMouse < rectY+tileSize ) {
        return true;
    } else {
        return false;
    }
};

//fonction permettant de récupérer les coordonnées
var getCoordinates = (xMouse, yMouse) => {
    //récupère coordonnée y de la souris
    for (let y=0; y < hiddenTiles.length; y++) {
        //récupère coordonnée x de la souris
        for (let x=0; x < hiddenTiles[0].length; x++) {
            //appel de la fonction checkCollision pour vérifier si on clique sur une tuile
            //si on est sur une tuile, retourne les coordonnées y et x de la souris
            if(checkCollision(x*tileSize,y*tileSize, xMouse, yMouse)){
                return [y,x];
            }
        }
    }
    //si clic hors tuile, renvoie -1 pour y et x
    return[-1,-1];
};

const clickCallBack = (e) => {
    let coordinatesArray = getCoordinates(e.clientX, e.clientY)
    let calculatedIndex = coordinatesArray[0]*8+coordinatesArray[1]

    if (!boxes[calculatedIndex].classList.contains("boxFound")) {
        boxes[calculatedIndex].classList.add("boxFound")
        clickCounter--
        checkIfOver(calculatedIndex, clickCounter)
    }
    displayCounter.innerHTML = clickCounter
}

const pressedReplayButton = (event) => {
    clickCounter = 32
    displayCounter.innerHTML = clickCounter
    hiddenTiles = [["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"],
                   ["v","v","v","v","v","v","v","v"]];
    gridContainer.innerHTML =``
    drawPlayground()
    gridContainer.addEventListener("click",  clickCallBack)
    divArray = []
    displayMessage.innerHTML = ""
}

drawPlayground()
gridContainer.addEventListener("click", clickCallBack)

document.querySelector("#reloadButton").addEventListener("click", pressedReplayButton)
