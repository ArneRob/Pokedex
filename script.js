
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=22&offset=0."

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

        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(index, pokemonName);
        getSinglePokeData(SPECIFIC_POKE_URL, index);
    }

}

async function getSinglePokeData(SPECIFIC_POKE_URL, index) {
    let pokeDataResponse = await fetch(SPECIFIC_POKE_URL);
    let pokeDataResponseToJson = await pokeDataResponse.json();
    let pokeType = pokeDataResponseToJson.types
    // console.log(SPECIFIC_POKE_URL)
    let pokeImg = pokeDataResponseToJson.sprites.other.home.front_default
    let secondPokeImg = pokeDataResponseToJson.sprites.front_default
    if (pokeImg) {
        setPokeImg(pokeImg, index)
    } else {
        setPokeImg(secondPokeImg, index)
    }

    setTypeOfPokemon(pokeType, index);

}


function setPokeImg(pokeImg, index) {
    let pokeImgDiv = document.getElementById(`pokemonImg${index}`)
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

        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(index, pokemonName);
        getSinglePokeData(SPECIFIC_POKE_URL, index);

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

        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(index, pokemonName);
        getSinglePokeData(SPECIFIC_POKE_URL, index);

    }

}

async function setTypeOfPokemon(pokeType, index) {
    for (let typeIndex = 0; typeIndex < pokeType.length; typeIndex++) {


        if (pokeType.length == 1) {
            document.getElementById(`pokeTypes${index}`).innerHTML += getPokeTypeOneIMGTemplate(index);
            document.getElementById(`typ1-${index}`).src = "./assets/icons/" + pokeType[typeIndex].type.name + ".svg"
        }
        if (pokeType.length == 2) {
            document.getElementById(`pokeTypes${index}`).innerHTML += getPokeTypeTwoIMGTemplate(index);
            document.getElementById(`typ2-${index}`).src = "./assets/icons/" + pokeType[0].type.name + ".svg"

            document.getElementById(`pokeTypes${index}`).innerHTML += getPokeTypeOneIMGTemplate(index);
            document.getElementById(`typ1-${index}`).src = "./assets/icons/" + pokeType[1].type.name + ".svg"
            { break; }
        }

    }
}