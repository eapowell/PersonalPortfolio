
/*
TO DO
- 
*/

// Navigation
let nav = document.querySelector("nav");
let ul = document.createElement("ul");
let home = document.createElement("li");
let all = document.createElement("li");
let type = document.createElement("li");
let typeDrop = [
  "fire",
  "flying",
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water"
];
// let fire = [];
// let flying = [];

// Constructor
class Pokemon {
  constructor(id, name, forms, height, weight, abilities, types) {
    this.id = id;
    this.name = name;
    this.forms = forms;
    this.height = height;
    this.weight = weight;
    this.abilities = abilities;
    this.types = types;
  }
}

// Instantiation of new Pokemon object
const Cobermon = new Pokemon(
  808,
  "Cobermon",
  [{ name: "Rage" }],
  6,
  250,
  (abilities = [
    { ability: { name: "fight" } },
    { ability: { name: "procrastination" } }
  ]),
  [{ type: { name: "fire" } }]
);

//Map function, not working yet
const typeReduce = typeDrop.reduce((acc, pokemon) => {
  return acc += pokemon.length //96
}, 0)
console.log(typeReduce)


//Add new Pokemon by typing in number
const newButton = document.querySelector("#search");
newButton.addEventListener("click", function() {
  let pokeId = prompt("Enter Pokemon number between 1 & 807");
  if (pokeId > 0 && pokeId <= 807) {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(result => {
      populateDOM(result);
    });
  } else {
    var x = document.querySelector(".sBar1");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
});

//Button to add an instance of the Pokemon Class
function addButton() {
  let add = document.createElement("button");
  add.setAttribute("class", "scene btn");
  mainArea.appendChild(add);

  add.addEventListener("click", function() {
    populateDOM(Cobermon);
  });

  add.onmouseover = function() {
    this.setAttribute("style", `background-color: #555;`);
  };

  add.onmouseleave = function() {
    this.setAttribute("style", `border: none`);
  };
}

// NAVIGATION
home.textContent = "HOME";
ul.appendChild(home);
nav.appendChild(ul);
home.addEventListener("click", function() {
  document.location.href = "index.html";
});

// Reusable async function to fetch data from url param in the function call
async function getAPIData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//async function to help with passed filter id
async function forAllPokemon(callback) {
  const dataKey = "allPokemon";
  if (sessionStorage.getItem(dataKey) === null) {
    let data = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=25");
    data = await data.json();
    let pokemonList = [];

    data.results.forEach(async p => {
      await fetch(p.url).then(async res => {
        const json = await res.json();
        pokemonList.push(json);
        if (pokemonList.length == data.results.length) {
          sessionStorage.setItem(dataKey, JSON.stringify(pokemonList)); // store data in session storage (until browser closes) as a cache
          callback(pokemonList);
        }
      });
    });
  } else {
    callback(JSON.parse(sessionStorage.getItem(dataKey)));
  }
}

// Reusable async function to fetch data from url param in the function call
async function getAPIData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// now, use the returned async data
const theData = getAPIData("https://pokeapi.co/api/v2/pokemon/").then(data => {
  for (const pokemon of data.results) {
    getAPIData(pokemon.url).then(pokeData => {
      // simpleFilter(pokeData)
      // console.log(pokeData)
      populateDOM(pokeData);
    });
  }
});

const theData2 = getAPIData("https://pokeapi.co/api/v2/pokemon/?limit=20").then(
  data => {
    for (const pokemon of data.results) {
      getAPIData(pokemon.url).then(pokeData2 => {
        populateDOM(pokeData2);
      });
    }
  }
);

// HERO AREA - To create and change the color of circles for types
var container = document.getElementById("types");
for (var i = 0; i < typeDrop.length; i++) {
  container.innerHTML += `<ul> <li id="${typeDrop[i]}"> 
  <div id="${typeDrop[i]}" class="circle" style="background-color: ${color(
    typeDrop[i]
  )};"></div>
   ${typeDrop[i]} </li></ul>`;
}

const selectType = document.querySelector("main");
function deleteCards() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//To capitalize the first letter in passed value
const capitalize = s => {
  if (typeof s !== "string") return "";
  return s[0].toUpperCase() + s.slice(1);
};

//To figure out the correct image to show for each Pokemon
function getPokeNumber(id) {
  if (id < 10) return `00${id}`;
  if (id > 9 && id < 100) {
    return `0${id}`;
  } else return id;
}

let mainArea = document.querySelector("main");
addButton();

//Function to append card elements into Main
function populateDOM(single_pokemon) {
  let pokeScene = document.createElement("div");
  let pokeDiv = document.createElement("div");
  let pokeFront = document.createElement("div");
  let pokeBack = document.createElement("div");
  let name = document.createElement("h2");
  let pic = document.createElement("img");
  let powers = document.createElement("p");
  let height = document.createElement("p");
  let weight = document.createElement("p");
  let pokeId = document.createElement("p");
  let forms = document.createElement("p");
  let hr = document.createElement("hr");
  let tipes = document.createElement("div");

  pokeScene.setAttribute("class", "scene");
  tipes.setAttribute("class", "pre");
  pokeDiv.setAttribute("class", "card");
  pokeFront.setAttribute("class", "card__face card__face--front");
  pokeBack.setAttribute("class", "card__face card__face--back");
  pic.setAttribute("class", "picDivs");

  let pokeNum = getPokeNumber(single_pokemon.id);

  name.textContent = capitalize(`${single_pokemon.name}`);
  height.textContent = `Height: ${single_pokemon.height}`;
  // powers.textContent = `Abilities: ${capitalize(
  //   single_pokemon.abilities[0].ability.name
  // )}`;

  weight.textContent = `Weight: ${single_pokemon.weight}`;
  pokeId.textContent = `ID: ${single_pokemon.id}`;
  forms.textContent = `Forms: ${capitalize(single_pokemon.forms[0].name)}`;

  pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`;

  pokeFront.appendChild(pic);
  pokeFront.appendChild(name);
  pokeFront.appendChild(forms);
  pokeFront.appendChild(pokeId);
  pokeFront.appendChild(hr);

  pokeBack.appendChild(powers);
  pokeBack.appendChild(height);
  pokeBack.appendChild(weight);
  pokeBack.appendChild(tipes);

  pokeDiv.appendChild(pokeFront);
  pokeDiv.appendChild(pokeBack);
  pokeScene.appendChild(pokeDiv);

  mainArea.appendChild(pokeScene);

  pokeDiv.addEventListener("click", function() {
    pokeDiv.classList.toggle("is-flipped");
  });

  //For outlining each card with the color corresponding to the 'type'
  let type = single_pokemon.types[0].type.name;

  pokeDiv.onmouseover = function() {
    this.setAttribute(
      "style",
      `border: 3px solid ${color(type)}; border-radius: 7px`
    );
  };

  pokeDiv.onmouseleave = function() {
    this.setAttribute("style", `border: none`);
  };

  tipes.innerHTML =
    "Types: " +
    single_pokemon.types
      .map(t => `<div class="types" style="color: ${color(type)}">${t.type.name}</div>`)
        .join("");

  powers.innerHTML =
    "Abilities: " +
    single_pokemon.abilities
      .map(p => `<div class="abilities">${capitalize(p.ability.name)}</div>`)
      .join("");
} //end card function

// let single_pokemon = JSON.parse(document.querySelector('.pre').textContent)

// single_pokemon.types.map(t => {
//   let div = document.createElement('div')
//   div.classList = 'pokeType poke-info'
//   div.textContent = t.type.name
//   return div
// }).foreach(elm => pokeBack.document.body.appendChild(elm))

function color(type) {
  if (type === "fire") {
    return "red";
  } else if (type === "flying") {
    return "blue";
  } else if (type === "bug") {
    return "green";
  } else if (type === "dark") {
    return "black";
  } else if (type === "dragon") {
    return "#148DEB";
  } else if (type === "electric") {
    return "yellow";
  } else if (type === "fairy") {
    return "#FF2D67";
  } else if (type === "fighting") {
    return "orange";
  } else if (type === "ghost") {
    return "#541482";
  } else if (type === "grass") {
    return "green";
  } else if (type === "ground") {
    return "brown";
  } else if (type === "ice") {
    return "#6CEDFF";
  } else if (type === "normal") {
    return "#FFA292";
  } else if (type === "poison") {
    return "#7025FF";
  } else if (type === "psychic") {
    return "#FF1C79";
  } else if (type === "rock") {
    return "#209E70";
  } else if (type === "steel") {
    return "#209E71";
  } else if (type === "water") {
    return "#1742FF";
  }
}

let theParent = document.querySelector("#types");
theParent.addEventListener("click", doSomething, false);

function doSomething(e) {
  if (e.target != e.currentTarget) {
    let clickedItem = e.target.id;
    typeFilter(clickedItem);
  }
  e.stopPropagation()
}

function typeFilter(typeSelected) {
  forAllPokemon(allData => {
    const FILTER_BY_TYPE = typeSelected;
    const foundPokemon = allData.filter(p =>
      p.types.map(t => t.type.name).includes(FILTER_BY_TYPE)
    );

    console.group(`${typeSelected}: ${foundPokemon.length}`); // formatted output of found objects in console (best in browser)
    console.log(foundPokemon);
    console.groupEnd();
    if (foundPokemon.length >= 1) {
      deleteNodes(mainArea);
      for (const pokemon of foundPokemon) {
        populateDOM(pokemon);
      }
    } else {
      var x = document.querySelector(".sBar2");
      x.className = "show";
      setTimeout(function() {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
  });  
}

function deleteNodes(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

/* 
Add map function to show how many cards there are
When filtering, replace image errors with pokeball
Figure out best colors and designs for cards
Fix card colors so types don't blur
Fix size of cards when 1 to 2 cards. They are huge!
*/
© 2019 GitHub, Inc.




























/*
// reusable asyne function to fetch data from url api
async function getAPIData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
  } catch (error) {
    console.error(error);
  }
  }
  
  // now, use the returned async data    
  const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/&limit=25').then(data => {
      for (const pokemon of data.results) {
          getAPIData(pokemon.url).then(pokedata => {
            populateDOM(pokedata);
          //   populateDOM(Thoremon)
          });      
      }
  });
  
  


let mainArea = document.querySelector("main");
addButton();

//Function to append card elements into Main
function populateDOM(single_pokemon) {
  let pokeScene = document.createElement("div");
  let pokeDiv = document.createElement("div");
  let pokeFront = document.createElement("div");
  let pokeBack = document.createElement("div");
  let name = document.createElement("h2");
  let pic = document.createElement("img");
  let powers = document.createElement("p");
  let height = document.createElement("p");
  let weight = document.createElement("p");
  let pokeId = document.createElement("p");
  let forms = document.createElement("p");
  let hr = document.createElement("hr");
  let tipes = document.createElement("div");

  pokeScene.setAttribute("class", "scene");
  tipes.setAttribute("class", "pre");
  pokeDiv.setAttribute("class", "card");
  pokeFront.setAttribute("class", "card__face card__face--front");
  pokeBack.setAttribute("class", "card__face card__face--back");
  pic.setAttribute("class", "picDivs");

  let pokeNum = getPokeNumber(single_pokemon.id);

  name.textContent = capitalize(`${single_pokemon.name}`);
  height.textContent = `Height: ${single_pokemon.height}`;
  // powers.textContent = `Abilities: ${capitalize(
  //   single_pokemon.abilities[0].ability.name
  // )}`;

  weight.textContent = `Weight: ${single_pokemon.weight}`;
  pokeId.textContent = `ID: ${single_pokemon.id}`;
  forms.textContent = `Forms: ${capitalize(single_pokemon.forms[0].name)}`;

  pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`;

  pokeFront.appendChild(pic);
  pokeFront.appendChild(name);
  pokeFront.appendChild(forms);
  pokeFront.appendChild(pokeId);
  pokeFront.appendChild(hr);

  pokeBack.appendChild(powers);
  pokeBack.appendChild(height);
  pokeBack.appendChild(weight);
  pokeBack.appendChild(tipes);

  pokeDiv.appendChild(pokeFront);
  pokeDiv.appendChild(pokeBack);
  pokeScene.appendChild(pokeDiv);

  mainArea.appendChild(pokeScene);

  pokeDiv.addEventListener("click", function() {
    pokeDiv.classList.toggle("is-flipped");
  });
  */