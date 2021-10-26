import React, { useState, useContext } from "react";
import { Context } from "../Context";

const StatTable = (props) => {
  const { sortByRank, sortByTeam } = useContext(Context)
  const [isRankAscending, setByRank] = useState(false);
  const [isTeamAscending, setByTeam] = useState(true);

  const toggleByRank = () => {
    setByRank((prev) => !prev);
    sortByRank(isRankAscending);
  };

  const toggleByTeam = () => {
    setByTeam((prev) => !prev);
    sortByTeam(isTeamAscending);
  };

  const statTable = (
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

  return <>{statTable}</>;
};

export default StatTable;
