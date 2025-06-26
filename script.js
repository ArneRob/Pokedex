
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=22&offset=0."
const INDEX_URL = "https://pokeapi.co/api/v2/pokedex/"
const ALL_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0."

function onload() {
    getPokeCard();
    fetchAllNames()
}

function reFresh() {
    window.location.reload()
}

async function fetchAllNames() {
    let pokeNameResponse = await fetch(ALL_URL + "json")
    let pokeNameResponseToJSON = await pokeNameResponse.json();
    let fetchedPokeObjects = pokeNameResponseToJSON.results
    fetchedPokemons = pokeNameResponseToJSON.results
    pushNamesToArray(fetchedPokeObjects)
    console.log(pokeNameResponseToJSON);

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
    if (pokemonToFind.length > 2) {
        let foundPokemons = fetchedNamesArray.filter(name => name.includes(pokemonToFind))
        console.log(foundPokemons);
        renderFoundPokemon(foundPokemons);
    }
    if (pokemonToFind.length < 1) {
         getPokeCard()
    }

}

async function renderFoundPokemon(foundPokemons) {
    let renderContent = document.getElementById('renderContent')
    renderContent.innerHTML = "";
    console.log(foundPokemons);
    for (let indexOfFound = 0; indexOfFound < foundPokemons.length; indexOfFound++) {
        console.log(foundPokemons[indexOfFound]);

        let SPECIFIC_POKE_URL = "https://pokeapi.co/api/v2/pokemon/" + foundPokemons[indexOfFound]
        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        console.log(pokeObject);
        renderContent.innerHTML += getPokedexCardTemplate(pokeObject, pokeObject.name)
        getSinglePokeData(pokeObject, indexOfFound)
    }
}

async function getPokeCard() {
    let response = await fetch(BASE_URL + ".json");
    responseToJson = await response.json();
    next_URL_Array += responseToJson.next
    console.log(responseToJson)
    document.getElementById('renderContent').innerHTML = "";

    for (let index = 0; index < responseToJson.results.length; index++) {
        let pokemonName = responseToJson.results[index].name;
        let SPECIFIC_POKE_URL = responseToJson.results[index].url
        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        let capitalizedPokeName = capitalizeFirstLetter(pokeObject);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName);
        addToArrayIfNotExist(pokeObject, ObjectsOfAllPokemon)
        getSinglePokeData(pokeObject, index);
    }
}

function capitalizeFirstLetter(pokeObject) {
    return String(pokeObject.name).charAt(0).toUpperCase() + String(pokeObject.name).slice(1);
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
    // console.log(SPECIFIC_POKE_URL)
    // console.log(pokeDataResponseToJson)
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
    // console.log("das soll die id werden: ", singlePokeObject)

    return singlePokeObject

}


function setPokeImg(pokeImg, pokeObject) {
    let pokeImgDiv = document.getElementById(`pokemonImg${pokeObject.id}`)
    pokeImgDiv.src = pokeImg
}

async function getNextPokeStack() {
    disableButtons()
    let nextResponse = await fetch(next_URL_Array + ".json");
    let nextResponseToJson = await nextResponse.json();
    // console.log(nextResponseToJson)

    last_URL_Array = nextResponseToJson.previous
    next_URL_Array = nextResponseToJson.next
    document.getElementById('renderContent').innerHTML = "";

    for (let index = 0; index < nextResponseToJson.results.length; index++) {
        let pokemonName = nextResponseToJson.results[index].name;
        let SPECIFIC_POKE_URL = nextResponseToJson.results[index].url

        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        addToArrayIfNotExist(pokeObject, ObjectsOfAllPokemon)
        let capitalizedPokeName = capitalizeFirstLetter(pokeObject);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName);
        getSinglePokeData(pokeObject, index);

    }
    // console.log(ObjectsOfAllPokemon)
    setTimeout(enableButtons, 150)
}



function disableButtons() {
    document.getElementById('nextButton').disabled = true
    document.getElementById('getLastButton').disabled = true
}

function enableButtons() {
    document.getElementById('nextButton').disabled = false
    document.getElementById('getLastButton').disabled = false
}

async function getLastPokeStack() {
    let lastResponse = await fetch(last_URL_Array + ".json");
    let lastResponseToJson = await lastResponse.json();

    // console.log(lastResponseToJson.previous)
    last_URL_Array = lastResponseToJson.previous
    next_URL_Array = lastResponseToJson.next
    document.getElementById('renderContent').innerHTML = "";

    for (let index = 0; index < lastResponseToJson.results.length; index++) {
        let pokemonName = lastResponseToJson.results[index].name;
        let SPECIFIC_POKE_URL = lastResponseToJson.results[index].url

        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        addToArrayIfNotExist(pokeObject, ObjectsOfAllPokemon)
        let capitalizedPokeName = capitalizeFirstLetter(pokeObject);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName);
        getSinglePokeData(pokeObject, index);

    }
    // console.log(ObjectsOfAllPokemon)

}
function setTypeOfPokemon(pokeObject) {
    let pokeTypes = pokeObject.types
    // console.log("poketype", pokeTypes);

    for (let typeIndex = 0; typeIndex < pokeTypes.length; typeIndex++) {

        // setColorTypeOfPokemon(pokeTypes, pokeObject, typeIndex)

        if (pokeTypes.length == 1) {
            document.getElementById(`pokeTypes${pokeObject.id}`).innerHTML += getPokeTypeOneIMGTemplate(pokeObject);
            document.getElementById(`typ1-${pokeObject.id}`).src = "./assets/icons/" + pokeTypes[typeIndex].type.name + ".svg"
            addTypColorClass(pokeObject, typeIndex)
        }
        if (pokeTypes.length == 2) {
            document.getElementById(`pokeTypes${pokeObject.id}`).innerHTML += getPokeTypeOneIMGTemplate(pokeObject);
            document.getElementById(`typ1-${pokeObject.id}`).src = "./assets/icons/" + pokeTypes[0].type.name + ".svg"
            document.getElementById(`pokeTypes${pokeObject.id}`).innerHTML += getPokeTypeTwoIMGTemplate(pokeObject);
            document.getElementById(`typ2-${pokeObject.id}`).src = "./assets/icons/" + pokeTypes[1].type.name + ".svg"
            addTypColorClass(pokeObject, typeIndex)
            // setColorTypeOfPokemon(pokeTypes, pokeObject, typeIndex)
            { break; }
        }

    }
}


