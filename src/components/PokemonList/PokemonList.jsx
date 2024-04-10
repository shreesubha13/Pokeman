import { useEffect, useState } from 'react';
import './PokemonList.css';
import axios from 'axios';
import Pokeman from '../Pokeman/Pokeman';

function PokemonList() {
    const DEFAULT_URL ="https://pokeapi.co/api/v2/pokemon";
    const [PokemonList, setPokemonList] = useState([]);
    const [pokedexUrl, setpokedexUrl] = useState(DEFAULT_URL);
    const [nextUrl, setNextUrl] = useState(DEFAULT_URL);
    const [prevUrl, setPrevUrl] = useState(DEFAULT_URL);
    async function downloadPokemons() {
        const response = await axios.get(pokedexUrl ? pokedexUrl: DEFAULT_URL);

        const pokemonResult = response.data.results;
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        const pokemonPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
        const PokemonListData = await axios.all(pokemonPromise);
        
        const pokemonFinalList = PokemonListData.map(pokemonData => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image:pokemon.sprites.other.dream_world.front_default,
                type: pokemon.types
            }
        });
        setPokemonList(pokemonFinalList);
        
    }
   useEffect(() => {
      downloadPokemons();
   }, [pokedexUrl]);
   return (
    <div className='pokemon-list-wrapper'>
       <div><h1>Pokemon List</h1></div>
       <div className='page-controls'>
        <button onClick={()=> setpokedexUrl(prevUrl)}>Prev</button>
        <button onClick={()=> setpokedexUrl(nextUrl)}>Next</button>
       </div>
       <div className='Pokemon-list'>
       {PokemonList.map(pokemon => <Pokeman name={pokemon.name} key={pokemon.id} url={pokemon.image} id={pokemon.id} />)}
     </div>
    </div>
   );
}
export default PokemonList;