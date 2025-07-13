
function renderSearchBarOverlayPokeCard(overlayDiv, idOfPokemon, capitalizedPokeName) { // index übergebn und id löschen

    let foundPokemonIndex = getIndexOfPokemon(idOfPokemon); // löschen 

    overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[foundPokemonIndex], capitalizedPokeName, foundPokemonIndex)
    setCardCategoryContentOfAboutInSearchBar(foundPokemonIndex, 1)

}

function getNextSearchBarOverlayPokemon(foundPokemonIndex) {
    let overlayDiv = document.getElementById('overlay')
    let nextFoundPokemonIndex = foundPokemonIndex + 1

    if (foundPokemonIndex >= foundPokemonsArray.length - 1) {
        nextFoundPokemonIndex = 0
    }
    let capitalizedPokeName = capitalizeFirstLetter(foundPokemonsArray[nextFoundPokemonIndex].name)
    overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[nextFoundPokemonIndex], capitalizedPokeName, nextFoundPokemonIndex)
    let nextPokeCard = document.getElementById(`pokemonCard${foundPokemonsArray[nextFoundPokemonIndex].id}`)
    nextPokeCard.classList.add('display_none')
    setCardCategoryContentOfAboutInSearchBar(nextFoundPokemonIndex, 1, foundPokemonsArray[nextFoundPokemonIndex].id)

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

async function setCardCategoryContentOfAboutInSearchBar(foundPokemonIndex, contentStatus, pokeIdInArray) {
    setActiveClassState(foundPokemonIndex, contentStatus)
    let pokeObj = foundPokemonsArray[foundPokemonIndex]

    await setSpeciesOfPokemonForSearchBar(pokeObj, foundPokemonIndex)
    setAbilitiesOfPokeCardInOverlay(foundPokemonsArray[foundPokemonIndex]);
    setTypeOfPokemonInOverlay(foundPokemonsArray[foundPokemonIndex])
    pushInWhenLoaded(foundPokemonIndex, foundPokemonsArray)
    setActiveClassState(foundPokemonIndex, contentStatus)
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
            if (speciesResponseToJson.genera[7]) {
                let species = speciesResponseToJson.genera[7].genus
                setContentOfAbout(species, pokeObjectInArray, pokeIDInArray)
            } else {
                let speciesAlternatve = speciesResponseToJson.genera[5].genus
                setContentOfAbout(speciesAlternatve, pokeObjectInArray, pokeIDInArray)
            }
        } else {
            setContentOfAbout("Not Found sry...", pokeObjectInArray, pokeIDInArray)
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
    addTypColorClassInOverlayProgressBar(foundPokemonIndex, foundPokemonsArray)
    calcBaseStatColorBar()
    setActiveClassState(foundPokemonIndex, contentStatus)
}