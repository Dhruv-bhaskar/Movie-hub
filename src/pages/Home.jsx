import React, { useEffect, useState } from 'react'
import Moviecard from "../components/MovieCard" 
import "../css/Home.css"
import { getPopularMovies, searchMovies } from '../services/api'

const Home = () => {

    const[searchQuery, setSearchQuery] = useState("")
    const[movies,setMovies] = useState([])
    const[error,Seterror] = useState(null)
    const[loading,setLoading] = useState(true)

    useEffect(()=>{
      const loadPopularMovies = async() => {
        try {
           const popularMovies = await getPopularMovies()
           setMovies(popularMovies) 
        } catch (err) {
            console.log(err);
            Seterror('Failed to load movies...')
        }
        finally{
            setLoading(false)
        }
      }

      loadPopularMovies()
    },[])
    
    const handleSearch = async (e) =>{
       e.preventDefault()
       if(!searchQuery.trim()) return
       if(loading) return

       setLoading(true)
       try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        Seterror(null)
       } catch (err) {
        console.log(err);
        Seterror('Failed to search movies...')
       }finally{
         setLoading(false)
       }
    }

  return (
    <div className='home'>
      <form onSubmit={handleSearch} className='search-form'>
        <input type="text" placeholder='Serach for movies...' className='search-input'
        value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}}/>
        <button className='search-btn'>Search</button>
      </form>

     <div className='movies-grid'>
         {movies.map(movie =>(<Moviecard movie = {movie} key = {movie.id}/>))}
      </div>
      
    </div>
  )
}

export default Home