function addTypColorClass(pokeObject, typeIndex) {
    document.getElementById(`pokemonImg${pokeObject.id}`).classList.add(`${pokeObject.types[typeIndex].type.name}`)
    document.getElementById(`typ1-${pokeObject.id}`).classList.add(`${pokeObject.types[0].type.name}`)
    if (pokeObject.types.length > 1) {
        document.getElementById(`typ2-${pokeObject.id}`).classList.add(`${pokeObject.types[1].type.name}`)
    }
}


// ------------------------------------------Overlay---------------------------------------------------


function closeOverlay() {
    let overlayDiv = document.getElementById('overlay')
    let body = document.getElementById('body')
    body.style.overflow = "scroll";
    overlayDiv.innerHTML = "";
    overlayDiv.classList.add('display_none')
}

function openOverlayPokeCard(pokeID) {
    let pokeObjectInArray = ObjectsOfAllPokemon[pokeID - 1] /* pokeID - 1 gets the Array Number*/
    let overlayDiv = document.getElementById('overlay')
    let pokeIDInArray = pokeID;
    let body = document.getElementById('body')
    body.style.overflow = "hidden";
    overlayDiv.classList.remove('display_none')
    let capitalizedPokeName = capitalizeFirstLetter(pokeObjectInArray)
    overlayDiv.innerHTML += getPokeOverlayTemplate(pokeObjectInArray, capitalizedPokeName, pokeIDInArray)
    // grayOutArrowIfEndOfPokeStack(pokeID)
    setTypeOfPokemonInOverlay(pokeObjectInArray)
}

function capitalizeFirstLetter(pokeObjectInArray) {
    return String(pokeObjectInArray.name).charAt(0).toUpperCase() + String(pokeObjectInArray.name).slice(1);
}


function setTypeOfPokemonInOverlay(pokeObjectInArray) {
    let pokeTypes = pokeObjectInArray.types

    for (let typeIndex = 0; typeIndex < pokeTypes.length; typeIndex++) {

        // setColorTypeOfPokemon(pokeTypes, pokeObject, typeIndex)

        if (pokeTypes.length == 1) {
            document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML += getPokeTypeOneOverlayTemplate(pokeObjectInArray);
            // document.getElementById(`typ1-Overlay${pokeObjectInArray.id}`).src = "./assets/icons/" + pokeTypes[typeIndex].type.name + ".svg"
            addTypColorClassInOverlay(pokeObjectInArray, typeIndex)
        }
        if (pokeTypes.length == 2) {
            document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML += getPokeTypeOneOverlayTemplate(pokeObjectInArray);
            // document.getElementById(`typ1-Overlay${pokeObjectInArray.id}`).src = "./assets/icons/" + pokeTypes[0].type.name + ".svg"
            document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML += getPokeTypeTwoOverlayTemplate(pokeObjectInArray);
            // document.getElementById(`typ2-Overlay${pokeObjectInArray.id}`).src = "./assets/icons/" + pokeTypes[1].type.name + ".svg"
            addTypColorClassInOverlay(pokeObjectInArray, typeIndex)
            // setColorTypeOfPokemon(pokeTypes, pokeObject, typeIndex)
            { break; }
        }

    }
}

function addTypColorClassInOverlay(pokeObjectInArray, typeIndex) {
    document.getElementById(`pokemonCard${pokeObjectInArray.id}`).classList.add(`${pokeObjectInArray.types[typeIndex].type.name}`)
    document.getElementById(`typ1-Overlay${pokeObjectInArray.id}`).classList.add(`${pokeObjectInArray.types[0].type.name}`)
    if (pokeObjectInArray.types.length > 1) {
        document.getElementById(`typ2-Overlay${pokeObjectInArray.id}`).classList.add(`${pokeObjectInArray.types[1].type.name}`)
    }
}

function getNextOverlayPokemon(pokeIDInArray) {

    if (ObjectsOfAllPokemon.length > pokeIDInArray) {
        let nextPokeID = pokeIDInArray + 1
        let overlayDiv = document.getElementById('overlay')

        overlayDiv.innerHTML = "";
        openOverlayPokeCard(nextPokeID)
    } else {
        getNextPokeStack()
    }
}

function getLastOverlayPokemon(pokeIDInArray) {


    if (1 < pokeIDInArray) {
        let nextPokeID = pokeIDInArray - 1
        let overlayDiv = document.getElementById('overlay')
        overlayDiv.innerHTML = "";
        openOverlayPokeCard(nextPokeID)
    }
}


// function grayOutArrowIfEndOfPokeStack(nextPokeID) {
//     let arrowBackwards = document.getElementById('arrowBackwards')

//     if (nextPokeID == 1) {
//         arrowBackwards.style.filter = "brightness(40%)";
//         arrowBackwards.classList.remove('arrowBackwardsHover')
//     }
//     if (nextPokeID > 1) {
//         arrowBackwards.style.filter = "brightness(100%)";
//         arrowBackwards.classList.add('arrowBackwardsHover')
//     }
// }