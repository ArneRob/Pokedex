const evolutionURL = "https://pokeapi.co/api/v2/evolution-chain/"

async function setEvolutionChainData(pokeID) {
    // loadingSpinnerOnOff
    let evoObj = await fetchEvolutionChainData()
    getNamesOfPokemons(evoObj)
    changeInnerHTMLEvoChain(pokeID)
    // loadingSpinnerOnOff
    console.log(evoObj);

}

async function fetchEvolutionChainData() {
    let pokeEvolutionResponse = await fetch(evolutionChainLink);
    let pokeEvolutionResponseToJSON = await pokeEvolutionResponse.json();

    return pokeEvolutionResponseToJSON
}

function getNamesOfPokemons(evoObj) {
    evoNamesArray = [];

    let firstEvo = evoObj.chain.species.name
    evoNamesArray.push(firstEvo)

    if (evoObj.chain.evolves_to[0]) {
        secondEvo = evoObj.chain.evolves_to[0].species.name
        evoNamesArray.push(secondEvo)

        if (evoObj.chain.evolves_to[0].evolves_to[0]) {
            thirdEvo = evoObj.chain.evolves_to[0].evolves_to[0].species.name
            evoNamesArray.push(thirdEvo)
        }
    }
    console.log(evoNamesArray)
}

function changeInnerHTMLEvoChain(pokeID) {
    let imgRenderSpot = document.getElementById(`renderCategorieContent${pokeID}`)
    imgRenderSpot.innerHTML = "";
    imgRenderSpot.classList.add('evolutionImgs')

    for (let indexOfEvoNames = 0; indexOfEvoNames < evoNamesArray.length; indexOfEvoNames++) {
        let pokeName = evoNamesArray[indexOfEvoNames]

        for (let index = 0; index < ObjectsOfAllPokemon.length; index++) {
            if (pokeName == ObjectsOfAllPokemon[index].name) {

                let src = srcRequest(ObjectsOfAllPokemon[index])
                imgRenderSpot.innerHTML += getEvolutionChainTemplate(src)
            }
        }
    }
}

function srcRequest(obj) {
    if (obj.sprites.other.home.front_default) {
        src = obj.sprites.other.home.front_default
    }
    else {
        src = obj.sprites.front_default
    } return src 
}