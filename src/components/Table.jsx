import React from "react";
import "../style/Table.css";

const Table = ({ projects, onSort }) => {
  const totalRows = 5; 
  const emptyRows = totalRows - projects.length; 

  return (
    <table tabIndex="-1">
      <thead>
        <tr>
          <th onClick={() => onSort("S.No.")}>S.No.</th>
          <th onClick={() => onSort("percentage.funded")}>
            Percentage Funded
          </th>
          <th onClick={() => onSort("amt.pledged")}>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>

        {projects.map((project, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{project["percentage.funded"]}</td>
            <td>{project["amt.pledged"]}</td>
          </tr>
        ))}

        {[...Array(emptyRows)].map((_, index) => (
          <tr key={`empty-${index}`}>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
