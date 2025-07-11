
function renderSearchBarOverlayPokeCard(overlayDiv, idOfPokemon, capitalizedPokeName) {

    let foundPokemonIndex = getIndexOfPokemon(idOfPokemon);

    overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[foundPokemonIndex], capitalizedPokeName, foundPokemonIndex)
    setCardCategoryContentOfAboutInSearchBar(foundPokemonIndex, 1)

}

function getNextSearchBarOverlayPokemon(foundPokemonIndex) {
    let overlayDiv = document.getElementById('overlay')
    let nextFoundPokemonIndex = foundPokemonIndex + 1
    overlayDiv.innerHTML = "";

    if (foundPokemonIndex >= foundPokemonsArray.length - 1) {
        nextFoundPokemonIndex = 0
    }
    let capitalizedPokeName = capitalizeFirstLetter(foundPokemonsArray[nextFoundPokemonIndex].name)
    overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[nextFoundPokemonIndex], capitalizedPokeName, nextFoundPokemonIndex)
    setCardCategoryContentOfAboutInSearchBar(nextFoundPokemonIndex, 1)

}

function getLastSearchBarOverlayPokemon(foundPokemonIndex) {
    let overlayDiv = document.getElementById('overlay')
    let lastFoundPokemonIndex = foundPokemonIndex - 1
    overlayDiv.innerHTML = "";

    if (foundPokemonIndex <= 0) {
        lastFoundPokemonIndex = foundPokemonsArray.length - 1
    }
    let capitalizedPokeName = capitalizeFirstLetter(foundPokemonsArray[lastFoundPokemonIndex].name)
    overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[lastFoundPokemonIndex], capitalizedPokeName, lastFoundPokemonIndex)
    setCardCategoryContentOfAboutInSearchBar(lastFoundPokemonIndex, 1)

}

async function setCardCategoryContentOfAboutInSearchBar(foundPokemonIndex, contentStatus) {
    setActiveClassState(foundPokemonIndex, contentStatus)
    let pokeObj = foundPokemonsArray[foundPokemonIndex]
    console.log(foundPokemonsArray[foundPokemonIndex]);

    await setSpeciesOfPokemonForSearchBar(pokeObj, foundPokemonIndex)
    setAbilitiesOfPokeCardInOverlay(foundPokemonsArray[foundPokemonIndex]);
    setTypeOfPokemonInOverlay(foundPokemonsArray[foundPokemonIndex])
    setActiveClassState(foundPokemonIndex, contentStatus)
}

function setContentOfAboutSearchBar(species, pokeObjectInArray, pokeIDInArray) {
    // setActiveClassState(pokeIDInArray, 1)
    let renderCategorieContent = document.getElementById(`renderCategorieContent${pokeIDInArray}`)
    renderCategorieContent.classList.remove('evolutionImgs')
    renderCategorieContent.innerHTML = "";
    renderCategorieContent.innerHTML += getAboutContentTemplate(pokeObjectInArray, species)
    // setActiveClassState(pokeIDInArray, 1)
}

async function setSpeciesOfPokemonForSearchBar(pokeObjectInArray, pokeIDInArray) {
    let pokeID = pokeObjectInArray.id
    const SPECIES_URL = `https://pokeapi.co/api/v2/pokemon-species/${pokeID}/`

    if (SPECIES_URL) {
        let speciesResponse = await fetch(SPECIES_URL);
        if (speciesResponse.status == 200) {
            let speciesResponse = await fetch(SPECIES_URL);
            let speciesResponseToJson = await speciesResponse.json();
            evolutionChainLink = speciesResponseToJson.evolution_chain.url
            console.log(evolutionChainLink);
            if (speciesResponseToJson.genera[7]) {
                let species = speciesResponseToJson.genera[7].genus
                setContentOfAboutSearchBar(species, pokeObjectInArray, pokeIDInArray)
            } else {
                let speciesAlternatve = speciesResponseToJson.genera[5].genus
                setContentOfAboutSearchBar(speciesAlternatve, pokeObjectInArray, pokeIDInArray)
            }
        } else {
            setContentOfAboutSearchBar("Not Found sry...", pokeObjectInArray, pokeIDInArray)
        }
    }
}

function setContentOfBaseStatsInSearchBar(foundPokemonIndex, contentStatus) {
    setActiveClassState(foundPokemonIndex, contentStatus)
    let renderCategorieContent = document.getElementById(`renderCategorieContent${foundPokemonIndex}`)
    let pokeObjStats = foundPokemonsArray[foundPokemonIndex].stats
    renderCategorieContent.innerHTML = "";
    renderCategorieContent.classList.remove('evolutionImgs')
    renderCategorieContent.innerHTML += getBaseStatsContentTemplate(pokeObjStats)
    addTypColorClassInOverlaySearchBar(foundPokemonIndex)
    calcBaseStatColorBar()
    setActiveClassState(foundPokemonIndex, contentStatus)
}

