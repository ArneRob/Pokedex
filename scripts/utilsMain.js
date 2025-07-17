function setTypeOfPokemon(pokeObject) {
    let pokeTypes = pokeObject.types
    
    document.getElementById(`pokeTypes${pokeObject.id}`).innerHTML += getPokeTypeOneIMGTemplate(pokeObject);
    document.getElementById(`typ1-${pokeObject.id}`).src = "./assets/icons/" + pokeTypes[0].type.name + ".svg"

    if (pokeTypes.length == 2) {
        document.getElementById(`pokeTypes${pokeObject.id}`).innerHTML += getPokeTypeTwoIMGTemplate(pokeObject);
        document.getElementById(`typ2-${pokeObject.id}`).src = "./assets/icons/" + pokeTypes[1].type.name + ".svg"

    }
    addTypColorClass(pokeObject)
}

function addTypColorClass(pokeObject) {
    document.getElementById(`pokemonImg${pokeObject.id}`).classList.add(`${pokeObject.types[0].type.name}`)
    document.getElementById(`typ1-${pokeObject.id}`).classList.add(`${pokeObject.types[0].type.name}`)
    if (pokeObject.types.length > 1) {
        document.getElementById(`typ2-${pokeObject.id}`).classList.add(`${pokeObject.types[1].type.name}`)
    }
}

function disableButtons(nextPokeStack, lastPokeStack) {
    let nextButton = document.getElementById('nextButton')
    let lastButton = document.getElementById('getLastButton')

    if (nextPokeStack) {
        changeAttributesOfButton(nextButton, lastButton)
        getLoadingSpinnerInButton(nextButton)
    }
    if (lastPokeStack) {
        changeAttributesOfButton(lastButton, nextButton)
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

function changeAttributesOfButton(klickedButton, otherButton) {
    klickedButton.disabled = true
    otherButton.disabled = true
    klickedButton.style.transform = "translateY(4px)"
    klickedButton.style.backgroundColor = "rgb(13, 136, 143)"
    klickedButton.style.cursor = "not-allowed"
}