async function getNextPokeStack(overlay, pokeIDInArray) {
    let nextPokeStack = true;
    let lastPokeStack = false;

    document.getElementById('renderContent').innerHTML = "";
    disableButtons(nextPokeStack, lastPokeStack)
    loadingSpinnerOnOff();

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
    setTimeout(loadingSpinnerOnOff, 500);
    setTimeout(enableButtons, 500)
    if (overlay) {
        setTimeout(enableOverlayButtons, 500)
        getNextOverlayPokemon(pokeIDInArray)
    }
}

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
    loadingSpinnerOnOff();
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
    setTimeout(loadingSpinnerOnOff, 500);
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