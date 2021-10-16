import React, {useState} from "react";
import axios from "axios";
import StatTable from "./components/StatTable";

const App = () => {
  const [leagueName, setLeagueName] = useState("");
  const [season, setSeason] = useState("2021");
  const [leagueStandings, setLeagueStandings] = useState([]);

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

  const handleLeagueChoice = (season, league) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/standings",
      params: { season: season, league: league },
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "e9ba380ff6msh8a2e587ba3fdbabp128eb0jsn2945efb5edb5",
      },
    };
  
    axios.request(options)
        .then(res => {
            const response = res.data["response"]
            const {league} = response[0]
            const {name} = league
            const {season} = league
            const standings = league["standings"][0]

            setLeagueName(name)
            setSeason(season)
            setLeagueStandings(standings)
        })
        .catch(error => console.log("Error: ", error))
  }

  return (
    <main>
      <div className="tab-area">
        <button className="tablink" onClick={() => handleLeagueChoice(season, "39")}>Premier League</button>
        <button className="tablink" onClick={() => handleLeagueChoice(season, "140")}>La Liga</button>
        <button className="tablink" onClick={() => handleLeagueChoice(season, "78")}>Bundesliga</button>
        <button className="tablink" onClick={() => handleLeagueChoice(season, "135")}>Serie A</button>
        <button className="tablink" onClick={() => handleLeagueChoice(season, "61")}>Ligue 1</button>
      </div>
      <div className="stat-area">
        {leagueStandings.length > 0 ?
          <>
            <h1>
              {" "}
              The {leagueName} Table {season}{" "}
            </h1>
            <StatTable
              standings={leagueStandings}
              sortByRank={sortByRank}
              sortByTeam={sortByTeam}
            />
          </>
          :
          <h1> Please choose your league of choice (^^) </h1>
        }
      </div>
    </main>
  );
};

export default App;
