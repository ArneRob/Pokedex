
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0."


function onload() {
    getPokeName();
}

async function getPokeName() {
    let response = await fetch(BASE_URL + ".json");
    responseToJson = await response.json();
    console.log(responseToJson)

    for (let index = 0; index < responseToJson.results.length; index++) {
        let pokemonName = responseToJson.results[index].name;
        let SPECIFIC_POKE_URL = responseToJson.results[index].url
        console.log(SPECIFIC_POKE_URL);
       
        document.getElementById('renderContent').innerHTML += getPokedexCardTemplate(index, pokemonName);
         getPokeImg(SPECIFIC_POKE_URL, index);

    }
}

async function getPokeImg(SPECIFIC_POKE_URL, index) {

    let imgResponse = await fetch(SPECIFIC_POKE_URL);
    imgResponseToJson = await imgResponse.json();
    let pokeImg = imgResponseToJson.sprites.other.home.front_default
    setPokeImg(pokeImg, index)
}


function setPokeImg(pokeImg, index) {
    let pokeImgDiv = document.getElementById(`pokemonImg${index}`)
    console.log("setPokeIMg", pokeImg)
    pokeImgDiv.src = pokeImg
}