function getPokedexCardTemplate(pokeObject, capitalizedPokeName) {
    return `
            <div onclick="openOverlayPokeCard(${pokeObject.id})" id="singlePokedexCard" class="singlePokedexCard">
                <div class="pokeCardHead">
                    <h3 id="number">#${pokeObject.id}</h3>
                    <h3 id="pokeName">${capitalizedPokeName}</h3>
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

function getPokeOverlayTemplate(pokeObjectInArray, capitalizedPokeName, pokeIDInArray) {
    return `
            <div class="pokemonCard" id="pokemonCard${pokeObjectInArray.id}">
                <div id="arrowForwardBackwardClose">
                    <img onclick="getLastOverlayPokemon(${pokeIDInArray})" src="./assets/img/arrow_back_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Arrow Backward">
                    <img onclick="closeOverlay()" src="./assets/img/close_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Close">
                    <img onclick="getNextOverlayPokemon(${pokeIDInArray})" src="./assets/img/arrow_forward_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                        alt="Arrow Forward">
                </div>
                <div id="overlayPokeIntroductionParent">
                    <div id="overlayPokeIntroductionParentChild">
                        <h2>${capitalizedPokeName}</h2>
                        <div class="renderTypesOverlay" id="pokeTypesOverlay${pokeObjectInArray.id}">
                    
                        </div>
                    </div>
                    <h3>#${pokeObjectInArray.id}</h3>
                </div>
                <img class="overlayPokeImg" id="overlayPokeImg${pokeObjectInArray.id}"
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
                                <td>${pokeObjectInArray.height/10}m</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>${pokeObjectInArray.weight/10}kg</td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            `
}



function getPokeTypeOneOverlayTemplate(pokeObjectInArray) {
    return `
                     <p id="typ1-Overlay${pokeObjectInArray.id}">${pokeObjectInArray.types[0].type.name}</p>
                        
            `
}

function getPokeTypeTwoOverlayTemplate(pokeObjectInArray) {
    return `
            
              <p id="typ2-Overlay${pokeObjectInArray.id}">${pokeObjectInArray.types[1].type.name}</p>
            `
}