
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=22&offset=0."
const INDEX_URL = "https://pokeapi.co/api/v2/pokedex/"
const ALL_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0."
let searchBar = false;

function onload() {
    showloadingSpinner();
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
    changeAttributesOfNextButton(nextButton, lastButton)
    changeAttributesOfLastButton(nextButton, lastButton)
    showloadingSpinner();
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
    setTimeout(disableLoadingSpinner, 500);
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
        let capitalizedPokeName = capitalizeFirstLetter(pokeObject.name);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName);
        addToArrayIfNotExist(pokeObject, ObjectsOfAllPokemon)
        getSinglePokeData(pokeObject, index);
    }
    setTimeout(disableLoadingSpinner, 500);
}

function showloadingSpinner() {
    document.getElementById('loadingSpinner').classList.remove('display_none')
    document.getElementById('renderContent').classList.add('display_none')
}

function disableLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.add('display_none')
    document.getElementById('renderContent').classList.remove('display_none')
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

async function getNextPokeStack(overlay, pokeIDInArray) {
    let nextPokeStack = true;
    let lastPokeStack = false;

    document.getElementById('renderContent').innerHTML = "";
    disableButtons(nextPokeStack, lastPokeStack)
    showloadingSpinner();

    let nextResponse = await fetch(next_URL_Array + ".json");
    let nextResponseToJson = await nextResponse.json();

    last_URL_Array = nextResponseToJson.previous
    next_URL_Array = nextResponseToJson.next

    for (let index = 0; index < nextResponseToJson.results.length; index++) {
        let pokemonName = nextResponseToJson.results[index].name;
        let SPECIFIC_POKE_URL = nextResponseToJson.results[index].url

        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        addToArrayIfNotExist(pokeObject, ObjectsOfAllPokemon)
        let capitalizedPokeName = capitalizeFirstLetter(pokeObject.name);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName);
        getSinglePokeData(pokeObject, index);

    }
    setTimeout(disableLoadingSpinner, 500);
    setTimeout(enableButtons, 500)
    if (overlay) {
        setTimeout(enableOverlayButtons, 500)
        getNextOverlayPokemon(pokeIDInArray)
    }
}

// --------------------------------GetNext/GetLast pokeStack Buttons------------------------------------------------

function disableButtons(nextPokeStack, lastPokeStack) {
    let nextButton = document.getElementById('nextButton')
    let lastButton = document.getElementById('getLastButton')

    if (nextPokeStack) {
        changeAttributesOfNextButton(nextButton, lastButton)
        getLoadingSpinnerInButton(nextButton)
    }
    if (lastPokeStack) {
        changeAttributesOfLastButton(nextButton, lastButton)
        getLoadingSpinnerInButton(lastButton)
    }
}




function enableButtons() {
    let nextButton = document.getElementById('nextButton')
    let lastButton = document.getElementById('getLastButton')
    nextButton.disabled = false
    lastButton.disabled = false
    resetButtonsAttributes(nextButton, lastButton)
}



function resetButtonsAttributes(nextButton, lastButton) {
    nextButton.style.transform = "translateY(0px)"
    lastButton.style.transform = "translateY(0px)"
    lastButton.style.backgroundColor = "rgb(4, 169, 109)"
    nextButton.style.backgroundColor = "rgb(4, 169, 109)"

    nextButton.innerHTML = "Nächste Pokemon Stapel"
    lastButton.innerHTML = "Letzte Pokemon Stapel"

    nextButton.style.width = ""
    lastButton.style.width = ""

    nextButton.style.cursor = "pointer"
    lastButton.style.cursor = "pointer"
}



function getLoadingSpinnerInButton(rightButton) {
    let width = rightButton.clientWidth
    console.log(width);
    rightButton.innerHTML = "";

    rightButton.style.width = `${width}` + "px"
    rightButton.innerHTML += "Loading" + getLoadingSpinnerForButtonTemplate();
}

function changeAttributesOfNextButton(nextButton, lastButton) {
    nextButton.disabled = true
    lastButton.disabled = true
    nextButton.style.transform = "translateY(4px)"
    nextButton.style.backgroundColor = "rgb(13, 136, 143)"
    nextButton.style.cursor = "not-allowed"
}

function changeAttributesOfLastButton(nextButton, lastButton) {
    nextButton.disabled = true
    lastButton.disabled = true
    lastButton.style.transform = "translateY(4px)"
    lastButton.style.backgroundColor = "rgb(13, 136, 143)"
    lastButton.style.cursor = "not-allowed"
}



