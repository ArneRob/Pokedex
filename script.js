
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
    await changeInnerHTMLRenderContentOfFoundPokemon(foundPokemons)
    setTimeout(loadingSpinnerOnOff, 50);
}

async function changeInnerHTMLRenderContentOfFoundPokemon(foundPokemons) {
    for (let indexOfFound = 0; indexOfFound < foundPokemons.length; indexOfFound++) {
        let SPECIFIC_POKE_URL = "https://pokeapi.co/api/v2/pokemon/" + foundPokemons[indexOfFound]
        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        let capitalizedPokeName = capitalizeFirstLetter(foundPokemons[indexOfFound])

        foundPokemonsArray.push(pokeObject)
        renderContent.innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName, indexOfFound)
        getSinglePokeData(pokeObject, indexOfFound)
    }
}

async function getPokeCard() {
    let response = await fetch(BASE_URL + ".json");
    responseToJson = await response.json();
    next_URL_Array += responseToJson.next
    loadingSpinnerOnOff();
    document.getElementById('renderContent').innerHTML = "";
    await changeInnerHTMLRenderContent(responseToJson.results)
    setTimeout(loadingSpinnerOnOff, 50);
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

async function renderPokeStack(nextPokeStack, URL) {
    if (nextPokeStack) {
        URL = next_URL_Array
    } else {
        URL = last_URL_Array
    }
    await updateUI(nextPokeStack, URL)
}

async function updateUI(nextPokeStack, URL) {
    if (URL) {
        disableButtons(nextPokeStack)
        loadingSpinnerOnOff();
        let nextResponseToJson = await getNextOrPreviousPokeStack(URL)
        arrayPreperation(nextResponseToJson)
        await changeInnerHTMLRenderContent(nextResponseToJson.results)
        setTimeout(loadingSpinnerOnOff, 50);
        setTimeout(enableButtons, 50)
    }
}

async function changeInnerHTMLRenderContent(nextResponseToJsonArray) {
    let renderContent = document.getElementById('renderContent')
    renderContent.innerHTML = "";
    for (let index = 0; index < nextResponseToJsonArray.length; index++) {
        let SPECIFIC_POKE_URL = nextResponseToJsonArray[index].url
        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        let capitalizedPokeName = capitalizeFirstLetter(pokeObject.name);

        objectsOfAllPokemon.push(pokeObject)
        renderContent.innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName, index);
        getSinglePokeData(pokeObject, index);
    }
}

function arrayPreperation(nextResponseToJson) {
    last_URL_Array = nextResponseToJson.previous
    next_URL_Array = nextResponseToJson.next
    objectsOfAllPokemon = [];
}

async function getNextOrPreviousPokeStack(URL) {
    let nextResponse = await fetch(URL + ".json");
    let nextResponseToJson = await nextResponse.json();
    return nextResponseToJson
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