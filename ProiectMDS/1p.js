const mesaj = document.querySelector ('.game--status');

let jocActiv = true;

let tablaJoc = ["", "", "", "", "", "", "", "", ""];

const url = window.location.search;

const parametri = new URLSearchParams(url);

const numeJucator = parametri.get('fname');

const numeAI = "Roboțel";

let jucator = parametri.get('x/0');

if (jucator == "0")
    jucator = "O";

if (jucator == "x")
    jucator = "X";

let jucatorCurent = jucator;

let dificultateIntrodusa = parametri.get('dif');

var dificultate;

let nume = numeJucator;

var AI;

if (jucator == "X")
    AI = "O";
else
    AI = "X";

if (dificultateIntrodusa == "normal")
    dificultate = 5;
else
    dificultate = 9;

mesaj.innerHTML = `Este rândul lui ${nume} (${jucatorCurent})`;


// daca mai sunt casute libere
function suntMutariRamase (tabla) 
{

    for (let i = 0; i < 9; i++)
    {
    
        if (tablaJoc[i] == "")
        {
        
            return true;
            
        }
            
    }
    
    return false;
    
}

// functia de evaluare
function evaluare (tabla, j) 
{

    let rundaCastigata = esteJocCastigat(tabla);
    
    if (!rundaCastigata)
    {
    
        return 0;
        
    }
    
    if (j == jucator)
    {
    
        return -10;
        
    }
    
    return 10;
    
}

function minimax (tabla, numarMiscare, esteMax, j) 
{

    let scor = evaluare (tabla, j);
    let optim = 0;
    
    if (scor == 10)
    {
    
        return scor - numarMiscare;
        
    }

    if (scor == -10)
    {
    
        return scor + numarMiscare;
        
    }

    if (suntMutariRamase (tabla) == false)
    {
    
        return 0;
        
    }    
        
    if (numarMiscare == dificultate)
    {
    
        return scor;
        
    }

    if (esteMax) 
    {
    
        optim = -1000;
        
        for (let i = 0; i < 9; i++) 
        {
        
            if (tabla[i] == "") 
            {
            
                tabla[i] = jucator;
                optim = Math.max(optim, minimax(tabla, numarMiscare + 1, !esteMax, jucator));
                tabla[i] = "";
                
            }
            
        }
        
    }
    
    else 
    {
    
        optim = 1000;
        
        for (let i = 0; i < 9; i++) 
        {
        
            if (tabla[i] == "") 
            {
            
                tabla[i] = AI;
                optim = Math.min(optim, minimax(tabla, numarMiscare + 1, !esteMax, AI));
                tabla[i] = "";
                
            }
            
        }
        
    }
    return optim;
}

function cautareMiscareOptima (tabla) 
{

    let valoareOptima = -1000;
    let index = -1;
    for (let i = 0; i < 9; i++) 
    {
    
        if (tabla[i] == "") 
        {
        
            tabla[i] = jucatorCurent;
            let valoareMutare = minimax (tabla, 0, true, jucatorCurent);
            tabla[i] = "";
            if (valoareMutare > valoareOptima) 
            {
            
                valoareOptima = valoareMutare;
                index = i;
                
            }
            
        }
        
    }

    return index;
    
}

function casutaBot (index) 
{

    tablaJoc[index] = jucatorCurent;
    let atribut = `[data-cell-index='${index}']`;
    document.querySelector(atribut).innerHTML = jucatorCurent;
    
}

function apasareCasuta (casutaApasata, indexCasutaApasata) 
{

    tablaJoc[indexCasutaApasata] = jucatorCurent;
    casutaApasata.innerHTML = jucatorCurent;
    
}

function schimbareJucator () 
{

    if (jucatorCurent == jucator)
    {
    
        jucatorCurent = AI;
        nume = numeAI;

    }
    
    else
    {
    
        jucatorCurent = jucator;
        nume = numeJucator;

    }
    
    mesaj.innerHTML = `Este rândul lui ${nume} (${jucatorCurent})`;

    if (jucatorCurent == AI) 
    {
    
        let tabla = tablaJoc;
        casutaApasata = cautareMiscareOptima(tabla);
        casutaBot(casutaApasata);
        validareTura ();
        
    }
    
}

function esteJocCastigat (tabla) 
{

    let jocCastigat = false;
    
    if (tabla[0] == tabla[1] && tabla[1] == tabla[2] && tabla[2] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tabla[0] == tabla[3] && tabla[3] == tabla[6] && tabla[6] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tabla[0] == tabla[4] && tabla[4] == tabla[8] && tabla[8] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tabla[1] == tabla[4] && tabla[4] == tabla[7] && tabla[7] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tabla[2] == tabla[4] && tabla[4] == tabla[6] && tabla[6] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tabla[2] == tabla[5] && tabla[5] == tabla[8] && tabla[8] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tabla[3] == tabla[4] && tabla[4] == tabla[5] && tabla[5] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tabla[6] == tabla[7] && tabla[7] == tabla[8] && tabla[8] != "")
    {
    
        jocCastigat = true;
        
    }
        
    return jocCastigat;
    
}

function validareTura () 
{

    let jocCastigat = esteJocCastigat (tablaJoc, jucatorCurent);
    
    if (jocCastigat) 
    {
    
        mesaj.innerHTML = `Jucătorul ${nume} a câștigat!`;
        jocActiv = false;
        return;
        
    }

    if (!tablaJoc.includes("")) 
    {
    
        mesaj.innerHTML = `Remiză!`;
        jocActiv = false;
        return;
        
    }

    schimbareJucator ();
    
}

function clickCasuta (click) 
{

    const celulaApasata = click.target;
    const indexCelulaApasata = parseInt(celulaApasata.getAttribute('data-cell-index'));

    if (tablaJoc[indexCelulaApasata] !== "" || !jocActiv || jucatorCurent != jucator) 
    {
    
        return;
        
    }

    apasareCasuta (celulaApasata, indexCelulaApasata);
    validareTura ();
    
}

function repornireJoc () 
{
    jocActiv = true;
    tablaJoc = ["", "", "", "", "", "", "", "", ""];
    /*mesaj.innerHTML = `Este rândul lui ${nume} (${jucatorCurent})`;*/
    mesaj.innerHTML = `Este rândul tău din nou`;
    jucatorCurent = jucator;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clickCasuta));
document.querySelector('.game-restart').addEventListener('click', repornireJoc);