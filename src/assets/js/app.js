import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/';

async function basePokemon(endpoint, value) {
    try {
        const response = await axios.get(`${API_URL}${endpoint}/${value}`);
        console.log(response.data.pokemon);
        for (let i = 0; i < response.data.pokemon.length; i++) {
            let pokemon = response.data.pokemon[i];
            let namePoke = pokemon.pokemon.name;

            console.log(namePoke);

            const pokeImage = await axios.get(pokemon.pokemon.url)
            console.log(pokeImage);

            let imageURL = pokeImage.data.sprites.front_default;
            console.log(imageURL);

            
            const divContainerPoke = document.createElement('div')
            const imgPokemones = document.createElement('img');
            imgPokemones.src = imageURL;
            imgPokemones.classList.add('img-fluid');

            divContainerPoke.appendChild(imgPokemones);
            divContainerPoke.classList.add('col', 'p-0');
            divContainerPoke.id = '1';
            pokemonContainer.append(divContainerPoke);


        }
    } catch (error) {
        console.log(error)
    }
}

basePokemon('type', 'ground');
//const { default: axios } = require("axios");
const pokemonContainer = document.querySelector('#pokemon-container')






