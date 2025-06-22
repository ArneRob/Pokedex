function getPokedexCardTemplate(index, pokeObject) {
    return `
            <div onclick="openOverlayPokeCard(${pokeObject.id})" id="singlePokedexCard" class="singlePokedexCard">
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

function getPokeOverlayTemplate(pokeObjectInArray) {
    return `
            <div id="pokemonCard">
                <div id="arrowForwardBackwardClose">
                    <img onclick="getLastOverlayPokemon()" src="./assets/img/arrow_back_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Arrow Backward">
                    <img onclick="closeOverlay()" src="./assets/img/close_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Close">
                    <img onclick="getNextOverlayPokemon()" src="./assets/img/arrow_forward_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                        alt="Arrow Forward">
                </div>
                <div id="overlayPokeIntroductionParent">
                    <div id="overlayPokeIntroductionParentChild">
                        <h2>${pokeObjectInArray.name}</h2>
                        <div id="renderTypesOverlay">
                            <p>Grass</p>
                            <p>Poisen</p>
                        </div>
                    </div>
                    <h3>#${pokeObjectInArray.id}</h3>
                </div>
                <img id="overlayPokeImg"
                    src="${pokeObjectInArray.sprites.other.home.front_default}"
                    alt="Pokemonpicture">
                <div id="cardCategorieSection">
                    <div id="cardCategories">
                        <h4>About</h4>
                        <h4>Base Stats</h4>
                        <h4>Evolution</h4>
                        <h4>Moves</h4>
                    </div>
                    <div id="renderCategorieContent">
                        <table>
                            <tr>
                                <td>Species</td>
                                <td>seed</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>${pokeObjectInArray.height}m</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>${pokeObjectInArray.weight}lbs</td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                <td>${pokeObjectInArray.abilities[0].ability.name}, ${pokeObjectInArray.abilities[1].ability.name}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            `
}