import React, { useState } from "react";

const LeagueTable = (props) => {
  const [byRank, setByRank] = useState(false);
  const [byTeam, setByTeam] = useState(true);

  const toggleByRank = () => {
    setByRank((prev) => !prev);
    props.sortByRank(byRank);
  };

  const toggleByTeam = () => {
    setByTeam((prev) => !prev);
    props.sortByTeam(byTeam);
  };

  const leagueTable = (
    <table className="league-table">
      <thead>
        <tr>
          <th onClick={toggleByRank}> Pos </th>
          <th onClick={toggleByTeam}> Team </th>
          <th onClick={toggleByRank}> Pts </th>
        </tr>
      </thead>
      <tbody>
        {props.standings.map((obj, i) => (
          <tr key={i}>
            <td> {obj.rank} </td>
            <td> {obj.team.name} </td>
            <td> {obj.points} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return <>{leagueTable}</>;
};

export default LeagueTable;
