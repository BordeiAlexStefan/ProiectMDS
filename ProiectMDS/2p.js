const mesaj = document.querySelector ('.game--status');

let jocActiv = true;

const url = window.location.search;

const parametri = new URLSearchParams(url);

const numeJucator = parametri.get('fname');

const numeJucator2 = parametri.get('fname2');

var jucator = parametri.get('x/0');

if (jucator == "0" || jucator == "O")
    jucator = "O";

if (jucator == "x")
    jucator = "X";

var jucator2;

if (jucator == "X")
    jucator2 = "O";
else
    jucator2 = "X";

let jucatorCurent = jucator;

let nume = numeJucator;

let tablaJoc = ["", "", "", "", "", "", "", "", ""];

mesaj.innerHTML = `Este rândul lui ${nume} (${jucatorCurent})`;

function apasareCasuta (casutaApasata, indexCasutaApasata) 
{

    tablaJoc[indexCasutaApasata] = jucatorCurent;
    casutaApasata.innerHTML = jucatorCurent;
    
}

function schimbareJucator () 
{

    if (jucatorCurent == jucator)
    {
    
        jucatorCurent = jucator2;
        nume = numeJucator2;
        
    }
    else
    {
    
        jucatorCurent = jucator;
        nume = numeJucator;
        
    }
    
    mesaj.innerHTML = `Este rândul lui ${nume} (${jucatorCurent})`;
    
}

function validareTura () 
{

    let jocCastigat = false;
    
    if (tablaJoc[0] == tablaJoc[1] && tablaJoc[1] == tablaJoc[2] && tablaJoc[2] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tablaJoc[0] == tablaJoc[3] && tablaJoc[3] == tablaJoc[6] && tablaJoc[6] != "")
	{
	
        jocCastigat = true;
        
    }
        
    else if (tablaJoc[0] == tablaJoc[4] && tablaJoc[4] == tablaJoc[8] && tablaJoc[8] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tablaJoc[1] == tablaJoc[4] && tablaJoc[4] == tablaJoc[7] && tablaJoc[7] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tablaJoc[2] == tablaJoc[4] && tablaJoc[4] == tablaJoc[6] && tablaJoc[6] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tablaJoc[2] == tablaJoc[5] && tablaJoc[5] == tablaJoc[8] && tablaJoc[8] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tablaJoc[3] == tablaJoc[4] && tablaJoc[4] == tablaJoc[5] && tablaJoc[5] != "")
    {
    
        jocCastigat = true;
        
    }
        
    else if (tablaJoc[6] == tablaJoc[7] && tablaJoc[7] == tablaJoc[8] && tablaJoc[8] != "")
    {
    
        jocCastigat = true;
        
    }

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

    if (tablaJoc[indexCelulaApasata] !== "" || !jocActiv) 
    {
    
        return;
        
    }

    apasareCasuta (celulaApasata, indexCelulaApasata);
    validareTura ();
    
}

function repornireJoc () 
{

    jocActiv = true;
    jucatorCurent = jucator; 
    nume = numeJucator;
    tablaJoc = ["", "", "", "", "", "", "", "", ""];
    mesaj.innerHTML = `Este rândul lui ${nume} (${jucatorCurent})`;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clickCasuta));
document.querySelector('.game-restart').addEventListener('click', repornireJoc);