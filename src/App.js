import React, { useContext } from "react";
import StatTable from "./components/StatTable";
import { Context } from "./Context";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

const App = () => {
  const { SEASON, leagueName, leagueStandings } = useContext(Context)

  return (
    <main>
      <Header />
      <SearchBar />
      <div className="stat-area">
        {leagueStandings.length > 0 ?
          <>
            <h1>
              {" "}
              The {leagueName} Table {SEASON}{" "}
            </h1>
            <StatTable standings={leagueStandings} />
          </>
          :
          <h1>Fetching Data...</h1>
        }
      </div>
    </main>
  );
};

export default App;
