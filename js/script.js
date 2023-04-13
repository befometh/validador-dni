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
  constructor(apellido, nombre, dni, email, edad) {
    this.apellido = apellido;
    this.nombre = nombre;
    this.edad = edad;
    this.email = email;
    this.dni = dni;
  }
}
//posición 0 de database[] el cabecero de la tabla
const tHeader = new Persona("Apellido", "Nombre", "DNI/NIE", "E-Mail", "Edad");
//base de datos principal
const database = [];
database.push(tHeader);

/**
 * Función que se encarga de validar el DNI, según las condiciones requeridas por el cliente
 * @returns verdadero si el dni es validao, falso si el dni es inválido
 */

function validar() {
  var letra = "TRWAGMYFPDXBNJZSQVHLCK"; // cadena de comprobación
  var dni = calcularNIE(_dni.value); // Calcula si el DNI es un NIE y realiza la conversión a DNI
  letra = letra.split(""); // letra = letra [letra1,letra2,...,letraN];
  var l = dni.split(""); // [1,2,3,4,5,6,7,8,"z"]
  l.pop(); // l = [1,2,3,4,5,6,7,8]
  var x = parseInt(l.join("")); // l="12345678" -> l=12345678 (numérico) -> x
  l = dni.split(""); // l = [1,2,3,4,5,6,7,8,"z"]
  l = l.pop(); //l="z"
  l = l.toUpperCase(); // l = "Z"
  var result = x % 23; //14
  if (letra[result] == l) {
    // comprueba que letra[result] sea igual a l
    return true; // es igual
  } else {
    return false; // no es igual
  }
}

/**
 * Función que verifica que el dato ingresado es un NIE, y si lo es lo cambia a un código válido para reconocimiento
 * @param {*} dni dni a modificar
 * @returns el dni ya corregido y adaptado.
 */
function calcularNIE(dni) {
  var l = dni[0]; // l="x" de dni="x1234...Z"
  var l2 = l.toUpperCase(); // asegura la mayúscula l="X"
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

// Función que permite validar si un usuario es mayor de edad
function esMayor(age) {
  if (age < 18) {
    return false;
  } else {
    return true;
  }
}

/*
Funcion perteneciente al botón "Enviar"
-Inicia los mensajes de error ocultos para que no haya conflictos
-Asigna variables locales para cada dato que hay en la tabla
-Verifica si puede continuar, (se cumple la condición del dni/nie)
-Verifica si puede continuar, (se cumple la condición de la edad)
-Si puede continuar en ambos casos al array "database[]" le añade el nuevo elemento que va a quedar guardado en la memoria de la página
*/
function procesarDatos() {
  dniError.style.display = "none";
  ageError.style.display = "none";
  dataSuccess.style.display = "none";

  var dni = _dni.value;
  var email = _email.value;
  var age = _age.value;
  var firstName = _firstName.value;
  var lastName = _lastName.value;
  var continuar = validar();
  if (continuar) {
    continuar = esMayor(age);
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
  var creador = "";
  var tds = "<td class=''>";
  var isHeader = true;
  for (let i of database) {
    creador += "<tr>";
    if (isHeader) {
      creador += `<th>${i.apellido}</th><th>${i.nombre}</th><th>${i.dni}</th><th>${i.email}</th><th>${i.edad}</th>`;
      isHeader = !isHeader;
    } else {
      creador += `<td>${i.apellido}</td><td>${i.nombre}</td><td>${i.dni}</td><td>${i.email}</td><td>${i.edad}</td>`;
    }
    creador += "</tr>";
  }
  mainTable.innerHTML = creador;
}
