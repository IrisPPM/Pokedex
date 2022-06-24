import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/';
const pokemonContainer = document.querySelector('#pokemon-container')

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#F4E7DA',
}


async function basePokemon(endpoint, value) {
    try {
        const response = await axios.get(`${API_URL}${endpoint}/${value}`);
        //console.log(response.data.pokemon);
        for (let i = 0; i < response.data.pokemon.length; i++) {
            let pokemon = response.data.pokemon[i];
            let name = pokemon.pokemon.name;
            //console.log(name);

            // cambiar nombre
            const pokeData = await axios.get(pokemon.pokemon.url);
            const pokeTypes = pokeData.data.types;
            let typePokemon = pokeData.data.types.type //Obtener el tipo de pokemon en la posicion i
            //console.log(typePokemon);
            const pokeMoves = pokeData.data.moves.slice(0, 5);
            //console.log(pokeMoves);

            let imageURL = pokeData.data.sprites.other['official-artwork'].front_default;
            //console.log(imageURL);
            let number = pokeData.data.id;
            let color = colors[typePokemon];

            function createPokemon(pokemon) {
                const divContainerPoke = document.createElement('div');
                divContainerPoke.classList.add('col','divConPoke');
                divContainerPoke.style.backgroundColor = color;

                // Card
                const card = document.createElement('div');
                card.classList.add('card', 'mb-4', 'shadow', 'rounded');
                // Card body
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                // const imgContainer = document.createElement('div');
                // imgContainer.classList.add('img-container');

                const imgPokemones = document.createElement('img');
                imgPokemones.src = imageURL;
                imgPokemones.classList.add('card-img-top');

                const pokeButton = document.createElement('button');
                pokeButton.classList.add('btn', 'btn-success', 'btnModal', 'text-center');
                pokeButton.textContent = 'Ver detalle';

                divContainerPoke.addEventListener('click', () => {
                    const myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
                    let modalTitle = exampleModal.querySelector('.modal-title');
                    modalTitle.textContent = name;
                    const modalImage = exampleModal.querySelector('.modal-body img');
                    //const imageModel = pokeData.data.sprites.other['official-artwork'].front_default;
                    modalImage.src = imageURL;
                    const modalTypes = exampleModal.querySelector('.modal-body .types-container')
                    const modalMoves = exampleModal.querySelector('.modal-body .moves-container')
                    if (modalTypes.childNodes.length > 0) {
                        modalTypes.innerHTML = '';
                    }

                    if (modalMoves.childNodes.length > 0) {
                        modalMoves.innerHTML = '';
                    }
                    
                    pokeTypes.forEach(type => {
                        const span = document.createElement('span');
                        span.classList.add('badge', 'bg-warning', 'me-1');
                        span.textContent = type.type.name;
                        modalTypes.appendChild(span);
                    });
                    pokeMoves.forEach(moves => {
                        const span = document.createElement('span');
                        span.classList.add('badge', 'bg-primary', 'me-1');
                        span.textContent = moves.move.name;
                        modalMoves.appendChild(span);
                    }); 


                    myModal.show();
                });

                // imgContainer.appendChild(imgPokemones);
                const numberPokemon = document.createElement('p');
                numberPokemon.textContent = `#${number}`;
                numberPokemon.classList.add('card-text');

                const namePokemon = document.createElement('h5');
                namePokemon.textContent = name;
                // namePokemon.classList.add('text-center', 'h5');

                card.appendChild(imgPokemones);
                cardBody.appendChild(namePokemon);
                cardBody.appendChild(numberPokemon);
                cardBody.appendChild(pokeButton);
                card.appendChild(cardBody);
                divContainerPoke.appendChild(card);

                pokemonContainer.append(divContainerPoke);

            }

            createPokemon(pokemon[i]);




        }
    } catch (error) {
        console.log(error)
    }
}

basePokemon('type', 'fire');
/* basePokemon('type', 'ground');
basePokemon('type', 'water');
basePokemon('type', 'electric'); */

const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', async(formEvent) => {
    formEvent.preventDefault();

    const infoSearch = new FormData(searchForm);
    const search = infoSearch.get('search');
    const searchResponse = await searchPokemon(search);

    const searchModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
    console.log(searchResponse);

    let searchModalTitle = exampleModal.querySelector('.modal-title');
    searchModalTitle.textContent = searchResponse.data.name;

    const searchModalImage = exampleModal.querySelector('.modal-body img');
    if (searchModalImage.src.length > 0) {
        searchModalImage.src = '';
    }

    searchModalImage.src = searchResponse.data.sprites.other['official-artwork'].front_default
    searchModal.show();
})

async function searchPokemon(termino) {
    const response = await axios.get(`${API_URL}pokemon/${termino}`);
    return response;
}



