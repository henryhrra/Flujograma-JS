'use strict';
var palabrasReservadas = ["Inicio", "Leer", "Proceso", "Imprimir", "Fin", "Si", "Contrario", "Finsi"]
//var palabrasReservadas = ["inicio", "Leer", "Proceso", "Imprimir", "fin","Si", "Contrario", "Finsi"]
var txtError = document.querySelector("#textError")
var Diagrama = document.querySelector("#flujograma")
var palabraEncontrada = false;
var Proceso = true;
//var ProcesoNo = false;



function numeracionN(e) {
    let linea = document.querySelector('#numeracion')
    let salto = e.value.split("\n").length
    let mensaje = ""
    for (let i = 0; i < salto; i++) {
        mensaje += (i + 1) + "\n"
    }
    linea.value = mensaje
}

function ComprobarPalabras() {
    let codigo = document.querySelector("#sintaxis").value
    let codigoLinea = codigo.split("\n")

    for (let index = 0; index < codigoLinea.length; index++) {
        codigoLinea[index] = codigoLinea[index].trim();
        codigoLinea[index] = codigoLinea[index].replace(/  +/g, ' ');
        //codigoLinea[index] = codigoLinea[index].trim().toLowerCase();
    }
    txtError.innerHTML = ""
    Diagrama.innerHTML = ""


    for (let i = 0; i < codigoLinea.length; i++) {
        palabraEncontrada = false
        for (let j = 0; j < palabrasReservadas.length; j++) {

            if (codigoLinea[i].startsWith(palabrasReservadas[j])) {
                console.log("palabra encontrado");
                palabraEncontrada = true
                break
            }
        }
        if (palabraEncontrada == false) {
            txtError.innerHTML += "Error (Linea " + (i + 1) + ") la pabrabra '" + codigoLinea[i] + "' no existe </br>"
        }
    }

    if (txtError.innerHTML == "") {
        Analizador(codigoLinea)
        if (txtError.innerHTML == "") {
            PintarDiagrama(codigoLinea)
        }
    }

}

function Analizador(codigoLinea) {
    //console.log(codigoLinea);

    for (let i = 0; i < codigoLinea.length; i++) {
        let linea = codigoLinea[i].trim().split(" ");
        // console.log(linea);


        switch (linea[0]) {
            case "Inicio":
                ValidarInicio(codigoLinea)
                break;
            case "Leer":
                ValidarLeer(codigoLinea[i], i)
                break;
            case "Si":
                ValidarsSi(codigoLinea[i], i, codigoLinea[i + 1])
                break;
            case "Proceso":
                ValidarProceso(codigoLinea[i], i, codigoLinea[i + 1])
                break;
            case "Imprimir":
                ValidarImprimir(codigoLinea[i], i, codigoLinea[i + 1])
                break;
            default:
                break;
        }

    }


}


function ValidarInicio(cod) {
    //console.log("sdfsdfs");
    if (cod[0] != "Inicio" || cod[cod.length - 1] != "Fin") {
        txtError.innerHTML += "Error ( ) --> No existe un Inicio y Final </br>"
    }
}

function ValidarLeer(cod, nl) {
    const regex = /[a-zA-Z]*/
    let dato = cod.split(" ");
    //console.log(dato);
    if (dato[0] != "Leer" && !regex.test(dato[1]) || dato.length > 2) {
        txtError.innerHTML += "Error ( " + (nl + 1) + " ) --> Leer esta mal formulado </br>"
    }
}

function ValidarsSi(cod, nl, cod2) {
    const regex = /[a-zA-Z]*/
    let dato = cod.split(" ");
    let dato2 = cod2.split(" ");

    if (!regex.test(dato[1]) || !/<|>/.test(dato[2]) || !regex.test(dato[3]) || dato.length > 4) {
        txtError.innerHTML += "Error ( " + (nl + 1) + " ) --> Error de sintaxis en si </br>"
    } else if (dato2[0] != "Proceso") {
        txtError.innerHTML += "Error ( " + (nl + 2) + " ) --> Error de sintaxis despues de iniciar Si debe colocar Proceso </br>"
    }
}

function ValidarProceso(cod, nl, cod2) {
    const regex = /[a-zA-Z]*/
    let dato = cod.split(" ");
    //console.log(cod2);
    //let dato2 = cod2.split(" ");
    if (Proceso == true) {
        if (!regex.test(dato[1]) || !/([+]|[-]|[\/]|[*])/.test(dato[2]) || !regex.test(dato[3]) || dato.length > 4) {
            txtError.innerHTML += "Error ( " + (nl + 1) + " ) --> Error de sintaxis en Proceso </br>"
        } else if (cod2 != "Contrario") {
            txtError.innerHTML += "Error ( " + (nl + 2) + " ) --> Error de sintaxis despues de colocar Proceso debe colocar Contrario</br>"
        }
        Proceso = false
    } else if (Proceso == false) {
        if (!regex.test(dato[1]) || !/([+]|[-]|[\/]|[*])/.test(dato[2]) || !regex.test(dato[3]) || dato.length > 4) {
            txtError.innerHTML += "Error ( " + (nl + 1) + " ) --> Error de sintaxis en Proceso </br>"
        } else if (cod2 != "Finsi") {
            txtError.innerHTML += "Error ( " + (nl + 2) + " ) --> Error de sintaxis despues de colocar Proceso debe colocar Finsi</br>"
        }
        Proceso = true
    }

}

function ValidarImprimir(cod, nl) {
    const regex = /[a-zA-Z]*/
    let dato = cod.split(" ");
    //console.log(dato);
    if (dato[0] != "Imprimir " && !regex.test(dato[1]) || dato.length > 2) {
        txtError.innerHTML += "Error ( " + (nl + 1) + " ) --> Imprimir esta mal formulado </br>"
    }
}

