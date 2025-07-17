function openOverlayPokeCard(index) {

    let overlayDiv = document.getElementById('overlay')
    let body = document.getElementById('body')
    body.style.overflow = "hidden";
    overlayDiv.classList.remove('display_none')

    if (searchBar == false) {
        let capitalizedPokeName = capitalizeFirstLetter(objectsOfAllPokemon[index].name)
        renderNormalOverlayPokeCard(overlayDiv, index, capitalizedPokeName)
    }
    if (searchBar) {
        let capitalizedPokeName = capitalizeFirstLetter(foundPokemonsArray[index].name)
        renderSearchBarOverlayPokeCard(overlayDiv, index, capitalizedPokeName) 
    }
}

function closeOverlay() {
    let overlayDiv = document.getElementById('overlay')
    let body = document.getElementById('body')
    body.style.overflow = "scroll";
    overlayDiv.innerHTML = "";
    overlayDiv.classList.add('display_none')
}

function renderNextOverlayPokemon(index, array) {
    let nextIndex = index + 1
    let nextOverlayPokemon = true;
    let lastOverlayPokemon = false;

    if (array == 'objectsOfAllPokemon') {
        array = objectsOfAllPokemon
    }
    if (array == 'foundPokemonsArray') {
        array = foundPokemonsArray
    }
    disableOverlayButtons(nextOverlayPokemon, lastOverlayPokemon, index)
    if (index >= array.length - 1) {
        nextIndex = 0
    }
    openOverlayPokeCard(nextIndex)
}

function addTypColorClassInOverlayProgressBar(indexOfRightPokemon, array) {
    let pokeObj = array[indexOfRightPokemon]

    let typName = pokeObj.types[0].type.name
    let progressBarColor = document.getElementsByClassName('progressColor')

    for (let index = 0; index < progressBarColor.length; index++) {
        progressBarColor[index].classList.add(`${typName}`)
    }
}

function addTypColorClassInOverlay(pokeObjectInArray, typeIndex) {
    document.getElementById(`pokemonCard${pokeObjectInArray.id}`).classList.add(`${pokeObjectInArray.types[typeIndex].type.name}`)
    document.getElementById(`typ1-Overlay${pokeObjectInArray.id}`).classList.add(`${pokeObjectInArray.types[0].type.name}`)
    if (pokeObjectInArray.types.length > 1) {
        document.getElementById(`typ2-Overlay${pokeObjectInArray.id}`).classList.add(`${pokeObjectInArray.types[1].type.name}`)
    }
}

function capitalizeFirstLetter(pokeName) {
    return String(pokeName).charAt(0).toUpperCase() + String(pokeName).slice(1);
}

function displayNone(elementID, pokeIDInArray) {
    elementID = document.getElementById(`pokemonCard${pokeIDInArray}`)
    elementID.classList.add('display_none')
}

function activeCategory(active, notActive1, notActive2) {
    active.classList.add('isActive')
    notActive1.classList.remove('isActive')
    notActive2.classList.remove('isActive')
}

