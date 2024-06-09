// css imports
import PokemonList from '../PokemonList/PokemonList';
import './Pokedex.css';

function Pokedex(){
    
    return (
        <div className="pokedex-wrapper">
            <h1>POKEDEX</h1>
            <PokemonList />
        </div>
    )
}
export default Pokedex;