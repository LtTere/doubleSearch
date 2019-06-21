const searcher = document.querySelector("#searcher"); //Selecciona el input
searcher.addEventListener("keydown", function(event) {
  //Añade el evento keydown y lanza evento
  const result = document.querySelector(".result"); //Selecciona el lugar donde pintamos el primer resultado
  const connectionElement = document.querySelector(".connection__element"); //Selecciona el lugar donde pintamos el primer resultado pero en otro sitio
  const name = searcher.value; //Captura el valor que hayas en el input
  const enterKey = 13; // Le da el valor a la variable del numero de tecla a pulsar
  if (event.which == enterKey) {
    //Los parametros:el which te indica que tecla has pulsado y lo iguala a al valor anterior (13)
    const user = search(name); //Llama a la función Search y le pasa el parametro name y le da el valor a la constante
    paint(user, result); //Llama a la función paint y pinta el user en el primer lugar que le indicamos
    paint(user, connectionElement);
  } //Llama a la función paint y pinta el user en el segundo lugar.

  if (event.which == 8 || event.which == 46) {
    clean(); // De momento no tiene utilidad en este proyecto, borraría lo que le pongamos en el parametro a la llamada de clean() pulsando la tecla 8 y 46
  }
});

const objectiveBtn = document.querySelector(".objetive__label__btn"); //Selecciona el label botón
objectiveBtn.addEventListener("click", function(event) {
  //Añade evento click al botón y lanza un evento
  const nameText = document.querySelector("#objetive"); //Captura el input
  const name = nameText.value; //Saca el texto que contiene el input
  const user = search(name); //Llama a la función Search con el parametro name y lo que devuelve es una promesa que contiene el user
  const objectiveNames = document.querySelector(".objective__names"); //ul donde voy a pintar
  paintNameToList(user, objectiveNames); //Le paso la promesa con el usuario y el lugar donde voy a pintar
});

async function search(name) {
  const baseUrl = "https://swapi.co/api/people/?search=";
  const endpoint = baseUrl + name;
  let user = await fetch(endpoint);
  user = await user.json();

  return user;
}

async function paint(user, whereToPaint) {
  const resolveUser = await user;
  const name = resolveUser.results[0].name;
  console.log("nombre del buscador Star wars", name);
  whereToPaint.innerText = name;
}

async function paintNameToList(user, whereToPaint) {
  //Función de pintar del buscador secundario
  const resolveUser = await user; //Resuelve la promesa del user
  const name = resolveUser.results[0].name; //Coge el nombre

  //pinta el name que acabamos de escoger añadiendo un <li> con un <button> para luego eliminar el <li> que lo contiene
  whereToPaint.innerHTML += `<li> ${name}
      <button class="clean__objetive__name">x</button>
    </li>`;
}

async function clean(whereToClean) {
  whereToClean.innerText = "";
}

const deleteLi = document.querySelector(".objective__names"); //Seleciona el ul
//Añado evento click a TODO el ul(incluyendo lo que contenga)
deleteLi.addEventListener("click", function(event) {
  const element = event.target; //el event.target es como el querySelector donde te indica donde has hecho click, por eso necesitamos luego el if que sigue
  if (element.nodeName == "BUTTON") {
    //Te dice que si has hecho click en el nodo tipo boton hace lo siguiente
    element.parentElement.remove(); //Borra el hijo y todo lo que contenga.
  }
});

//Delegación de eventos