async function getLastPokeStack() {
    let lastResponse = await fetch(last_URL_Array + ".json");
    let lastResponseToJson = await lastResponse.json();
    let nextPokeStack = false;
    let lastPokeStack = true;
    disableButtons(nextPokeStack, lastPokeStack)
    showloadingSpinner();
    // console.log(lastResponseToJson.previous)
    last_URL_Array = lastResponseToJson.previous
    next_URL_Array = lastResponseToJson.next
    document.getElementById('renderContent').innerHTML = "";

    for (let index = 0; index < lastResponseToJson.results.length; index++) {
        // let pokemonName = lastResponseToJson.results[index].name;
        let SPECIFIC_POKE_URL = lastResponseToJson.results[index].url

        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        addToArrayIfNotExist(pokeObject, ObjectsOfAllPokemon)
        let capitalizedPokeName = capitalizeFirstLetter(pokeObject.name);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(pokeObject, capitalizedPokeName);
        getSinglePokeData(pokeObject, index);

    }
    setTimeout(disableLoadingSpinner, 500);
    setTimeout(enableButtons, 500)
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

function openOverlayPokeCard(idOfPokemon, capitalizedPokeName) {

    let overlayDiv = document.getElementById('overlay')
    let body = document.getElementById('body')
    body.style.overflow = "hidden";
    overlayDiv.classList.remove('display_none')

    if (searchBar == false) {
        renderNormalOverlayPokeCard(overlayDiv, idOfPokemon, capitalizedPokeName)
    }
    if (searchBar) {
        renderSearchBarOverlayPokeCard(overlayDiv, idOfPokemon, capitalizedPokeName)
    }
}

function renderNormalOverlayPokeCard(overlayDiv, idOfPokemon) {
    for (let ObjectsOfAllPokemonIndex = 0; ObjectsOfAllPokemonIndex < ObjectsOfAllPokemon.length; ObjectsOfAllPokemonIndex++) {
        if (idOfPokemon == ObjectsOfAllPokemon[ObjectsOfAllPokemonIndex].id) {
            let pokeIDInArray = ObjectsOfAllPokemon[ObjectsOfAllPokemonIndex].id
            let pokeObjectInArray = ObjectsOfAllPokemon[ObjectsOfAllPokemonIndex]

            let capitalizedPokeName = capitalizeFirstLetter(pokeObjectInArray.name)
            overlayDiv.innerHTML += getPokeOverlayTemplate(pokeObjectInArray, capitalizedPokeName, pokeIDInArray)
            setCardCategoryContentOfAbout(pokeIDInArray)
            // setContentOfAbout(pokeObjectInArray, pokeIDInArray)

        }
    }
}

async function setCardCategoryContentOfAbout(pokeIDInArray) {

    let pokeObj = ObjectsOfAllPokemon[pokeIDInArray - 1]

    await setSpeciesOfPokemon(pokeObj, pokeIDInArray)
    setAbilitiesOfPokeCardInOverlay(pokeObj);
    setTypeOfPokemonInOverlay(pokeObj)
}

function setContentOfAbout(species, pokeObjectInArray, pokeIDInArray) {
    // let indexOfRightPokemon = pokeIDInArray - 1
    let renderCategorieContent = document.getElementById(`renderCategorieContent${pokeIDInArray}`)
    renderCategorieContent.innerHTML = "";
    renderCategorieContent.innerHTML += getAboutContentTemplate(pokeObjectInArray, species)
}

function setContentOfBaseStats(pokeIDInArray) {
    let indexOfRightPokemon = pokeIDInArray - 1
    let renderCategorieContent = document.getElementById(`renderCategorieContent${pokeIDInArray}`)
    let pokeObjStats = ObjectsOfAllPokemon[indexOfRightPokemon].stats
    renderCategorieContent.innerHTML = "";
    console.log(pokeObjStats);
    renderCategorieContent.innerHTML += getBaseStatsContentTemplate(pokeObjStats)
    calcBaseStatColorBar()
}

function calcBaseStatColorBar() {
    let baseStats = document.getElementsByClassName('baseStats')
    let progressColor = document.getElementsByClassName('progressColor')

    for (let index = 0; index < baseStats.length; index++) {
        console.log(baseStats[index].innerHTML);
        let baseStat = baseStats[index].innerHTML
        let hundredPercent = 400

        let percentValue = baseStat * 100 / hundredPercent
        
        console.log("percent: ", parseInt(percentValue));

        progressColor[index].style.width = parseInt(percentValue) + "%"
        
    }
}

async function setSpeciesOfPokemon(pokeObjectInArray, pokeIDInArray) {
    let pokeID = pokeObjectInArray.id
    const SPECIES_URL = `https://pokeapi.co/api/v2/pokemon-species/${pokeID}/`

    let speciesResponse = await fetch(SPECIES_URL);
    let speciesResponseToJson = await speciesResponse.json();
    let species = speciesResponseToJson.genera[7].genus

    console.log(species);
    setContentOfAbout(species, pokeObjectInArray, pokeIDInArray)

}

// function renderCategorieContent(species, pokeIDInArray) {
//     let renderCategorieContent = document.getElementById(`renderCategorieContent${pokeIDInArray}`)

//     renderCategorieContent.innerHTML += species
// }

function renderSearchBarOverlayPokeCard(overlayDiv, idOfPokemon, capitalizedPokeName) {

    let foundPokemonIndex = getIndexOfPokemon(idOfPokemon);

    overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[foundPokemonIndex], capitalizedPokeName, foundPokemonIndex)
    setAbilitiesOfPokeCardInOverlay(foundPokemonsArray[foundPokemonIndex]);
    setTypeOfPokemonInOverlay(foundPokemonsArray[foundPokemonIndex])
}

