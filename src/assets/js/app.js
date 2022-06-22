import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/';
const pokemonContainer = document.querySelector('#pokemon-container')


async function basePokemon(endpoint, value) {
    try {
        const response = await axios.get(`${API_URL}${endpoint}/${value}`);
        //console.log(response.data.pokemon);
        for (let i = 0; i < response.data.pokemon.length; i++) {
            let pokemon = response.data.pokemon[i];
            let name = pokemon.pokemon.name;
            //console.log(name);

            // cambiar nombre
            const pokeImage = await axios.get(pokemon.pokemon.url);
            const pokeTypes = pokeImage.data.types;
            
            const pokeMoves = pokeImage.data.moves.slice(0, 5);

            let imageURL = pokeImage.data.sprites.front_default;
            //console.log(imageURL);
            let number = pokeImage.data.id;

            function createPokemon(pokemon) {
                const divContainerPoke = document.createElement('div');
                divContainerPoke.classList.add('col', 'shadow', 'p-0', 'm-2', 'bg-body', 'rounded');

                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');

                const imgPokemones = document.createElement('img');
                imgPokemones.src = imageURL;
                imgPokemones.classList.add('img-fluid');

                const pokeButton = document.createElement('button');
                pokeButton.classList.add('btn', 'btn-success');
                pokeButton.textContent = 'Ver detalle';
                pokeButton.setAttribute('data-bs-toggle', 'modal');
                pokeButton.setAttribute('data-bs-target', `#poke-${number}`);

                divContainerPoke.addEventListener('click', () => {
                    console.log(pokeTypes);
                    const myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
                    let modalTitle = exampleModal.querySelector('.modal-title');
                    modalTitle.textContent = name;
                    const modalImage = exampleModal.querySelector('.modal-body img');
                    modalImage.src = imageURL;
                    const modalTypes = exampleModal.querySelector('.modal-body .types-container')

                    pokeTypes.forEach(type => {
                        const span = document.createElement('span');
                        span.classList.add('badge', 'bg-primary', 'mr-1');
                        span.textContent = type.type.name;
                        modalTypes.appendChild(span);
                    });
                    myModal.show();
                });

                imgContainer.appendChild(imgPokemones);
                const numberPokemon = document.createElement('p');
                numberPokemon.textContent = `#${number}`;
                numberPokemon.classList.add('text-center')

                const namePokemon = document.createElement('p');
                namePokemon.textContent = name;
                namePokemon.classList.add('text-center', 'h5')

                divContainerPoke.appendChild(imgContainer);
                divContainerPoke.appendChild(namePokemon);
                divContainerPoke.appendChild(numberPokemon);
                divContainerPoke.appendChild(pokeButton);

                pokemonContainer.append(divContainerPoke);

            }

            createPokemon(pokemon[i]);




        }
    } catch (error) {
        console.log(error)
    }
}

basePokemon('type', 'fire');
basePokemon('type', 'ground');
basePokemon('type', 'water');
basePokemon('type', 'electric');







