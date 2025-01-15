import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import './style/App.css';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");


  // Fetch data from the API
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setProjects([]); // Ensure the app doesn't break
        setFilteredProjects([]);
      });
  }, []);

  const handleSort = (key) => {
    const sortedProjects = [...filteredProjects].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });
    setFilteredProjects(sortedProjects);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  const handleFilter = (minPledge) => {
    const minAmount = Number(minPledge); // Convert input to a number
  
    if (isNaN(minAmount) || minPledge.trim() === "") {
      // If input is invalid or blank, reset to all projects
      setFilteredProjects(projects);
      return;
    }
  
    const filtered = projects?.filter(
      (project) => Number(project?.["amt.pledged"]) >= minAmount
    );
    setFilteredProjects([...filtered]);
  };
  

  // Filter projects based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = projects.filter(
      (project) =>
        project["percentage.funded"].toString().includes(term) ||
        project["amt.pledged"].toString().includes(term)
    );

    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  // Get current projects
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="app">
      <h1>Kickstarter Projects</h1>
      <input
        type="text"
        placeholder="Search by percentage or amount"
        value={searchTerm}
        onChange={handleSearch}
        aria-label="Search projects by percentage funded or amount pledged"
        className="search-bar"
      />
      <div className="filter-container">
        <label htmlFor="pledgeFilter">Filter by Amount Pledged:</label>
        <input
          type="number"
          id="pledgeFilter"
          placeholder="Enter minimum amount"
          onChange={(e) => handleFilter(e.target.value)} // Call the filter function
        />
      </div>
      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : filteredProjects.length > 0 ? (
        <>
          <p className="note-text">Note: Users can filter data in ascending or descending order by clicking on the <b>Percentage Funded</b> and <b>Amount Pledged</b> column headers.</p>
          <Table projects={currentProjects} onSort={handleSort} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredProjects.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      ) : (
        <div className="no-data">No projects found.</div>
      )}

    </div>
  );
};

export default App;