function getIndexOfPokemon(idOfPokemon) {
    for (let index = 0; index < foundPokemonsArray.length; index++) {
        if (idOfPokemon == foundPokemonsArray[index].id) {

            let foundPokemonIndex = index
            return foundPokemonIndex
        }
    }
}

function getNextSearchBarOverlayPokemon(foundPokemonIndex) {
    let overlayDiv = document.getElementById('overlay')
    let nextFoundPokemonIndex = foundPokemonIndex + 1
    overlayDiv.innerHTML = "";

    if (foundPokemonIndex < foundPokemonsArray.length - 1) {
        let capitalizedPokeName = capitalizeFirstLetter(foundPokemonsArray[nextFoundPokemonIndex].name)
        overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[nextFoundPokemonIndex], capitalizedPokeName, nextFoundPokemonIndex)
        setAbilitiesOfPokeCardInOverlay(foundPokemonsArray[nextFoundPokemonIndex]);
        setTypeOfPokemonInOverlay(foundPokemonsArray[nextFoundPokemonIndex])
    }
    if (foundPokemonIndex >= foundPokemonsArray.length - 1) {
        nextFoundPokemonIndex = 0
        let capitalizedPokeName = capitalizeFirstLetter(foundPokemonsArray[nextFoundPokemonIndex].name)
        overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[nextFoundPokemonIndex], capitalizedPokeName, nextFoundPokemonIndex)
        setAbilitiesOfPokeCardInOverlay(foundPokemonsArray[nextFoundPokemonIndex]);
        setTypeOfPokemonInOverlay(foundPokemonsArray[nextFoundPokemonIndex])
    }
}


function getLastSearchBarOverlayPokemon(foundPokemonIndex) {
    let overlayDiv = document.getElementById('overlay')
    let lastFoundPokemonIndex = foundPokemonIndex - 1

    overlayDiv.innerHTML = "";
    if (foundPokemonIndex > 0) {
        let capitalizedPokeName = capitalizeFirstLetter(foundPokemonsArray[lastFoundPokemonIndex].name)
        overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[lastFoundPokemonIndex], capitalizedPokeName, lastFoundPokemonIndex)
        setAbilitiesOfPokeCardInOverlay(foundPokemonsArray[lastFoundPokemonIndex]);
        setTypeOfPokemonInOverlay(foundPokemonsArray[lastFoundPokemonIndex])
    }
    if (foundPokemonIndex <= 0) {
        lastFoundPokemonIndex = foundPokemonsArray.length - 1
        let capitalizedPokeName = capitalizeFirstLetter(foundPokemonsArray[lastFoundPokemonIndex].name)
        overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[lastFoundPokemonIndex], capitalizedPokeName, lastFoundPokemonIndex)
        setAbilitiesOfPokeCardInOverlay(foundPokemonsArray[lastFoundPokemonIndex]);
        setTypeOfPokemonInOverlay(foundPokemonsArray[lastFoundPokemonIndex])
    }
}