function setTypeOfPokemonInOverlay(pokeObjectInArray) {
    let pokeTypes = pokeObjectInArray.types

    for (let typeIndex = 0; typeIndex < pokeTypes.length; typeIndex++) {

        document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML = "";
        document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML += getPokeTypeOneOverlayTemplate(pokeObjectInArray);

        if (pokeTypes.length == 2) {
            document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML += getPokeTypeTwoOverlayTemplate(pokeObjectInArray);
        }
        addTypColorClassInOverlay(pokeObjectInArray, typeIndex)
        { break; }
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

async function setCardCategoryContentOfAbout(index, contentStatus, array) {
    if (array == 'objectsOfAllPokemon') {
        array = objectsOfAllPokemon
    }
    if (array == 'foundPokemonsArray') {
        array = foundPokemonsArray
    }

    setActiveClassState(index, contentStatus)
    let pokeObj = array[index]
    await setSpeciesOfPokemon(pokeObj, index)
    setAbilitiesOfPokeCardInOverlay(pokeObj);
    setTypeOfPokemonInOverlay(pokeObj)
    pushInWhenLoaded(index, array)
    setActiveClassState(index, contentStatus)
}

async function setSpeciesOfPokemon(pokeObjectInArray, index) {
    let pokeID = pokeObjectInArray.id
    const SPECIES_URL = `https://pokeapi.co/api/v2/pokemon-species/${pokeID}/`

    if (SPECIES_URL) {
        let speciesResponse = await fetch(SPECIES_URL);
        if (speciesResponse.status == 200) {
            let speciesResponse = await fetch(SPECIES_URL);
            let speciesResponseToJson = await speciesResponse.json();
            evolutionChainLink = speciesResponseToJson.evolution_chain.url
            if (speciesResponseToJson.genera[7]) {
                let species = speciesResponseToJson.genera[7].genus
                setContentOfAbout(species, pokeObjectInArray, index)
            } else {
                let speciesAlternatve = speciesResponseToJson.genera[5].genus
                setContentOfAbout(speciesAlternatve, pokeObjectInArray, index)
            }
        } else {
            setContentOfAbout("Not Found sry...", pokeObjectInArray, index)
        }
    }
}

function setActiveClassState(foundPokemonIndex, contentStatus) {
    let cardCategoryContentOfAbout = document.getElementById(`setCardCategoryContentOfAbout${foundPokemonIndex}`)
    let contentOfBaseStats = document.getElementById(`setContentOfBaseStats${foundPokemonIndex}`)
    let evolutionChainData = document.getElementById(`setEvolutionChainData${foundPokemonIndex}`)
    toggleAttributesOfButtonToDisabled(cardCategoryContentOfAbout, contentOfBaseStats, evolutionChainData)
    if (contentStatus == 1) {
        activeCategory(cardCategoryContentOfAbout, contentOfBaseStats, evolutionChainData)
    }
    if (contentStatus == 2) {
        activeCategory(contentOfBaseStats, cardCategoryContentOfAbout, evolutionChainData)
    }
    if (contentStatus == 3) {
        activeCategory(evolutionChainData, cardCategoryContentOfAbout, contentOfBaseStats)
    }
}

function pushInWhenLoaded(pokemonIndex, array) {

    let nextID = array[pokemonIndex].id
    let lastIndex = pokemonIndex - 1
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

function setContentOfAbout(species, pokeObjectInArray, objectsOfAllPokemonIndex) { // pokeIDInArray --> objectsOfAllPokemonIndex #
    let renderCategorieContent = document.getElementById(`renderCategorieContent${objectsOfAllPokemonIndex}`) //pokeIDInArray --> objectsOfAllPokemonIndex #
    renderCategorieContent.innerHTML = "";
    renderCategorieContent.classList.remove('evolutionImgs')
    renderCategorieContent.innerHTML += getAboutContentTemplate(pokeObjectInArray, species)
}

function setContentOfBaseStats(index, contentStatus, array) {

    if (array == 'objectsOfAllPokemon') {
        array = objectsOfAllPokemon
    }
    if (array == 'foundPokemonsArray') {
        array = foundPokemonsArray
    }

    setActiveClassState(index, contentStatus)
    let renderCategorieContent = document.getElementById(`renderCategorieContent${index}`)
    let pokeObjStats = array[index].stats
    renderCategorieContent.innerHTML = "";
    renderCategorieContent.classList.remove('evolutionImgs')
    renderCategorieContent.innerHTML += getBaseStatsContentTemplate(pokeObjStats)
    addTypColorClassInOverlayProgressBar(index, array)
    calcBaseStatColorBar()
    setActiveClassState(index, contentStatus)
}

async function setEvolutionChainData(objectsOfAllPokemonIndex, contentStatus) {
    setActiveClassState(objectsOfAllPokemonIndex, contentStatus)
    let evoObj = await fetchEvolutionChainData(objectsOfAllPokemonIndex, contentStatus)
    getNamesOfPokemons(evoObj)
    changeInnerHTMLEvoChain(objectsOfAllPokemonIndex)
}

function deleteEvoChainImgs(objectsOfAllPokemonIndex) {
    let renderCategorieContent = document.getElementById(`renderCategorieContent${objectsOfAllPokemonIndex}`)
    renderCategorieContent.innerHTML = "";
    renderCategorieContent.classList.remove('evolutionImgs')
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

function disableOverlayButtons(nextOverlayPokemon, lastOverlayPokemon, index) {
    let nextOverlayButton = document.getElementById(`arrowForwardOverlay${index}`)
    let lastOverlayButton = document.getElementById(`arrowBackwardOverlay${index}`)

    toggleAttributesOfButtonToDisabled(nextOverlayButton, lastOverlayButton)
    if (nextOverlayPokemon) {
        getLoadingSpinnerInOverlayButton(nextOverlayButton)
    }
    if (lastOverlayPokemon) {
        getLoadingSpinnerInOverlayButton(lastOverlayButton)
    }
}

function enableOverlayButtons(arrowID) {
    let nextOverlayButton = document.getElementById(`arrowForwardOverlay${arrowID}`)
    let lastOverlayButton = document.getElementById(`arrowBackwardOverlay${arrowID}`)
    resetOverlayButtonsAttributes(nextOverlayButton, lastOverlayButton)
}

function toggleAttributesOfButtonToDisabled(nextOverlayButton, lastOverlayButton, extraButton) {
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