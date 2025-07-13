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

function closeOverlay() {
    let overlayDiv = document.getElementById('overlay')
    let body = document.getElementById('body')
    body.style.overflow = "scroll";
    overlayDiv.innerHTML = "";
    overlayDiv.classList.add('display_none')
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

function openOverlayPokeCard(idOfPokemon, capitalizedPokeName) { // index übergebn und id löschen

    let overlayDiv = document.getElementById('overlay')
    let body = document.getElementById('body')
    body.style.overflow = "hidden";
    overlayDiv.classList.remove('display_none')

    if (searchBar == false) {
        renderNormalOverlayPokeCard(overlayDiv, idOfPokemon, capitalizedPokeName) // index übergebn und id löschen
    }
    if (searchBar) {
        renderSearchBarOverlayPokeCard(overlayDiv, idOfPokemon, capitalizedPokeName) // index übergebn und id löschen
    }
}

function setContentOfAbout(species, pokeObjectInArray, objectsOfAllPokemonIndex) { // pokeIDInArray --> objectsOfAllPokemonIndex #
    let renderCategorieContent = document.getElementById(`renderCategorieContent${objectsOfAllPokemonIndex}`) //pokeIDInArray --> objectsOfAllPokemonIndex #
    renderCategorieContent.innerHTML = "";
    renderCategorieContent.classList.remove('evolutionImgs')
    renderCategorieContent.innerHTML += getAboutContentTemplate(pokeObjectInArray, species)
}

function deleteEvoChainImgs(objectsOfAllPokemonIndex) {
    let renderCategorieContent = document.getElementById(`renderCategorieContent${objectsOfAllPokemonIndex}`)
    renderCategorieContent.innerHTML = "";
    renderCategorieContent.classList.remove('evolutionImgs')
}