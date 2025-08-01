function getPokedexCardTemplate(pokeObject, capitalizedPokeName, index) {
    return `
            <div onclick="openOverlayPokeCard(${index})" id="singlePokedexCard" class="singlePokedexCard">
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

function getPokeOverlayTemplate(singlePokeObject, capitalizedPokeName, objectsOfAllPokemonIndex) {
    return `
            <div onclick="stopEventBubbling(event)" class="pokemonCard" id="pokemonCard${singlePokeObject.id}">
                <div class="arrowForwardBackwardClose">
                    <img id="arrowBackwardOverlay${objectsOfAllPokemonIndex}" onclick=" renderLastPokemon(${objectsOfAllPokemonIndex})" src="./assets/img/arrow_back_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Arrow Backward">
                    <img onclick="closeOverlay()" src="./assets/img/close_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Close">
                    <img id="arrowForwardOverlay${objectsOfAllPokemonIndex}" onclick="renderNextOverlayPokemon(${objectsOfAllPokemonIndex}, 'objectsOfAllPokemon')" src="./assets/img/arrow_forward_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                        alt="Arrow Forward">
                </div>
                <div class="overlayPokeIntroductionParent">
                    <div class="overlayPokeIntroductionChild">
                        <h2>${capitalizedPokeName}</h2>
                        <div class="renderTypesOverlay" id="pokeTypesOverlay${singlePokeObject.id}">
                    
                        </div>
                    </div>
                    <h3>#${singlePokeObject.id}</h3>
                </div>
                <img class="overlayPokeImg" id="overlayPokeImg${singlePokeObject.id}"
                    src="${singlePokeObject.sprites.other.home.front_default}"
                    alt="Pokemonpicture">
                <div class="cardCategorieSection">
                    <div class="cardCategories">
                        <h4 id="setCardCategoryContentOfAbout${objectsOfAllPokemonIndex}" onclick="setCardCategoryContentOfAbout(${objectsOfAllPokemonIndex}, ${1}, 'objectsOfAllPokemon')">About</h4>
                        <h4 id="setContentOfBaseStats${objectsOfAllPokemonIndex}" onclick="setContentOfBaseStats(${objectsOfAllPokemonIndex}, ${2}, 'objectsOfAllPokemon')">Base Stats</h4>
                        <h4 id="setEvolutionChainData${objectsOfAllPokemonIndex}" onclick="setEvolutionChainData(${objectsOfAllPokemonIndex}, ${3})">Evolution</h4>
                    </div>
                    <div class="renderCategorieContent">
                        <table>
                        <tbody  id="renderCategorieContent${objectsOfAllPokemonIndex}">
                            <tr>
                                <td>Species</td>
                                <td>lalala</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>${singlePokeObject.height / 10}m</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>${singlePokeObject.weight / 10}kg</td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                <td id="abilities${singlePokeObject.id}">sprung, sprung, sprung</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            `
}

function getAboutContentTemplate(singlePokeObject, species) {
    return `
            <table>
                <tr>
                    <td>Species</td>
                    <td>${species}</td>
                </tr>
                <tr>
                    <td>Height</td>
                    <td>${singlePokeObject.height / 10}m</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>${singlePokeObject.weight / 10}kg</td>
                </tr>
                <tr>
                    <td>Abilities</td>
                    <td id="abilities${singlePokeObject.id}">sprung, sprung, sprung</td>
                </tr>
            </table>
            `
}

function getBaseStatsContentTemplate(pokeObjStats) {
    return `
            <div class="divRow">
                <div class="statName">HP</div>
                <div class="baseStats">${pokeObjStats[0].base_stat}</div>
                <div class="progressBar"><div class="progressColor"></div></div>
            </div>
            <div class="divRow">
                <div class="statName">ATTACK</div>
                <div class="baseStats">${pokeObjStats[1].base_stat}</div>
                <div class="progressBar"><div class="progressColor"></div></div>
            </div>
            <div class="divRow">
                <div class="statName">DEFENSE</div>
                <div class="baseStats">${pokeObjStats[2].base_stat}</div>
                <div class="progressBar"><div class="progressColor"></div></div> 
            </div>
            <div class="divRow">
                <div class="statName">SPEED</div>
                <div class="baseStats">${pokeObjStats[5].base_stat}</div>
                <div class="progressBar"><div class="progressColor"></div></div>
            </div>
            <div class="divRow">
                <div class="statName">SP.ATTACK</div>
                <div class="baseStats">${pokeObjStats[3].base_stat}</div>
                <div class="progressBar"><div class="progressColor"></div></div>
            </div>
            <div class="divRow">
                <div class="statName">SP.DEFENSE</div>
                <div class="baseStats">${pokeObjStats[4].base_stat}</div>
                <div class="progressBar"><div class="progressColor"></div></div>
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

function getLoadingSpinnerForButtonTemplate() {
    return `
              <img id="loadSpinner" class="loadingSpinnerInButton" src="./assets/img/pokemon-6046746_640.png" alt="">
            `
}


function getSearchBarOverlayTemplate(singlePokeObject, capitalizedPokeName, foundPokemonIndex) {
    return `
             <div onclick="stopEventBubbling(event)" class="pokemonCard" id="pokemonCard${singlePokeObject.id}">
                <div class="arrowForwardBackwardClose">
                     <img id="arrowBackwardOverlay${foundPokemonIndex}" onclick="renderLastPokemon(${foundPokemonIndex})" src="./assets/img/arrow_back_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Arrow Backward">
                     <img onclick="closeOverlay()" src="./assets/img/close_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Close">
                     <img id="arrowForwardOverlay${foundPokemonIndex}" onclick="renderNextOverlayPokemon(${foundPokemonIndex}, 'foundPokemonsArray' )" src="./assets/img/arrow_forward_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                      alt="Arrow Forward">
                </div>
                <div class="overlayPokeIntroductionParent">
                    <div class="overlayPokeIntroductionChild">
                        <h2>${capitalizedPokeName}</h2>
                        <div class="renderTypesOverlay" id="pokeTypesOverlay${singlePokeObject.id}">
                    
                        </div>
                    </div>
                    <h3>#${singlePokeObject.id}</h3>
                </div>
                <img class="overlayPokeImg" id="overlayPokeImg${singlePokeObject.id}"
                    src="${singlePokeObject.sprites.other.home.front_default}"
                    alt="Pokemonpicture">
                <div class="cardCategorieSection">
                    <div class="cardCategories">
                        <h4 id="setCardCategoryContentOfAbout${foundPokemonIndex}" onclick="setCardCategoryContentOfAbout(${foundPokemonIndex}, ${1}, 'foundPokemonsArray')">About</h4>
                        <h4 id="setContentOfBaseStats${foundPokemonIndex}" onclick="setContentOfBaseStats(${foundPokemonIndex}, ${2}, 'foundPokemonsArray')">Base Stats</h4>
                        <h4 id="setEvolutionChainData${foundPokemonIndex}" onclick="setEvolutionChainData(${foundPokemonIndex}, ${3})">Evolution</h4>
                    </div>
                    <div class="renderCategorieContent" id="renderCategorieContent">
                        <table>
                           <tbody  id="renderCategorieContent${foundPokemonIndex}">
                            <tr>
                                <td>Species</td>
                                <td>Not Found....</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>${singlePokeObject.height / 10}m</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>${singlePokeObject.weight / 10}kg</td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                <td id="abilities${singlePokeObject.id}">Not Found....</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            `
}

function getEvolutionChainTemplate(src) {
    return `
            <img src="${src}" alt="">
            `
}