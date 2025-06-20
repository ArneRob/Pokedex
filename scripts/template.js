function getPokedexCardTemplate(index, pokemonName) {
    return `
            <div id="singlePokedexCard" class="singlePokedexCard">
                <div class="pokeCardHead">
                    <h3 id="number">#${index}</h3>
                    <h3 id="pokeName">${pokemonName}</h3>
                    <h3></h3>
                </div>
                <div class="pokemonBackground">
                    <img  class="pokemonImgClass" id="pokemonImg${index}" src="#" alt="pokemonBild">
                </div>
                <div id="pokeTypes${index}" class="pokeCardTypes">
                    
                </div>
            </div>
            `
}

function getPokeTypeOneIMGTemplate(index) {
    return `
                <img id="typ1-${index}" src="./assets/icons/dragon.svg" alt=""></img>
            `
}

function getPokeTypeTwoIMGTemplate(index) {
    return `
            
            <img id="typ2-${index}" src="./assets/icons/electric.svg" alt="">
            `
}