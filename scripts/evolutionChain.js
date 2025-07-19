const evolutionURL = "https://pokeapi.co/api/v2/evolution-chain/"

async function fetchEvolutionChainData(objectsOfAllPokemonIndex, contentStatus) {
    let pokeEvolutionResponse = await fetch(evolutionChainLink);
    let pokeEvolutionResponseToJSON = await pokeEvolutionResponse.json();
    setTimeout(setActiveClassState(objectsOfAllPokemonIndex, contentStatus), 3000)
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
}

async function changeInnerHTMLEvoChain(objectsOfAllPokemonIndex) {
    setupEvoChainRenderSpot(objectsOfAllPokemonIndex)
    let pokeObject = objectsOfAllPokemon[objectsOfAllPokemonIndex]
    let array;
    for (let indexOfEvoNames = 0; indexOfEvoNames < evoNamesArray.length; indexOfEvoNames++) {
        let pokeEvoName = evoNamesArray[indexOfEvoNames]
        if (foundPokemonsArray.length > 1) {
            array = foundPokemonsArray
            await checkNameAndFetchData(pokeEvoName, foundPokemonsArray, pokeObject.id)
        } else {
            createManipulatableObject()
            await checkNameAndFetchData(pokeEvoName, objectsOfAllPokemon, pokeObject)
            array = changeAbleObjectOfAllPokemon
        } changeInnerHTML(pokeEvoName, array, objectsOfAllPokemonIndex)
    }
}

function setupEvoChainRenderSpot(objectsOfAllPokemonIndex) {
    let imgRenderSpot = document.getElementById(`renderCategorieContent${objectsOfAllPokemonIndex}`)
    imgRenderSpot.innerHTML = "";
    imgRenderSpot.classList.add('evolutionImgs')
}

async function checkNameAndFetchData(pokeEvoName, objectsOfAllPokemon, pokeObject) {
    let nameToFetch = checkIfNameExist(pokeEvoName, objectsOfAllPokemon)
    if (nameToFetch) {
        fetchedPokeObj = await fetchSinglePokemon(nameToFetch, objectsOfAllPokemon, pokeObject.id)
    }
}

function changeInnerHTML(pokeEvoName, array, objectsOfAllPokemonIndex) {
    let imgRenderSpot = document.getElementById(`renderCategorieContent${objectsOfAllPokemonIndex}`)
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
    try {
        const singlePokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        let singlePokeResponse = await fetch(singlePokemonURL);
        let singlePokeResponseToJSON = await singlePokeResponse.json();
        if (array.length > 20) {
            let indexPosition = pokeID - 1
            changeAbleObjectOfAllPokemon.splice(indexPosition, 0, singlePokeResponseToJSON)
        }
        if (array.length < 20) {
            foundPokemonsArray.push(singlePokeResponseToJSON)
        }
    } catch (error) { }
}

function createManipulatableObject() {
    Object.assign(changeAbleObjectOfAllPokemon, objectsOfAllPokemon)
}