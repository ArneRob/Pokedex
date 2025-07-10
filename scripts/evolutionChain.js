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
    console.log((evoObj));


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

async function changeInnerHTMLEvoChain(pokeID) {
    let imgRenderSpot = document.getElementById(`renderCategorieContent${pokeID}`)
    imgRenderSpot.innerHTML = "";
    imgRenderSpot.classList.add('evolutionImgs')
    let array;
    let fetchedPokeObj;

    for (let indexOfEvoNames = 0; indexOfEvoNames < evoNamesArray.length; indexOfEvoNames++) {
        let pokeEvoName = evoNamesArray[indexOfEvoNames]

        if (foundPokemonsArray.length > 1) {
            array = foundPokemonsArray
            let nameToFetch = checkIfNameExist(pokeEvoName, array)
            if (nameToFetch) {
                console.log("nametofetch; ", nameToFetch);
                fetchedPokeObj = await fetchSinglePokemon(nameToFetch, foundPokemonsArray)
            }
        } else {
            array = ObjectsOfAllPokemon
            let nameToFetch = checkIfNameExist(pokeEvoName, array)
            if (nameToFetch) {
                console.log("nametofetch; ", nameToFetch);
                fetchedPokeObj = await fetchSinglePokemon(nameToFetch, ObjectsOfAllPokemon, pokeID)
                array = changeAbleObjectOfAllPokemon
            }
        }
        console.log(foundPokemonsArray);
        // foundPokemonsArray.push(fetchedPokeObj)
        loopThroughPokemonsArray(pokeEvoName, imgRenderSpot, array)

    }
}

function loopThroughPokemonsArray(pokeEvoName, imgRenderSpot, array) {
    for (let index = 0; index < array.length; index++) {
        if (pokeEvoName == array[index].name) {
            let src = srcRequest(array[index])
            imgRenderSpot.innerHTML += getEvolutionChainTemplate(src)
        }
    }
}

function checkIfNameExist(pokeName, arrayOfAllPokemon) {
    const doesAlreadyExist = arrayOfAllPokemon.find((item) => item.name === pokeName);

    if (doesAlreadyExist == undefined) {
        return pokeName;
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

async function fetchSinglePokemon(pokeName, array, pokeID) {

    const singlePokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokeName}`

    let singlePokeResponse = await fetch(singlePokemonURL);
    let singlePokeResponseToJSON = await singlePokeResponse.json();

    if (array.length > 20) {
        createManipulatableObject(pokeID, array, singlePokeResponseToJSON)
    }
    if (array.length < 20) {
        foundPokemonsArray.push(singlePokeResponseToJSON)
    }

}

function createManipulatableObject(pokeID, array, singlePokeResponseToJSON) {
    let indexPosition = pokeID - 1
    Object.assign(changeAbleObjectOfAllPokemon, ObjectsOfAllPokemon)
    changeAbleObjectOfAllPokemon.splice(indexPosition, 0, singlePokeResponseToJSON)
}