import React, { useEffect, useState } from "react"
import axios from "axios";

const Context = React.createContext()


const Provider = ({children}) => {
  const SEASON = '2021'
  const [leagueStandings, setLeagueStandings] = useState([]);

  const [standingsPL, setStandingsPL] = useState([]);
  const [standingsLaliga, setStandingsLaliga] = useState([]);
  const [standingsBundesliga, setStandingsBundesliga] = useState([]);
  const [standingsSerieA, setStandingsSerieA] = useState([]);
  const [standingsLigue1, setStandingsLigue1] = useState([]);


  const leagueIDs = {
    premierLeague: '39',
    laLiga: '140',
    bundesliga: '78',
    serieA: '135',
    ligue1: '61'
  }

  const fetchLeagueStandings = (league, setStandings) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/standings",
      params: { season: SEASON, league: league },
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "e9ba380ff6msh8a2e587ba3fdbabp128eb0jsn2945efb5edb5",
      },
    };
  
    axios.request(options)
        .then(res => {
            const response = res.data["response"]
            const {league} = response[0]
            // const {name} = league
            const standings = league["standings"][0]

            setStandings(standings)
        })
        .catch(error => console.log("Error: ", error))
  }

  const sortByRank = (isRankAscending) => {
    setLeagueStandings((prev) => {
      const sorted = prev.sort((a, b) => {
        if(isRankAscending) {
          return a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0;
        }else {
          return b.rank < a.rank ? -1 : b.rank > a.rank ? 1 : 0;
        }
      });
      return sorted;
    });
  };

  const sortByTeam = (isTeamAscending) => {
    setLeagueStandings((prev) => {
      const sorted = prev.sort((a, b) => {
        const nameA = a.team.name.toLowerCase();
        const nameB = b.team.name.toLowerCase();
        if(isTeamAscending) {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        }else{
          return nameB < nameA ? -1 : nameB > nameA ? 1 : 0;
        }
      });
      return sorted;
    });
  };

  useEffect(() => {
    fetchLeagueStandings(leagueIDs.premierLeague, setStandingsPL)
    fetchLeagueStandings(leagueIDs.bundesliga, setStandingsBundesliga)
    fetchLeagueStandings(leagueIDs.laLiga, setStandingsLaliga)
    fetchLeagueStandings(leagueIDs.serieA, setStandingsSerieA)
    fetchLeagueStandings(leagueIDs.ligue1, setStandingsLigue1)
    
    // Default
    fetchLeagueStandings(leagueIDs.premierLeague, setLeagueStandings)
  }, [leagueIDs.bundesliga, leagueIDs.laLiga, leagueIDs.ligue1, leagueIDs.premierLeague, leagueIDs.serieA])


  return (
    <Context.Provider value={{
        SEASON,
        leagueStandings, standingsPL,
        standingsSerieA, standingsBundesliga,
        standingsLaliga, standingsLigue1,
        sortByRank, sortByTeam,
        setLeagueStandings
      }}>
      {children}
    </Context.Provider>
  )
}

export {Context, Provider}