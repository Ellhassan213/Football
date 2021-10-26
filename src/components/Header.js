import React, { useContext } from "react"
import { Context } from "../Context"

const Header = () => {
  const { setLeagueStandings, standingsPL, standingsBundesliga,
    standingsLaliga, standingsSerieA, standingsLigue1 } = useContext(Context)
  return (
    <div className="tab-area">
      <button className="tablink" onClick={() => setLeagueStandings(standingsPL)}>Premier League</button>
      <button className="tablink" onClick={() => setLeagueStandings(standingsLaliga)}>La Liga</button>
      <button className="tablink" onClick={() => setLeagueStandings(standingsBundesliga)}>Bundesliga</button>
      <button className="tablink" onClick={() => setLeagueStandings(standingsSerieA)}>Serie A</button>
      <button className="tablink" onClick={() => setLeagueStandings(standingsLigue1)}>Ligue 1</button>
    </div>
  )
}

export default Header