
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=22&offset=0."
const INDEX_URL = "https://pokeapi.co/api/v2/pokedex/"
const ALL_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0."
let searchBar = false;

function onload() {
    loadingSpinnerOnOff();
    getPokeCard();
    fetchAllNamesAndURL()
}

function reFresh() {
    let nextButton = document.getElementById('nextButton')
    let lastButton = document.getElementById('getLastButton')
    window.location.reload()
    searchBar = false;
    resetButtonsAttributes(nextButton, lastButton)
    enableButtons();
    document.pokemoSearchInput.focus();
}

async function fetchAllNamesAndURL() {
    let pokeNameResponse = await fetch(ALL_URL + "json")
    let pokeNameResponseToJSON = await pokeNameResponse.json();
    let fetchedPokeObjects = pokeNameResponseToJSON.results
    fetchedPokemonsNAME_URL = pokeNameResponseToJSON.results
    pushNamesToArray(fetchedPokeObjects)
    console.log(fetchedPokemonsNAME_URL);

}

function pushNamesToArray(fetchedPokeObjects) {
    for (let nameIndexOfALLPokemon = 0; nameIndexOfALLPokemon < fetchedPokeObjects.length; nameIndexOfALLPokemon++) {
        let pokeNameToSave = fetchedPokeObjects[nameIndexOfALLPokemon].name

        fetchedNamesArray.push(pokeNameToSave)
    }
    console.log(fetchedNamesArray)
}

function findPokemon() {
    let pokemonToFind = document.getElementById('pokemoSearchInput').value
    let nextButton = document.getElementById('nextButton')
    let lastButton = document.getElementById('getLastButton')
    if (pokemonToFind.length > 2) {
        let foundPokemons = fetchedNamesArray.filter(name => name.includes(pokemonToFind))
        console.log(foundPokemons);
        searchBar = true;
        renderFoundPokemon(foundPokemons);
    }
    if (pokemonToFind.length < 1) {
        searchBar = false;
        resetButtonsAttributes(nextButton, lastButton)
        enableButtons();
        getPokeCard()
    }
}

function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const processChanges = debounce(() => findPokemon());

async function renderFoundPokemon(foundPokemons) {
    let renderContent = document.getElementById('renderContent')
    renderContent.innerHTML = "";
    foundPokemonsArray = [];
    let nextButton = document.getElementById('nextButton')
    let lastButton = document.getElementById('getLastButton')
    changeAttributesOfButton(nextButton, lastButton)
    changeAttributesOfButton(lastButton, nextButton)
    loadingSpinnerOnOff();
    console.log(foundPokemons);
    for (let indexOfFound = 0; indexOfFound < foundPokemons.length; indexOfFound++) {
        console.log(foundPokemons[indexOfFound]);

        let SPECIFIC_POKE_URL = "https://pokeapi.co/api/v2/pokemon/" + foundPokemons[indexOfFound]
        let capitalizedPokeName = capitalizeFirstLetter(foundPokemons[indexOfFound])
        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        // ObjectsOfAllPokemon += pokeObject
        console.log("pokeobjct", ObjectsOfAllPokemon);
        console.log(foundPokemons);
        foundPokemonsArray.push(pokeObject)
        // addToArrayIfNotExist(pokeObject, ObjectsOfAllPokemon)
        // ObjectsOfAllPokemon.push(pokeObject)
        renderContent.innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName)
        getSinglePokeData(pokeObject, indexOfFound)
        // onclickPokeCard(pokeObject);
    }
    setTimeout(loadingSpinnerOnOff, 500);
}

async function getPokeCard() {
    let response = await fetch(BASE_URL + ".json");
    responseToJson = await response.json();
    next_URL_Array += responseToJson.next

    console.log(responseToJson)
    document.getElementById('renderContent').innerHTML = "";

    for (let index = 0; index < responseToJson.results.length; index++) {
        // let pokemonName = responseToJson.results[index].name;
        let SPECIFIC_POKE_URL = responseToJson.results[index].url
        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        let capitalizedPokeName = capitalizeFirstLetter(pokeObject.name);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName);
        addToArrayIfNotExist(pokeObject, ObjectsOfAllPokemon)
        getSinglePokeData(pokeObject, index);
    }
    setTimeout(loadingSpinnerOnOff, 500);
}

function loadingSpinnerOnOff() {
    document.getElementById('loadingSpinner').classList.toggle('display_none')
    document.getElementById('renderContent').classList.toggle('display_none')
}

function capitalizeFirstLetter(pokeName) {
    return String(pokeName).charAt(0).toUpperCase() + String(pokeName).slice(1);
}

function addToArrayIfNotExist(pokeObject, ObjectsOfAllPokemon) {
    const doesAlreadyExist = ObjectsOfAllPokemon.find((item) => item.id === pokeObject.id);

    // Ignore the process
    if (doesAlreadyExist) return ObjectsOfAllPokemon;
    // Or push the new value
    ObjectsOfAllPokemon.push(pokeObject);

    return ObjectsOfAllPokemon;
}

function getSinglePokeData(pokeObject, index) {
    let pokeImg = pokeObject.sprites.other.home.front_default
    let secondPokeImg = pokeObject.sprites.front_default
    if (pokeImg) {
        setPokeImg(pokeImg, pokeObject)
    } else {
        setPokeImg(secondPokeImg, pokeObject)
    }

    setTypeOfPokemon(pokeObject, index);

}

async function getSinglePokeObject(SPECIFIC_POKE_URL) {
    let objectResponse = await fetch(SPECIFIC_POKE_URL);
    let objectResponseToJson = await objectResponse.json();
    let singlePokeObject = objectResponseToJson

    return singlePokeObject

}

function setPokeImg(pokeImg, pokeObject) {
    let pokeImgDiv = document.getElementById(`pokemonImg${pokeObject.id}`)
    pokeImgDiv.src = pokeImg
}