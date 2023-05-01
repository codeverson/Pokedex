const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number'); 
const pokemonImage = document.querySelector('.pokemon__image'); 

const form = document.querySelector('.form'); 
const input = document.querySelector('.input__search'); 


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon (pokemon);

    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

    input.value = "";

});