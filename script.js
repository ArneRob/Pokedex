

const INDEX_URL = "https://pokeapi.co/api/v2/pokedex/"
const ALL_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0."
let searchBar = false;

function onload() {
    const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=22&offset=0."
    getPokeCard(BASE_URL);
    fetchAllNamesAndURL()
}

function renderBigStack() {
    resetAllArrays()
    fetchAllNamesAndURL()
    let BIG_URL = "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0."
    getPokeCard(BIG_URL);
}

function reFresh() {
    location.reload();
    // let nextButton = document.getElementById('nextButton')
    // let lastButton = document.getElementById('getLastButton')
    // document.getElementById('pokemoSearchInput').value = "";
    // resetAllArrays()
    // searchBar = false;
    // onload();
    // resetButtonsAttributes(nextButton, lastButton)
    // enableButtons();
}

function resetAllArrays() {
    objectsOfAllPokemon = [];
    next_URL_Array = [];
    last_URL_Array = [];
    fetchedNamesArray = [];
    fetchedPokemonsNAME_URL = [];
    foundPokemonsArray = [];
    evolutionChainLink = [];
    evoNamesArray = [];
    changeAbleObjectOfAllPokemon = [];
    URL = [];
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
    let toLowerCaseValue = pokemonToFind.toLowerCase();

    if (pokemonToFind.length > 2 && isNaN(pokemonToFind)) {
        let foundPokemons = fetchedNamesArray.filter(name => name.includes(toLowerCaseValue))
        searchBar = true;
        if (foundPokemons.length > 0) {
            renderFoundPokemon(foundPokemons);
        } else {
            renderPokemonNoTFound();
        }
    } else if (pokemonToFind.length > 0 && !isNaN(pokemonToFind) && pokemonToFind <= fetchedNamesArray.length) {
        findPokemonWithIndexAndFetch(pokemonToFind)
    } else if (pokemonToFind > 1) {
        renderPokemonNoTFound();
    }
}

async function findPokemonWithIndexAndFetch(pokemonToFind) {
    let parsedNumber = parseInt(pokemonToFind)
    let indexNumber = parsedNumber - 1
    let foundPokemons = [fetchedNamesArray[indexNumber]]
    searchBar = true;
    renderFoundPokemon(foundPokemons)
}

function renderPokemonNoTFound() {
    let renderSpot = document.getElementById('renderContent')
    renderSpot.innerHTML = "";
    renderSpot.innerHTML += getNothingFoundTemplate()
}

function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

let processChanges = debounce(() => findPokemon());

async function renderFoundPokemon(foundPokemons) {
    let renderContent = document.getElementById('renderContent')
    let nextButton = document.getElementById('nextButton')
    let lastButton = document.getElementById('getLastButton')
    renderContent.innerHTML = "";
    foundPokemonsArray = [];
    disableSearchbar()
    changeAttributesOfButton(nextButton, lastButton)
    changeAttributesOfButton(lastButton, nextButton)
    loadingSpinnerOnOff();
    await changeInnerHTMLRenderContentOfFoundPokemon(foundPokemons)
    setTimeout(loadingSpinnerOnOff, 50);
    disableSearchbar()
}

async function changeInnerHTMLRenderContentOfFoundPokemon(foundPokemons) {
    for (let indexOfFound = 0; indexOfFound < foundPokemons.length; indexOfFound++) {
        let SPECIFIC_POKE_URL = "https://pokeapi.co/api/v2/pokemon/" + foundPokemons[indexOfFound]
        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        let capitalizedPokeName = capitalizeFirstLetter(foundPokemons[indexOfFound])

        foundPokemonsArray.push(pokeObject)
        loadingCircle(foundPokemonsArray, foundPokemons.length)
        renderContent.innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName, indexOfFound)
        getSinglePokeData(pokeObject, indexOfFound)
    }
}

async function getPokeCard(URL) {
    let response = await fetch(URL + ".json");
    responseToJson = await response.json();
    next_URL_Array += responseToJson.next
    disableSearchbar()
    loadingSpinnerOnOff();
    document.getElementById('renderContent').innerHTML = "";
    await changeInnerHTMLRenderContent(responseToJson.results)
    setTimeout(resetLoadingCircle, 50);
    setTimeout(loadingSpinnerOnOff, 100);
    disableSearchbar()
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

async function renderPokeStack(nextPokeStack) {
    if (nextPokeStack) {
        URL = next_URL_Array
    } else {
        URL = last_URL_Array
    } if (URL == null) {
        URL = 0
    }
    await updateUI(nextPokeStack, URL)
}

async function updateUI(nextPokeStack, URL) {
    if (URL.length >= 2) {
        disableSearchbar()
        disableButtons(nextPokeStack)
        loadingSpinnerOnOff();
        let nextResponseToJson = await getNextOrPreviousPokeStack(URL)
        arrayPreperation(nextResponseToJson)
        await changeInnerHTMLRenderContent(nextResponseToJson.results)
        setTimeout(resetLoadingCircle, 50);
        setTimeout(loadingSpinnerOnOff, 50);
        setTimeout(enableButtons, 50)
        disableSearchbar()
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
        loadingCircle(objectsOfAllPokemon, nextResponseToJsonArray.length)
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
    setSrcOfImg(pokeObject)
    setTypeOfPokemon(pokeObject, index);
}

function setSrcOfImg(pokeObject) {
    let pokeImg = pokeObject.sprites.other.home.front_default
    let secondPokeImg = pokeObject.sprites.front_default
    let thirdPokeImg = pokeObject.sprites.other["official-artwork"].front_default
    let fourthPokeImg = "./assets/img/pokemon-go-1574003_640.png"
    if (pokeImg) {
        setPokeImg(pokeImg, pokeObject)
    } else if (secondPokeImg) {
        setPokeImg(secondPokeImg, pokeObject)
    } else if (thirdPokeImg) {
        setPokeImg(thirdPokeImg, pokeObject)
    } else if (fourthPokeImg) {
        setPokeImg(fourthPokeImg, pokeObject)
    }
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