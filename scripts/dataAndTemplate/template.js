function getPokedexCardTemplate(pokeObject, capitalizedPokeName) {
    return `
            <div onclick="openOverlayPokeCard(${pokeObject.id},${"'" + capitalizedPokeName + "'"})" id="singlePokedexCard" class="singlePokedexCard">
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

function getPokeOverlayTemplate(singlePokeObject, capitalizedPokeName, pokeIDInArray) {
    return `
            <div onclick="stopEventBubbling(event)" class="pokemonCard" id="pokemonCard${singlePokeObject.id}">
                <div id="arrowForwardBackwardClose">
                    <img id="arrowBackwardOverlay" onclick="getLastOverlayPokemon(${pokeIDInArray}, ${"'" + capitalizedPokeName + "'"})" src="./assets/img/arrow_back_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Arrow Backward">
                    <img onclick="closeOverlay()" src="./assets/img/close_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Close">
                    <img id="arrowForwardOverlay" onclick="getNextOverlayPokemon(${pokeIDInArray}, ${"'" + capitalizedPokeName + "'"})" src="./assets/img/arrow_forward_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                        alt="Arrow Forward">
                </div>
                <div id="overlayPokeIntroductionParent">
                    <div id="overlayPokeIntroductionParentChild">
                        <h2>${capitalizedPokeName}</h2>
                        <div class="renderTypesOverlay" id="pokeTypesOverlay${singlePokeObject.id}">
                    
                        </div>
                    </div>
                    <h3>#${singlePokeObject.id}</h3>
                </div>
                <img class="overlayPokeImg" id="overlayPokeImg${singlePokeObject.id}"
                    src="${singlePokeObject.sprites.other.home.front_default}"
                    alt="Pokemonpicture">
                <div id="cardCategorieSection">
                    <div id="cardCategories">
                        <h4 onclick="setCardCategoryContentOfAbout(${pokeIDInArray})">About</h4>
                        <h4 onclick="setContentOfBaseStats(${pokeIDInArray})">Base Stats</h4>
                        <h4>Evolution</h4>
                    </div>
                    <div class="renderCategorieContent">
                        <table>
                        <tbody  id="renderCategorieContent${pokeIDInArray}">
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
                <div id="arrowForwardBackwardClose">
                     <img id="arrowBackwardOverlay" onclick="getLastSearchBarOverlayPokemon(${foundPokemonIndex}, ${"'" + capitalizedPokeName + "'"} )" src="./assets/img/arrow_back_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Arrow Backward">
                     <img onclick="closeOverlay()" src="./assets/img/close_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Close">
                     <img id="arrowForwardOverlay" onclick="getNextSearchBarOverlayPokemon(${foundPokemonIndex}, ${"'" + capitalizedPokeName + "'"} )" src="./assets/img/arrow_forward_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                      alt="Arrow Forward">
                </div>
                <div id="overlayPokeIntroductionParent">
                    <div id="overlayPokeIntroductionParentChild">
                        <h2>${capitalizedPokeName}</h2>
                        <div class="renderTypesOverlay" id="pokeTypesOverlay${singlePokeObject.id}">
                    
                        </div>
                    </div>
                    <h3>#${singlePokeObject.id}</h3>
                </div>
                <img class="overlayPokeImg" id="overlayPokeImg${singlePokeObject.id}"
                    src="${singlePokeObject.sprites.other.home.front_default}"
                    alt="Pokemonpicture">
                <div id="cardCategorieSection">
                    <div id="cardCategories">
                        <h4 onclick="setCardCategoryContentOfAboutInSearchBar(${foundPokemonIndex})">About</h4>
                        <h4 onclick="setContentOfBaseStatsInSearchBar(${foundPokemonIndex})">Base Stats</h4>
                        <h4>Evolution</h4>
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