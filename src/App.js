import React, { useState, useEffect } from "react";
import axios from "axios";
import sampleLeagueData from "./data";
import LeagueTable from "./components/LeagueTable";

const App = () => {
  const [leagueName, setLeagueName] = useState("");
  const [season, setSeason] = useState("");
  const [leagueStandings, setLeagueStandings] = useState([]);

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/standings",
    params: { season: "2021", league: "39" },
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "e9ba380ff6msh8a2e587ba3fdbabp128eb0jsn2945efb5edb5",
    },
  };

  // useEffect(() => {
  //     axios.request(options)
  //         .then(res => {
  //             const response = res.data["response"]
  //             const {league} = response[0]
  //             const {name} = league
  //             const {season} = league
  //             const standings = league["standings"][0]

  //         setLeagueName(name)
  //         setSeason(season)
  //         setLeagueStandings(standings)
  //         })
  //         .catch(error => console.log("Error: ", error))
  // }, [])

  useEffect(() => {
    const { response } = sampleLeagueData;
    const { league } = response[0];
    const leagueName = league.name;
    const standings = league.standings[0];
    const season = league.season;

    setLeagueName(leagueName);
    setSeason(season);
    setLeagueStandings(standings);
  }, []);

  const sortByRank = (byPosition) => {
    if (byPosition) {
      setLeagueStandings((prev) => {
        const sorted = prev.sort((a, b) => {
          return a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0;
        });
        return sorted;
      });
    } else if (!byPosition) {
      setLeagueStandings((prev) => {
        const sorted = prev.sort((a, b) => {
          return b.rank < a.rank ? -1 : b.rank > a.rank ? 1 : 0;
        });
        return sorted;
      });
    }
  };

  const sortByTeam = (byTeam) => {
    if (byTeam) {
      setLeagueStandings((prev) => {
        const sorted = prev.sort((a, b) => {
          const nameA = a.team.name.toLowerCase();
          const nameB = b.team.name.toLowerCase();
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });
        return sorted;
      });
    } else if (!byTeam) {
      setLeagueStandings((prev) => {
        const sorted = prev.sort((a, b) => {
          const nameA = a.team.name.toLowerCase();
          const nameB = b.team.name.toLowerCase();
          return nameB < nameA ? -1 : nameB > nameA ? 1 : 0;
        });
        return sorted;
      });
    }
  };

  return (
    <div>
      <h1>
        {" "}
        The {leagueName} Table {season}{" "}
      </h1>
      <LeagueTable
        standings={leagueStandings}
        sortByRank={sortByRank}
        sortByTeam={sortByTeam}
      />
    </div>
  );
};

export default App;
