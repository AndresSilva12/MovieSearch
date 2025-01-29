/* eslint-disable react/prop-types */
function RendererMovies ({movies}) {
    return (
        <ul className='w-full grid movies gap-2'>
        {movies.map(movie => (
            <li key={movie.id} className='rounded-2xl bg-slate-400 flex flex-col items-center justify-center'>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.img} alt={movie.title} className='h-72 w-48 cursor-pointer' />
            </li>
        ))}
        </ul>
    )
}

function NoResults (){
    return (
        <div>No se encontraron resultados</div>
    )
}

function Movies({movies}){
    const hasMovies = movies?.length > 0

    return(
        <>
        {
        hasMovies
            ? <RendererMovies movies={movies}/>
            : <NoResults/>
        }
        </>
    )
}

export default Movies