function setAbilitiesOfPokeCardInOverlay(pokeObjectInArray) {
    let abilityRenderSpot = document.getElementById(`abilities${pokeObjectInArray.id}`)
    let abilities = pokeObjectInArray.abilities
    abilityRenderSpot.innerHTML = "";

    for (let abilityIndex = 0; abilityIndex < abilities.length; abilityIndex++) {
        abilityRenderSpot.innerHTML += pokeObjectInArray.abilities[abilityIndex].ability.name + ", "
    }
}

function setTypeOfPokemonInOverlay(pokeObjectInArray) {
    let pokeTypes = pokeObjectInArray.types

    for (let typeIndex = 0; typeIndex < pokeTypes.length; typeIndex++) {

        if (pokeTypes.length == 1) {
            document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML = "";
            document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML += getPokeTypeOneOverlayTemplate(pokeObjectInArray);
            addTypColorClassInOverlay(pokeObjectInArray, typeIndex)
        }
        if (pokeTypes.length == 2) {
            document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML = "";
            document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML += getPokeTypeOneOverlayTemplate(pokeObjectInArray);
            document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML += getPokeTypeTwoOverlayTemplate(pokeObjectInArray);
            addTypColorClassInOverlay(pokeObjectInArray, typeIndex)
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
    let nextOverlayPokemon = true;
    let lastOverlayPokemon = false;
    let overlay = true

    disableOverlayButtons(nextOverlayPokemon, lastOverlayPokemon)

    if (ObjectsOfAllPokemon.length > pokeIDInArray) {
        let nextPokeID = pokeIDInArray + 1
        let overlayDiv = document.getElementById('overlay')

        overlayDiv.innerHTML = "";
        openOverlayPokeCard(nextPokeID)
    } else {
        getNextPokeStack(overlay, pokeIDInArray)
    }
    overlay = false;
}

function getLastOverlayPokemon(pokeIDInArray) {
    let nextOverlayPokemon = false;
    let lastOverlayPokemon = true;

    disableOverlayButtons(nextOverlayPokemon, lastOverlayPokemon)

    if (1 < pokeIDInArray) {
        let nextPokeID = pokeIDInArray - 1
        let overlayDiv = document.getElementById('overlay')
        overlayDiv.innerHTML = "";
        openOverlayPokeCard(nextPokeID)
    }

    setTimeout(enableOverlayButtons, 500)
}

function disableOverlayButtons(nextOverlayPokemon, lastOverlayPokemon) {
    let nextOverlayButton = document.getElementById('arrowForwardOverlay')
    let lastOverlayButton = document.getElementById('arrowBackwardOverlay')

    if (nextOverlayPokemon) {
        changeAttributesOfNextOverlayButton(nextOverlayButton, lastOverlayButton)
        getLoadingSpinnerInOverlayButton(nextOverlayButton)
    }
    if (lastOverlayPokemon) {
        changeAttributesOfLastOverlayButton(nextOverlayButton, lastOverlayButton)
        getLoadingSpinnerInOverlayButton(lastOverlayButton)
    }
}
function enableOverlayButtons() {
    let nextOverlayButton = document.getElementById('arrowForwardOverlay')
    let lastOverlayButton = document.getElementById('arrowBackwardOverlay')
    nextOverlayButton.disabled = false
    lastOverlayButton.disabled = false

    resetOverlayButtonsAttributes(nextOverlayButton, lastOverlayButton)
}

function changeAttributesOfNextOverlayButton(nextOverlayButton, lastOverlayButton) {
    nextOverlayButton.disabled = true
    lastOverlayButton.disabled = true
}

function changeAttributesOfLastOverlayButton(nextOverlayButton, lastOverlayButton) {
    nextOverlayButton.disabled = true
    lastOverlayButton.disabled = true
}

function resetOverlayButtonsAttributes(nextOverlayButton, lastOverlayButton) {
    nextOverlayButton.src = "./assets/img/arrow_forward_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
    lastOverlayButton.src = "./assets/img/arrow_back_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";

    nextOverlayButton.classList.remove('loadingSpinnerInButton', 'disabled')
    lastOverlayButton.classList.remove('loadingSpinnerInButton', 'disabled')
}

function getLoadingSpinnerInOverlayButton(rightButton) {
    rightButton.classList.add('loadingSpinnerInButton')
    rightButton.classList.add('disabled')
    rightButton.src = "./assets/img/pokemon-6046746_640.png";
}

function stopEventBubbling(event) {
    event.stopPropagation()
}