import { useEffect, useRef ,useState } from 'react'
import './App.css'
import Movies from './components/Movies'
import { useMovies } from './customHooks/useMovies'

function useSearch() {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(()=> {
    if (isFirstInput.current){
      isFirstInput.current = query == ''
      return
    }

    if (query == ''){
      setError('Ingrese un nombre de pelicula válido')
      return
    }
    if (query.length < 2){
      setError('La busqueda debe tener al menos 2 caracteres')
      return
    }
  
    setError(null)
  },[query])

  return { query, setQuery, error }
}

function App() {
  const {query, setQuery, error} = useSearch()
  const {movies, getMovies} = useMovies({query})
  
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }
  
  //Forma Controlada se utiliza un estado 'query,setQuery'
  //Forma NO Controlada
  // const handleSubmitNoControl = (event) => {
  //   event.preventDefault()
  //   const data = Object.fromEntries(new FormData(event.target))
  //   console.log(data)
  //   const query = data.get('query')
  //   console.log(query)
  // }

  //Usando useRef()
  // const handleSubmitRef = (event) => {
  //   event.preventDefault()
  //   const value = input.current.value
  //   console.log(value)
  // }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }



  return (
    <>
      <h1>Cuevana 4</h1>
      <header className='flex items-center'>
        <form onSubmit={handleSubmit} className='flex items-center h-4 gap-4 bg-slate-700 p-10 rounded-2xl'>
          <label htmlFor="">
            <b>Search Movie</b>
            <input onChange={handleChange} value={query} name='query' className='ml-4 border-1 border-white' placeholder='Avengers, Matrix, Star Wars...'/>
          </label>
          <button type='submit'>Search</button>
        </form>
        {error && <p className='text-red-600 font-bold'>{error}</p>}
      </header>

      <main className='w-full mt-10'>
        <Movies movies={movies}/>
      </main>
    </>
  )
}

export default App
