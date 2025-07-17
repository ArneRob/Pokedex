
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=22&offset=0."
const INDEX_URL = "https://pokeapi.co/api/v2/pokedex/"
const ALL_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0."
let searchBar = false;

function onload() {
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
}

function pushNamesToArray(fetchedPokeObjects) {
    for (let nameIndexOfALLPokemon = 0; nameIndexOfALLPokemon < fetchedPokeObjects.length; nameIndexOfALLPokemon++) {
        let pokeNameToSave = fetchedPokeObjects[nameIndexOfALLPokemon].name

        fetchedNamesArray.push(pokeNameToSave)
    }
}

function findPokemon() {
    let pokemonToFind = document.getElementById('pokemoSearchInput').value
    let nextButton = document.getElementById('nextButton')
    let lastButton = document.getElementById('getLastButton')
    if (pokemonToFind.length > 2) {
        let foundPokemons = fetchedNamesArray.filter(name => name.includes(pokemonToFind))
        searchBar = true;
        renderFoundPokemon(foundPokemons);
    }
    if (pokemonToFind.length < 2) {
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
    let nextButton = document.getElementById('nextButton')
    let lastButton = document.getElementById('getLastButton')
    renderContent.innerHTML = "";
    foundPokemonsArray = [];

    changeAttributesOfButton(nextButton, lastButton)
    changeAttributesOfButton(lastButton, nextButton)
    loadingSpinnerOnOff();

    for (let indexOfFound = 0; indexOfFound < foundPokemons.length; indexOfFound++) {
        console.log(foundPokemons[indexOfFound]);

        let SPECIFIC_POKE_URL = "https://pokeapi.co/api/v2/pokemon/" + foundPokemons[indexOfFound]
        let capitalizedPokeName = capitalizeFirstLetter(foundPokemons[indexOfFound])
        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);

        foundPokemonsArray.push(pokeObject)
        renderContent.innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName, indexOfFound)
        getSinglePokeData(pokeObject, indexOfFound)
    }
    setTimeout(loadingSpinnerOnOff, 500);
}

async function getPokeCard() {
    let response = await fetch(BASE_URL + ".json");
    responseToJson = await response.json();
    next_URL_Array += responseToJson.next
    loadingSpinnerOnOff();

    console.log(responseToJson)
    document.getElementById('renderContent').innerHTML = "";

    for (let index = 0; index < responseToJson.results.length; index++) {
        // let pokemonName = responseToJson.results[index].name;
        let SPECIFIC_POKE_URL = responseToJson.results[index].url
        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        let capitalizedPokeName = capitalizeFirstLetter(pokeObject.name);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName, index); // index übergebn
        addToArrayIfNotExist(pokeObject, objectsOfAllPokemon)
        getSinglePokeData(pokeObject, index);
    }
    setTimeout(loadingSpinnerOnOff, 500);
}

function loadingSpinnerOnOff() {
    document.getElementById('loadingSpinner').classList.toggle('display_none')
    document.getElementById('renderContent').classList.toggle('display_none')
}

function addToArrayIfNotExist(pokeObject, arrayOfAllPokemon) {
    const doesAlreadyExist = arrayOfAllPokemon.find((item) => item.id === pokeObject.id);

    // Ignore the process
    if (doesAlreadyExist) return arrayOfAllPokemon;
    // Or push the new value
    arrayOfAllPokemon.push(pokeObject);

    return arrayOfAllPokemon;
}

async function getNextPokeStack(overlay, pokeIDInArray) {
    let nextPokeStack = true;
    let lastPokeStack = false;

    let renderContent = document.getElementById('renderContent')
    renderContent.innerHTML = "";
    disableButtons(nextPokeStack, lastPokeStack)
    loadingSpinnerOnOff();

    let nextResponse = await fetch(next_URL_Array + ".json");
    let nextResponseToJson = await nextResponse.json();

    last_URL_Array = nextResponseToJson.previous
    next_URL_Array = nextResponseToJson.next
    objectsOfAllPokemon = [];
    for (let index = 0; index < nextResponseToJson.results.length; index++) {
        let SPECIFIC_POKE_URL = nextResponseToJson.results[index].url

        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        addToArrayIfNotExist(pokeObject, objectsOfAllPokemon)

        let capitalizedPokeName = capitalizeFirstLetter(pokeObject.name);
        renderContent.innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName, index);
        getSinglePokeData(pokeObject, index);

    }
    setTimeout(loadingSpinnerOnOff, 500);
    setTimeout(enableButtons, 500)
    if (overlay) {
        let overlayDiv = document.getElementById('overlay')
        setTimeout(enableOverlayButtons(objectsOfAllPokemon.length - 1), 500)
        overlayDiv.innerHTML = "";
        openOverlayPokeCard(0)
    }
}

async function getLastPokeStack() {
    let lastResponse = await fetch(last_URL_Array + ".json");
    let lastResponseToJson = await lastResponse.json();
    let nextPokeStack = false;
    let lastPokeStack = true;
    disableButtons(nextPokeStack, lastPokeStack)
    loadingSpinnerOnOff();
    // console.log(lastResponseToJson.previous)
    last_URL_Array = lastResponseToJson.previous
    next_URL_Array = lastResponseToJson.next
    document.getElementById('renderContent').innerHTML = "";
    objectsOfAllPokemon = [];
    for (let index = 0; index < lastResponseToJson.results.length; index++) {
        // let pokemonName = lastResponseToJson.results[index].name;
        let SPECIFIC_POKE_URL = lastResponseToJson.results[index].url

        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        addToArrayIfNotExist(pokeObject, objectsOfAllPokemon)
        let capitalizedPokeName = capitalizeFirstLetter(pokeObject.name);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName, index);
        getSinglePokeData(pokeObject, index);

    }
    setTimeout(loadingSpinnerOnOff, 50);
    setTimeout(enableButtons, 50)
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