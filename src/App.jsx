import { useState } from 'react'
import './App.css'

function App() {

  const [pokemon, setPokemon] = useState(null)

  const [error, setError] = useState(null)

  const [input, setInput] = useState('')

  const [cargando, setCargando] = useState(null)

  const obtenerDatos = () => {
    setCargando(true)
    setError(null)
    setPokemon(null)


    console.log(input)
    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data)
        console.log("se ejecuta funcion obtenerDatos()")
      })
      .catch(error =>
        setError("Pokemon no encontrado")
      )
      .finally(() => {
        setCargando(false)
      })
  }

  return (
    <>
      <section>
        <h1>Prueba Tecnica</h1>
        <h3>Fetch de Datos - Test</h3>
        <input
          type="text"
          value={input}
          placeholder='Nombre del pokemon..'
          onChange={e => setInput(e.target.value)}
        />
        <br />
        <button
          onClick={obtenerDatos}
          className='obtain'
          disabled={cargando || !input.trim()} // Deshabilitar durante carga o input vacío
        >
          {cargando ? 'Buscando...' : 'Obtener Datos'}
        </button>
        <button onClick={() => {
          setPokemon(null)
          setInput('')
          setCargando(false)
          setError(null)
        }} className='clean' >Limpiar Datos</button>

      </section>

      {/* Mostrar indicador de carga */}
      {cargando && (
        <div className="cargando">
          <p>🔍 Buscando Pokémon...</p>
          {/* Puedes agregar un spinner aquí */}
        </div>
      )}

      {/* Mostrar los datos solo si ya se cargaron */}
      {pokemon && !cargando && (
        <div>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
      )}
      {
        error && !cargando && (
          <h3>{error}</h3>
        )
      }
    </>
  )
}

export default App
