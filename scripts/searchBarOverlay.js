
function renderSearchBarOverlayPokeCard(overlayDiv, foundPokemonIndex, capitalizedPokeName) { 
    overlayDiv.innerHTML += getSearchBarOverlayTemplate(foundPokemonsArray[foundPokemonIndex], capitalizedPokeName, foundPokemonIndex)
    displayNone("pokemonCard", foundPokemonsArray[foundPokemonIndex].id)
    setCardCategoryContentOfAbout(foundPokemonIndex, 1, foundPokemonsArray)
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
    setCardCategoryContentOfAbout(lastFoundPokemonIndex, 1, foundPokemonsArray)
}