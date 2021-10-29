import React, { useContext } from "react"
import { Context } from "../Context"

const Header = () => {
  const { setCurrentStanding, setLeagueStandings, standingsPL, standingsBundesliga,
    standingsLaliga, standingsSerieA, standingsLigue1 } = useContext(Context)

  const setLeague = (standings) => {
    setLeagueStandings(standings)
    setCurrentStanding(standings)
  }

  return (
    <div className="tab-area">
      <button className="tablink" onClick={() => setLeague(standingsPL)}>Premier League</button>
      <button className="tablink" onClick={() => setLeague(standingsLaliga)}>La Liga</button>
      <button className="tablink" onClick={() => setLeague(standingsBundesliga)}>Bundesliga</button>
      <button className="tablink" onClick={() => setLeague(standingsSerieA)}>Serie A</button>
      <button className="tablink" onClick={() => setLeague(standingsLigue1)}>Ligue 1</button>
    </div>
  )
}

export default Header