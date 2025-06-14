function getPokedexCardTemplate(index, pokemonName) {
    return `
            <div id="singlePokedexCard" class="singlePokedexCard">
                <div class="pokeCardHead">
                    <h3 id="number">#${index}</h3>
                    <h3 id="pokeName">${pokemonName}</h3>
                    <h3></h3>
                </div>
                <div class="pokemonBackground">
                    <img  class"pokemonImgClass" id="pokemonImg${index}" src="#" alt="pokemonBild">
                </div>
                <div class="pokeCardTypes">
                    <img id="typ1" src="./assets/icons/dragon.svg" alt="">
                    <img id="typ2" src="./assets/icons/electric.svg" alt="">
                </div>
            </div>
            `
}