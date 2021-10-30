import React, { useContext, useState } from 'react'
import { Context } from '../Context'

const SearchBar = () => {
  const { currentStanding, setLeagueStandings } = useContext(Context)
  const [searchInput, setSearchInput] = useState('')
  let timerId

  const search = (value) => {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      let newStandings = []
      currentStanding.map(obj => {
        const inTeamName = obj.team.name.toLowerCase().includes(value)
        const inRank = obj.points.toString().toLowerCase().includes(value)
        const inPoints = obj.rank.toString().toLowerCase().includes(value)
        if ( inTeamName || inRank || inPoints ) {
          newStandings = [...newStandings, obj]
        }
        return newStandings
      })
      // newStandings.length > 0 && setLeagueStandings(newStandings)
      newStandings.length > 0 ? setLeagueStandings(newStandings)
      : setLeagueStandings([])
    }, 500);
  }

  const handleChange = (event) => {
    const { value } = event.target
    setSearchInput(value)
    search(value)
  }

  return (
    <div>
      <input
        className='search-bar-input'
        type='text'
        name='searchInput'
        value={ searchInput }
        onChange={ handleChange }
        placeholder='Search...'
      />
    </div>
  )
}

export default SearchBar