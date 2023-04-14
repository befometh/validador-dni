//variables globales recibidas para ser tratadas en el javascript
const _firstName = document.getElementById("firstName");
const _lastName = document.getElementById("lastName");
const _age = document.getElementById("age");
const _email = document.getElementById("email");
const _dni = document.getElementById("dni");
const dniError = document.getElementById("dniError");
const mainTable = document.getElementById("data");
const dataSuccess = document.getElementById("dataSuccess");

//definicion y constructor de los objetos que van a llevar los datos correspondientes al DNI
class Persona {
  constructor(apellido, nombre, dni, email, nacimiento) {
    this.apellido = apellido;
    this.nombre = nombre;
    this.nacimiento = nacimiento;
    this.email = email;
    this.dni = dni;
  }
}
//posición 0 de database[] el cabecero de la tabla
const tHeader = new Persona("Apellido", "Nombre", "DNI/NIE", "E-Mail", "Fecha de Nacimiento");
//base de datos principal
const database = [];
database.push(tHeader);

/**
 * Función que se encarga de validar el DNI, según las condiciones requeridas por el cliente
 * @returns verdadero si el dni es validao, falso si el dni es inválido
 */

function validar() {
  let letra = "TRWAGMYFPDXBNJZSQVHLCK"; // cadena de comprobación
  let dni = calcularNIE(_dni.value); // Calcula si el DNI es un NIE y realiza la conversión a DNI
  letra = letra.split(""); // letra = letra [letra1,letra2,...,letraN];
  let l = dni.split(""); // [1,2,3,4,5,6,7,8,"z"]
  l.pop(); // l = [1,2,3,4,5,6,7,8]
  let x = parseInt(l.join("")); // l="12345678" -> l=12345678 (numérico) -> x
  l = dni.split(""); // l = [1,2,3,4,5,6,7,8,"z"]
  l = l.pop(); //l="z"
  l = l.toUpperCase(); // l = "Z"
  let result = x % 23; //14
  return letra[result] == l? true : false;
}

/**
 * Función que verifica que el dato ingresado es un NIE, y si lo es lo cambia a un código válido para reconocimiento
 * @param {*} dni dni a modificar
 * @returns el dni ya corregido y adaptado.
 */
function calcularNIE(dni) {
  let l = dni[0]; // l="x" de dni="x1234...Z"
  let l2 = l.toUpperCase(); // asegura la mayúscula l="X"
  if (l != l2) {
    dni = dni.replace(l, l2);
  }
  switch (
    l2 // comprueba l
  ) {
    case "X":
      dni = dni.replace(l2, 0); // si l es igual a "X" reemplaza "X" por 0 en dni (dni="0123...Z")
      break;
    case "Y":
      dni = dni.replace(l2, 1); // si l es igual a "Y" reemplaza "Y" por 1 en dni (dni="1123...Z")
      break;
    case "Z":
      dni = dni.replace(l2, 2); // si l es igual a "Z" reemplaza "Z" por 2 en dni (dni="2123...Z")
      break;
  }
  return dni; // entrega dni modificado.
}

function calcularEdad(){
  let birth = _age.value;
  let now = new Date();
  today = [now.getFullYear(),now.getMonth()+1,now.getDate()];
  birth = birth.split("-");
  for(let i in birth){
    birth[i] = parseInt(birth[i]);
    today[i] = today [i] - birth [i];
  }
  for(let i=today.length-1;i>0;i--){
    if(today[i]<0){
      today[i-1]--;
    }
  }
  return result = today[0]<18 ? false:true;
}

// Función que permite validar si un usuario es mayor de nacimiento
/*
function esMayor(age) { ---------Descatalogada
  if (age < 18) {
    return false;
  } else {
    return true;
  }
}
*/
/*
Funcion perteneciente al botón "Enviar"
-Inicia los mensajes de error ocultos para que no haya conflictos
-Asigna variables locales para cada dato que hay en la tabla
-Verifica si puede continuar, (se cumple la condición del dni/nie)
-Verifica si puede continuar, (se cumple la condición de la nacimiento)
-Si puede continuar en ambos casos al array "database[]" le añade el nuevo elemento que va a quedar guardado en la memoria de la página
*/
function procesarDatos() {
  dniError.style.display = "none";
  ageError.style.display = "none";
  dataSuccess.style.display = "none";

  let dni = _dni.value;
  let email = _email.value;
  let age = _age.value;
  let firstName = _firstName.value;
  let lastName = _lastName.value;
  let continuar = validar();
  if (continuar) {
    //continuar = esMayor(age);
    continuar = calcularEdad();
    if (continuar) {
      database[database.length] = new Persona(
        lastName,
        firstName,
        dni,
        email,
        age
      );
      dataSuccess.style.display = "block";
    } else {
      ageError.style.display = "block";
    }
  } else {
    dniError.style.display = "block";
  }
}

/**
 * Función que se encarga de mostrar los datos cuando se pulsa el botón "Mostrar Datos"
 */
function mostrarDatos() {
  let creador = "";
  let tds = "<td class=''>";
  let isHeader = true;
  for (let i of database) {
    creador += "<tr>";
    if (isHeader) {
      creador += `<th>${i.apellido}</th><th>${i.nombre}</th><th>${i.dni}</th><th>${i.email}</th><th>${i.nacimiento}</th>`;
      isHeader = !isHeader;
    } else {
      creador += `<td>${i.apellido}</td><td>${i.nombre}</td><td>${i.dni}</td><td>${i.email}</td><td>${i.nacimiento}</td>`;
    }
    creador += "</tr>";
  }
  mainTable.innerHTML = creador;
}
