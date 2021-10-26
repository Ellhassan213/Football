import React, { useContext, useState } from 'react'
import { Context } from '../Context'

const SearchBar = () => {
  const { leagueStandings, setLeagueStandings } = useContext(Context)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (event) => {
    const { value } = event.target
    setSearchInput(value)
  }

  const handleBlur = (event) => {
    const { value } = event.target
    setSearchQuery(value.trim().toLowerCase())
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    let newStandings = []
    leagueStandings.map(obj => {
      const inTeamName = obj.team.name.toLowerCase().includes(searchQuery)
      const inRank = obj.points.toString().toLowerCase().includes(searchQuery)
      const inPoints = obj.rank.toString().toLowerCase().includes(searchQuery)
      if ( inTeamName || inRank || inPoints ) {
          newStandings = [...newStandings, obj]
      }
      return newStandings
    })
    // newStandings.length > 0 && setLeagueStandings(newStandings)
    newStandings.length > 0 ? setLeagueStandings(newStandings)
    : console.log("Search not found")
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          className='search-bar-input'
          type='text'
          name='searchQuery'
          value={ searchInput }
          onChange={ handleChange }
          onBlur={ handleBlur }
          placeholder='Search...'
        />
        <input
          type='submit'
          className='search-submit-btn'
          value='Submit'
        />
      </form>
    </div>
  )
}

export default SearchBar