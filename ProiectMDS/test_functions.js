function esteJocCastigat(tabla) {
    let jocCastigat = false;
    if (tabla[0] == tabla[1] && tabla[1] == tabla[2] && tabla[2] != "")
        jocCastigat = true;
    else if (tabla[0] == tabla[3] && tabla[3] == tabla[6] && tabla[6] != "")
        jocCastigat = true;
    else if (tabla[0] == tabla[4] && tabla[4] == tabla[8] && tabla[8] != "")
        jocCastigat = true;
    else if (tabla[1] == tabla[4] && tabla[4] == tabla[7] && tabla[7] != "")
        jocCastigat = true;
    else if (tabla[2] == tabla[4] && tabla[4] == tabla[6] && tabla[6] != "")
        jocCastigat = true;
    else if (tabla[2] == tabla[5] && tabla[5] == tabla[8] && tabla[8] != "")
        jocCastigat = true;
    else if (tabla[3] == tabla[4] && tabla[4] == tabla[5] && tabla[5] != "")
        jocCastigat = true;
    else if (tabla[6] == tabla[7] && tabla[7] == tabla[8] && tabla[8] != "")
        jocCastigat = true;
    return jocCastigat;
}

module.exports = esteJocCastigat;