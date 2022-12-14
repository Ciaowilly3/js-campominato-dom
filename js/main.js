const startBtnEl = document.querySelector(".my-btn");
const difficultyEl = document.querySelector("[name='difficulty']")
let bombsVector;
let click = 0;
// dichiaro oltre a click anche stato gioco per fermare il click dopo aver preso una bomba
let statoGioco = true;

// quando clicco il bottone prendo il valore della difficoltà inserita e faccio partire la funzione gridCreate
startBtnEl.addEventListener ("click" , function(){

    // resetto stato gioco a ogni click
    statoGioco = true;

    const difficulty = difficultyEl.value;

    console.log(difficulty);

    gridCreate(parseInt(difficulty));

    // richiamo la funzione per generare il vettore bombe
    bombsVector = generateBombs(difficulty);
})

// funzione per creare la griglia
//passo il valore difficulty come numCell
function gridCreate (numCell){

    const gridContainerEl = document.querySelector(".grid-container");

    gridContainerEl.innerHTML = "";

    // Calcolo il numero di celle totali, poi le "appendo" in un ciclo, così che ognuna 
    // sia "diversa" dall'altra e possa avere interazioni proprie

    const celleTotali=Math.pow(numCell, 2);

    for (let i=0; i<celleTotali; i++){

        const cella = document.createElement("div");

        cella.style.border = `1px solid black`
        cella.style.flexBasis = 100 / numCell + "%";
        cella.style.aspectRatio = 1 / 1;

        gridContainerEl.append( cella );

        // cella.innerText= i+1;
        // al posto dell'innertext mando alla funzione onCellClick il numcella utilizzando l'html
        // cosa possibile grazie all'attributo dataset
        cella.dataset.numCell = i+1;
        cella.classList.add("d-flex");
        cella.classList.add("justify-content-center");
        cella.classList.add("align-items-center");
        cella.classList.add("cella");

        // aggiungo infine l'evento al click di ogni cella, cosa che posso fare perchè 
        // sono dentro un for e ogni cella e a sè, in cui la faccio diventare azzura e stampo
        // il suo numero a ogni click
        cella.addEventListener("click", onCellClick)
    }
}

function onCellClick(){
    if (statoGioco){
        this.classList.toggle("bg-primary");
        numCell = parseInt(this.dataset.numCell);
        // creo una variabile che sarà data dal numero di celle meno il numero di bombe, cioè il punteggio vittoria 
        let celleTotali = difficultyEl.value*difficultyEl.value;
        const pointsToWin = celleTotali - (bombsVector.length);
        if (bombsVector.includes(numCell)){
            this.classList.remove("bg-primary");
            this.classList.add("bg-danger");
            alert("Hai trovato una bomba, hai terminato la partita con un punteggio di " + click);  
            statoGioco = false;
            for (let i=0; i<celleTotali; i++){
                if (bombsVector.includes(numCell)){
                    this.classList.add("bg-danger");
                }
            }
        }else {
            click +=1
        }
        
        if(click === pointsToWin){
            alert("Complimenti hai vinto!!hai terminato la partita con un punteggio di " + click);
        }
    }else{
        alert("che cavolo clicchi se hai perso? Ricarica la pagina o premi il pulsante play!")
    }
}



// genero numero random da 1 a numCelle
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


// genero il vettore con dentro le posizioni delle bombe

function generateBombs (numCelle){
    const celleTotali = numCelle * numCelle;
    let bombsVector = [];
    while (bombsVector.length < 16){
        const position = getRandomNum(1, celleTotali);
        if (!bombsVector.includes(position)){
        bombsVector.push(position);
    }
    }
    return bombsVector;
}