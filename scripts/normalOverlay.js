
function renderNormalOverlayPokeCard(overlayDiv, objectsOfAllPokemonIndex, capitalizedPokeName) {
    let pokeIDInArray = objectsOfAllPokemon[objectsOfAllPokemonIndex].id
    let pokeObjectInArray = objectsOfAllPokemon[objectsOfAllPokemonIndex]

    overlayDiv.innerHTML += getPokeOverlayTemplate(pokeObjectInArray, capitalizedPokeName, objectsOfAllPokemonIndex)
    displayNone("pokemonCard", pokeIDInArray)
    setCardCategoryContentOfAbout(objectsOfAllPokemonIndex, 1, objectsOfAllPokemon)
}

function getLastOverlayPokemon(objectsOfAllPokemonIndex) {
    let nextOverlayPokemon = false;
    let lastOverlayPokemon = true;

    disableOverlayButtons(nextOverlayPokemon, lastOverlayPokemon, objectsOfAllPokemonIndex)

    if (0 < objectsOfAllPokemonIndex) {
        let nextPokeIndex = objectsOfAllPokemonIndex - 1
        let overlayDiv = document.getElementById('overlay')
        overlayDiv.innerHTML = "";
        openOverlayPokeCard(nextPokeIndex)
    }

    setTimeout(enableOverlayButtons(objectsOfAllPokemonIndex), 50)
}


