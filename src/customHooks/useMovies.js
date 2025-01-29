import withResoults from '../mocks/with-resoults.json'
import noResoults from '../mocks/no-resoults.json'
import { useState } from 'react'

export function useMovies ({ query }) {
  const [responseMovies, setResponseMovies] = useState([])
  
  const movies = responseMovies.Search 
  
  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    img: movie.Poster,
    year: movie.Year,
    type: movie.Type
  }))

  const getMovies = () => {
    if (query) {
      fetch(`https://www.omdbapi.com/?apikey=32f8713a&s=${query}`)
      .then(res => res.json())
      .then(data => {
        setResponseMovies(data)
      })
    } else {
      setResponseMovies(noResoults)
    }
  }

  return {movies : mappedMovies, getMovies }
}