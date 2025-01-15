import React from "react";
import "../style/Table.css";

const Table = ({ projects , onSort}) => {
  // Created a ref for tracking the table element
  // const tableRef = useRef();

  // Shift focus to the table when the component updates (e.g., on pagination change)
  // useEffect(() => {
  //   if (tableRef.current) {
  //     tableRef.current.focus();
  //   }
  // }, [projects]); // Runs every time `projects` changes

  return (
    <table  tabIndex="-1"> 
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
      </tbody>
    </table>
  );
};

export default Table;
