
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=22&offset=0."
const INDEX_URL = "https://pokeapi.co/api/v2/pokedex/"
function onload() {
    getPokeCard();
}

async function getPokeCard() {
    let response = await fetch(BASE_URL + ".json");
    responseToJson = await response.json();
    next_URL_Array += responseToJson.next
    console.log(responseToJson)

    for (let index = 0; index < responseToJson.results.length; index++) {
        let pokemonName = responseToJson.results[index].name;
        let SPECIFIC_POKE_URL = responseToJson.results[index].url
        // let SPECIFIC_POKE_URLToJSON = await SPECIFIC_POKE_URL.json();
        // console.log("json format: ", SPECIFIC_POKE_URL);

        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        console.log("pokeObject", pokeObject)
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(index, pokeObject);
        getSinglePokeData(pokeObject, index);
    }

}

function getSinglePokeData(pokeObject, index) {
    // console.log(SPECIFIC_POKE_URL)
    // console.log(pokeDataResponseToJson)
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
    // console.log("das soll die id werden: ", singlePokeObject)

    return singlePokeObject

}


function setPokeImg(pokeImg, pokeObject) {
    let pokeImgDiv = document.getElementById(`pokemonImg${pokeObject.id}`)
    pokeImgDiv.src = pokeImg
}

async function getNextPokeStack() {
    disableButtons()
    let nextResponse = await fetch(next_URL_Array + ".json");
    let nextResponseToJson = await nextResponse.json();
    console.log(nextResponseToJson)

    last_URL_Array = nextResponseToJson.previous
    next_URL_Array = nextResponseToJson.next
    document.getElementById('renderContent').innerHTML = "";

    for (let index = 0; index < nextResponseToJson.results.length; index++) {
        let pokemonName = nextResponseToJson.results[index].name;
        let SPECIFIC_POKE_URL = nextResponseToJson.results[index].url

        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(index, pokeObject);
        getSinglePokeData(pokeObject, index);

    }
    setTimeout(enableButtons, 150)
}



function disableButtons() {
    document.getElementById('nextButton').disabled = true
    document.getElementById('getLastButton').disabled = true
}

function enableButtons() {
    document.getElementById('nextButton').disabled = false
    document.getElementById('getLastButton').disabled = false
}

async function getLastPokeStack() {
    let lastResponse = await fetch(last_URL_Array + ".json");
    let lastResponseToJson = await lastResponse.json();

    console.log(lastResponseToJson.previous)
    last_URL_Array = lastResponseToJson.previous
    next_URL_Array = lastResponseToJson.next
    document.getElementById('renderContent').innerHTML = "";

    for (let index = 0; index < lastResponseToJson.results.length; index++) {
        let pokemonName = lastResponseToJson.results[index].name;
        let SPECIFIC_POKE_URL = lastResponseToJson.results[index].url

        let pokeObject = await getSinglePokeObject(SPECIFIC_POKE_URL);
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(index, pokeObject);
        getSinglePokeData(pokeObject, index);

    }

}
function setTypeOfPokemon(pokeObject, index) {
    let pokeTypes = pokeObject.types
    console.log("poketype", pokeTypes);

    for (let typeIndex = 0; typeIndex < pokeTypes.length; typeIndex++) {

        // setColorTypeOfPokemon(pokeTypes, pokeObject, typeIndex)

        if (pokeTypes.length == 1) {
            document.getElementById(`pokeTypes${pokeObject.id}`).innerHTML += getPokeTypeOneIMGTemplate(pokeObject);
            document.getElementById(`typ1-${pokeObject.id}`).src = "./assets/icons/" + pokeTypes[typeIndex].type.name + ".svg"
            addTypColorClass(pokeObject, typeIndex)
        }
        if (pokeTypes.length == 2) {
            document.getElementById(`pokeTypes${pokeObject.id}`).innerHTML += getPokeTypeOneIMGTemplate(pokeObject);
            document.getElementById(`typ1-${pokeObject.id}`).src = "./assets/icons/" + pokeTypes[1].type.name + ".svg"
            document.getElementById(`pokeTypes${pokeObject.id}`).innerHTML += getPokeTypeTwoIMGTemplate(pokeObject);
            document.getElementById(`typ2-${pokeObject.id}`).src = "./assets/icons/" + pokeTypes[0].type.name + ".svg"
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