function getPokedexCardTemplate(index, pokeObject) {
    return `
            <div id="singlePokedexCard" class="singlePokedexCard">
                <div class="pokeCardHead">
                    <h3 id="number">#${pokeObject.id}</h3>
                    <h3 id="pokeName">${pokeObject.name}</h3>
                    <h3></h3>
                </div>
                <div class="pokemonBackground">
                    <img  class="pokemonImgClass" id="pokemonImg${pokeObject.id}" src="#" alt="pokemonBild">
                </div>
                <div id="pokeTypes${pokeObject.id}" class="pokeCardTypes">
                    
                </div>
            </div>
            `
}

function getPokeTypeOneIMGTemplate(pokeObject) {
    return `
                <img id="typ1-${pokeObject.id}" src="./assets/icons/dragon.svg" alt=""></img>
            `
}

function getPokeTypeTwoIMGTemplate(pokeObject) {
    return `
            
            <img id="typ2-${pokeObject.id}" src="./assets/icons/electric.svg" alt="">
            `
}