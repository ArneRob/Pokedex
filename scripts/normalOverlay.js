
function renderNormalOverlayPokeCard(overlayDiv, idOfPokemon) {
    for (let objectsOfAllPokemonIndex = 0; objectsOfAllPokemonIndex < objectsOfAllPokemon.length; objectsOfAllPokemonIndex++) {
        if (idOfPokemon == objectsOfAllPokemon[objectsOfAllPokemonIndex].id) {
            let pokeIDInArray = objectsOfAllPokemon[objectsOfAllPokemonIndex].id
            let pokeObjectInArray = objectsOfAllPokemon[objectsOfAllPokemonIndex]

            let capitalizedPokeName = capitalizeFirstLetter(pokeObjectInArray.name)
            overlayDiv.innerHTML += getPokeOverlayTemplate(pokeObjectInArray, capitalizedPokeName, pokeIDInArray, objectsOfAllPokemonIndex)
            displayNone("pokemonCard", pokeIDInArray)
            setCardCategoryContentOfAbout(objectsOfAllPokemonIndex, 1)
        }
    }
}

async function setCardCategoryContentOfAbout(objectsOfAllPokemonIndex, contentStatus) {
    setActiveClassState(objectsOfAllPokemonIndex, contentStatus)
    let pokeObj = objectsOfAllPokemon[objectsOfAllPokemonIndex]
    await setSpeciesOfPokemon(pokeObj, objectsOfAllPokemonIndex)
    setAbilitiesOfPokeCardInOverlay(pokeObj);
    setTypeOfPokemonInOverlay(pokeObj)
    pushInWhenLoaded(objectsOfAllPokemonIndex, objectsOfAllPokemon)
    setActiveClassState(objectsOfAllPokemonIndex, contentStatus)
}

function findPositionOfPokemon(array, pokeIDInArray) {
    for (let index = 0; index < array.length; index++) {
        if (pokeIDInArray == array[index].id) {
            let currentPokeCardID = array[index].id
            let nextPokeCardID = array[index + 1].id
            let lastPokeCardID = array[index - 1].id

            return [lastPokeCardID, currentPokeCardID, nextPokeCardID]
        }
    }
}

function pushInWhenLoaded(pokemonIndex, array) {

    let nextID = array[pokemonIndex].id
    let lastIndex = pokemonIndex - 1
    // let nextIndex = pokemonIndex + 1
    let nextpokeCard = document.getElementById(`pokemonCard${nextID}`)

    if (lastIndex >= 0) {
        let lastPokeCard = document.getElementById(`pokemonCard${array[lastIndex].id}`)
        if (lastPokeCard) {
            lastPokeCard.remove()
        }
    }
    if (lastIndex == -1) {
        lastIndex = array.length - 1
        let lastPokeCard = pokeCard = document.getElementById(`pokemonCard${array[lastIndex].id}`)
        if (lastPokeCard) {
            lastPokeCard.remove()
        }
    }
    nextpokeCard.classList.remove('display_none')
}

function setContentOfBaseStats(objectsOfAllPokemonIndex, contentStatus) {
    setActiveClassState(objectsOfAllPokemonIndex, contentStatus)

    let renderCategorieContent = document.getElementById(`renderCategorieContent${objectsOfAllPokemonIndex}`)
    let pokeObjStats = objectsOfAllPokemon[objectsOfAllPokemonIndex].stats
    renderCategorieContent.innerHTML = "";
    renderCategorieContent.classList.remove('evolutionImgs')
    renderCategorieContent.innerHTML += getBaseStatsContentTemplate(pokeObjStats)
    addTypColorClassInOverlayProgressBar(objectsOfAllPokemonIndex, objectsOfAllPokemon)
    calcBaseStatColorBar()
    setActiveClassState(objectsOfAllPokemonIndex, contentStatus)
}

function calcBaseStatColorBar() {
    let baseStats = document.getElementsByClassName('baseStats')
    let progressColor = document.getElementsByClassName('progressColor')

    for (let index = 0; index < baseStats.length; index++) {
        console.log(baseStats[index].innerHTML);
        let baseStat = baseStats[index].innerHTML
        let hundredPercent = 300

        let percentValue = baseStat * 100 / hundredPercent

        console.log("percent: ", parseInt(percentValue));

        progressColor[index].style.width = parseInt(percentValue) + "%"

    }
}

async function setSpeciesOfPokemon(pokeObjectInArray, objectsOfAllPokemonIndex) {
    let pokeID = pokeObjectInArray.id
    const SPECIES_URL = `https://pokeapi.co/api/v2/pokemon-species/${pokeID}/`

    let speciesResponse = await fetch(SPECIES_URL);
    let speciesResponseToJson = await speciesResponse.json();
    let species = speciesResponseToJson.genera[7].genus
    evolutionChainLink = speciesResponseToJson.evolution_chain.url
    setContentOfAbout(species, pokeObjectInArray, objectsOfAllPokemonIndex)

}

function getIndexOfPokemon(idOfPokemon) {
    for (let index = 0; index < foundPokemonsArray.length; index++) {
        if (idOfPokemon == foundPokemonsArray[index].id) {

            let foundPokemonIndex = index
            return foundPokemonIndex
        }
    }
}

function getNextOverlayPokemon(pokeIDInArray, pokemonName, objectsOfAllPokemonIndex) {
    let nextOverlayPokemon = true;
    let lastOverlayPokemon = false;
    let overlay = true
    let overlayDiv = document.getElementById('overlay')

    disableOverlayButtons(nextOverlayPokemon, lastOverlayPokemon)
    deleteEvoChainImgs(objectsOfAllPokemonIndex)
    if (objectsOfAllPokemon.length > pokeIDInArray) {
        let nextPokeID = pokeIDInArray + 1
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

    toggleAttributesOfButtonToDisabled(nextOverlayButton, lastOverlayButton)
    if (nextOverlayPokemon) {
        getLoadingSpinnerInOverlayButton(nextOverlayButton)
    }
    if (lastOverlayPokemon) {
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

function toggleAttributesOfButtonToDisabled(nextOverlayButton, lastOverlayButton, extraButton) {
    // nextOverlayButton.disabled = true
    // lastOverlayButton.disabled = true
    nextOverlayButton.classList.toggle('disabled')
    lastOverlayButton.classList.toggle('disabled')
    if (extraButton) {
        extraButton.classList.toggle('disabled')
    }
}

function resetOverlayButtonsAttributes(nextOverlayButton, lastOverlayButton) {
    nextOverlayButton.src = "./assets/img/arrow_forward_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
    lastOverlayButton.src = "./assets/img/arrow_back_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";

    nextOverlayButton.classList.remove('loadingSpinnerInButton', 'disabled')
    lastOverlayButton.classList.remove('loadingSpinnerInButton', 'disabled')
}

function getLoadingSpinnerInOverlayButton(rightButton) {
    rightButton.classList.add('loadingSpinnerInButton')
    rightButton.src = "./assets/img/pokemon-6046746_640.png";
}

function stopEventBubbling(event) {
    event.stopPropagation()
}

