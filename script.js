
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0."


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
        getPokeImg(SPECIFIC_POKE_URL, index);

    }
}

async function getPokeImg(SPECIFIC_POKE_URL, index) {
    let imgResponse = await fetch(SPECIFIC_POKE_URL);
    imgResponseToJson = await imgResponse.json();
    // console.log(SPECIFIC_POKE_URL)
    //  console.log(imgResponseToJson)
    let pokeImg = imgResponseToJson.sprites.other.home.front_default
    setPokeImg(pokeImg, index)
}


function setPokeImg(pokeImg, index) {
    let pokeImgDiv = document.getElementById(`pokemonImg${index}`)
    pokeImgDiv.src = pokeImg
}

async function getNextPokeStack() {
    let nextResponse = await fetch(next_URL_Array + ".json");
    let nextResponseToJson = await nextResponse.json();

    last_URL_Array = nextResponseToJson.previous
    next_URL_Array = nextResponseToJson.next
    document.getElementById('renderContent').innerHTML = "";

    for (let index = 0; index < nextResponseToJson.results.length; index++) {
        let pokemonName = nextResponseToJson.results[index].name;
        let SPECIFIC_POKE_URL = nextResponseToJson.results[index].url

        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(index, pokemonName);
        getPokeImg(SPECIFIC_POKE_URL, index);

    }

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
        getPokeImg(SPECIFIC_POKE_URL, index);

    }

}