function addTypColorClassInOverlaySearchBar(indexOfRightPokemon) {
    let pokeObj = foundPokemonsArray[indexOfRightPokemon]
    console.log(pokeObj);

    let typName = pokeObj.types[0].type.name
    let progressBarColor = document.getElementsByClassName('progressColor')

    for (let index = 0; index < progressBarColor.length; index++) {
        progressBarColor[index].classList.add(`${typName}`)
    }
}

function closeOverlay() {
    let overlayDiv = document.getElementById('overlay')
    let body = document.getElementById('body')
    body.style.overflow = "scroll";
    overlayDiv.innerHTML = "";
    overlayDiv.classList.add('display_none')
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

function activeCategory(active, notActive1, notActive2) {
    active.classList.add('isActive')
    notActive1.classList.remove('isActive')
    notActive2.classList.remove('isActive')
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
            overlayDiv.innerHTML = "";
            let capitalizedPokeName = capitalizeFirstLetter(pokeObjectInArray.name)
            overlayDiv.innerHTML += getPokeOverlayTemplate(pokeObjectInArray, capitalizedPokeName, pokeIDInArray)
            setCardCategoryContentOfAbout(pokeIDInArray, 1)
            // setContentOfAbout(pokeObjectInArray, pokeIDInArray)

        }
    }
}

async function setCardCategoryContentOfAbout(pokeIDInArray, contentStatus) {

    setActiveClassState(pokeIDInArray, contentStatus)
    let pokeObj = ObjectsOfAllPokemon[pokeIDInArray - 1]

    await setSpeciesOfPokemon(pokeObj, pokeIDInArray)
    setAbilitiesOfPokeCardInOverlay(pokeObj);
    setTypeOfPokemonInOverlay(pokeObj)
    setActiveClassState(pokeIDInArray, contentStatus)
}

function setContentOfAbout(species, pokeObjectInArray, pokeIDInArray) {

    // let indexOfRightPokemon = pokeIDInArray - 1
    let renderCategorieContent = document.getElementById(`renderCategorieContent${pokeIDInArray}`)
    renderCategorieContent.classList.remove('evolutionImgs')
    renderCategorieContent.innerHTML = "";
    renderCategorieContent.innerHTML += getAboutContentTemplate(pokeObjectInArray, species)
}

function setContentOfBaseStats(pokeIDInArray, contentStatus) {


    setActiveClassState(pokeIDInArray, contentStatus)
    let indexOfRightPokemon = pokeIDInArray - 1
    let renderCategorieContent = document.getElementById(`renderCategorieContent${pokeIDInArray}`)
    let pokeObjStats = ObjectsOfAllPokemon[indexOfRightPokemon].stats
    renderCategorieContent.classList.remove('evolutionImgs')
    renderCategorieContent.innerHTML = "";
    console.log(pokeObjStats);
    renderCategorieContent.innerHTML += getBaseStatsContentTemplate(pokeObjStats)
    addTypColorClassInOverlayLoadingBar(indexOfRightPokemon)
    calcBaseStatColorBar()
    setActiveClassState(pokeIDInArray, contentStatus)
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

async function setSpeciesOfPokemon(pokeObjectInArray, pokeIDInArray) {
    let pokeID = pokeObjectInArray.id
    const SPECIES_URL = `https://pokeapi.co/api/v2/pokemon-species/${pokeID}/`

    let speciesResponse = await fetch(SPECIES_URL);
    let speciesResponseToJson = await speciesResponse.json();
    console.log(speciesResponseToJson);
    let species = speciesResponseToJson.genera[7].genus
    evolutionChainLink = speciesResponseToJson.evolution_chain.url
    console.log(evolutionChainLink);
    setContentOfAbout(species, pokeObjectInArray, pokeIDInArray)

}

function getIndexOfPokemon(idOfPokemon) {
    for (let index = 0; index < foundPokemonsArray.length; index++) {
        if (idOfPokemon == foundPokemonsArray[index].id) {

            let foundPokemonIndex = index
            return foundPokemonIndex
        }
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

        document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML = "";
        document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML += getPokeTypeOneOverlayTemplate(pokeObjectInArray);

        if (pokeTypes.length == 2) {
            document.getElementById(`pokeTypesOverlay${pokeObjectInArray.id}`).innerHTML += getPokeTypeTwoOverlayTemplate(pokeObjectInArray);
        }
        addTypColorClassInOverlay(pokeObjectInArray, typeIndex)
        { break; }
    }
}

function addTypColorClassInOverlayLoadingBar(indexOfRightPokemon) {
    let pokeObj = ObjectsOfAllPokemon[indexOfRightPokemon]
    console.log(pokeObj);

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

function getNextOverlayPokemon(pokeIDInArray) {
    let nextOverlayPokemon = true;
    let lastOverlayPokemon = false;
    let overlay = true
    let overlayDiv = document.getElementById('overlay')

    disableOverlayButtons(nextOverlayPokemon, lastOverlayPokemon)

    if (ObjectsOfAllPokemon.length > pokeIDInArray) {
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
    nextOverlayButton.disabled = true
    lastOverlayButton.disabled = true
    nextOverlayButton.classList.toggle('disabled')
    lastOverlayButton.classList.toggle('disabled')
    if (extraButton) {
        extraButton.disabled = true
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