function PintarDiagrama(codigoLinea) {
    for (let i = 0; i < codigoLinea.length; i++) {
        let linea = codigoLinea[i].split(" ");
        var Div = document.getElementById("flujograma");
        var contenedor = document.createElement('div');
        contenedor.style.display = "flex"
        contenedor.style.alignItems = "center";
        contenedor.style.justifyContent = "center";
        contenedor.style.margin = "1% auto"
        //Div.innerText = "fff";

        switch (linea[0]) {
            case "Inicio":
                //ValidarInicio(codigoLinea)
                contenedor.style.background = "url('images/" + linea[0] + ".png')";
                contenedor.style.backgroundSize = "contain"
                contenedor.style.backgroundRepeat = "no-repeat";
                contenedor.style.backgroundPosition = "center";
                contenedor.style.height = "20%";
                contenedor.style.width = "20%";
                console.log(linea[0]);
                contenedor.innerText = codigoLinea[i];
                Div.appendChild(contenedor);
                break;
            case "Leer":
                contenedor.style.background = "url('images/" + linea[0] + ".png')";
                contenedor.style.backgroundSize = "contain"
                contenedor.style.backgroundRepeat = "no-repeat";
                contenedor.style.backgroundPosition = "center";
                contenedor.style.height = "20%";
                contenedor.style.width = "20%";
                console.log(linea[0]);
                contenedor.innerText = codigoLinea[i];
                Div.appendChild(contenedor);
                //ValidarLeer(codigoLinea[i], i)
                break;
            case "Si":
                contenedor.style.background = "url('images/" + linea[0] + ".png')";
                contenedor.style.backgroundSize = "contain"
                contenedor.style.backgroundRepeat = "no-repeat";
                contenedor.style.backgroundPosition = "center";
                contenedor.style.height = "30%";
                contenedor.style.width = "80%";
                console.log(linea[0]);
                contenedor.innerText = codigoLinea[i];
                Div.appendChild(contenedor);

                var contenedorSi = document.createElement('div');
                contenedorSi.style.background = "url('images/Proceso.png')";
                contenedorSi.style.backgroundSize = "contain"
                contenedorSi.style.backgroundRepeat = "no-repeat";
                contenedorSi.style.backgroundPosition = "center";
                contenedorSi.style.display = "flex";
                contenedorSi.style.alignItems = "center";
                contenedorSi.style.justifyContent = "center";
                contenedorSi.style.height = "100%";
                contenedorSi.style.width = "40%";
                contenedorSi.margin = "1% auto"
                //console.log(linea[0]);
                contenedorSi.innerText = codigoLinea[i+1];

                var contenedorNo = document.createElement('div');
                contenedorNo.style.background = "url('images/Proceso.png')";
                contenedorNo.style.backgroundSize = "contain"
                contenedorNo.style.backgroundRepeat = "no-repeat";
                contenedorNo.style.backgroundPosition = "center";
                contenedorNo.style.display = "flex"
                contenedorNo.style.alignItems = "center";
                contenedorNo.style.justifyContent = "center";
                contenedorNo.style.height = "100%";
                contenedorNo.style.width = "40%";
                contenedorNo.margin = "1% auto"
                //console.log(linea[0]);
                contenedorNo.innerText = codigoLinea[i+3];

                var contenedorProceso = document.createElement('div');
                contenedorProceso.style.width = '100%';
                contenedorProceso.style.height = '20%'
                contenedorProceso.appendChild(contenedorNo);
                contenedorProceso.appendChild(contenedorSi);
                contenedorProceso.style.display = "flex"
                contenedorProceso.style.alignItems = "center";
                contenedorProceso.style.justifyContent = "center";
                Div.appendChild(contenedorProceso);

                var Finsi = document.createElement('div');
				Finsi.style.display = "flex"
				Finsi.style.alignItems = "center";
				Finsi.style.justifyContent = "center";
				Finsi.style.margin = "1% auto"
				Finsi.style.background = "url('images/Finsi.png')";
                Finsi.style.backgroundSize = "contain"
                Finsi.style.backgroundRepeat = "no-repeat";
                Finsi.style.backgroundPosition = "center";
                Finsi.style.height = "26%";
                Finsi.style.width = "70%";
                Div.appendChild(Finsi);

                // ValidarsSi(codigoLinea[i], i, codigoLinea[i + 1])
                break;
            /*case "Proceso":
                // ValidarProceso(codigoLinea[i], i, codigoLinea[i + 1])
                break;*/
            case "Imprimir":
                contenedor.style.background = "url('images/" + linea[0] + ".png')";
                contenedor.style.backgroundSize = "contain"
                contenedor.style.backgroundRepeat = "no-repeat";
                contenedor.style.backgroundPosition = "center";
                contenedor.style.height = "20%";
                contenedor.style.width = "20%";
                console.log(linea[0]);
                contenedor.innerText = codigoLinea[i];
                Div.appendChild(contenedor);

                let Contenedor_SiNo = document.createElement('div');
                let ProcesoSi = document.createElement('div');
                let ProcesoNo = document.createElement('div');
                //ValidarImprimir(codigoLinea[i], i, codigoLinea[i + 1])
                break;
            case "Fin":
                //ValidarInicio(codigoLinea)
                contenedor.style.background = "url('images/" + linea[0] + ".png')";
                contenedor.style.backgroundSize = "contain"
                contenedor.style.backgroundRepeat = "no-repeat";
                contenedor.style.backgroundPosition = "center";
                contenedor.style.height = "20%";
                contenedor.style.width = "20%";
                console.log(linea[0]);
                contenedor.innerText = codigoLinea[i];
                Div.appendChild(contenedor);
                break;
            default:
                break;
        }

    }
}