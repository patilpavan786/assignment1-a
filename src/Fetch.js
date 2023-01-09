import React, { useState } from "react";
import { NavLink } from "react-router-dom";
function Fetch() {
  const [search, setSearch] = useState(""); //  search state
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const data = JSON.parse(localStorage.getItem("users"));

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // added search method
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let filteredData = data;
  if (filter !== "all") {
    filteredData = data.filter((user) => user.gender === filter);
  }
  // added search filter
  if (search) {
    filteredData = filteredData.filter(
      (user) =>
        (user.name.first + " " + user.name.last)
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  const pageData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NavLink style={{ fontSize:30  }} to="/">
          Home
        </NavLink>
          <input
            type="text"
            placeholder="Search by name or email"
            className="form-control"
            style={{ marginTop: 50, marginBottom: 20, width: 400 }}
            onChange={handleSearchChange}
          ></input>
          <div>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            a Page {page}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        

        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>
                {" "}
                <select value={filter} onChange={handleFilterChange}>
                  <option value="all">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </th>
              <th>Age</th>
              <th>Location</th>
              <th>streetcode</th>
              <th>Email</th>
              <th>Phone</th>

              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((user) => (
              <tr key={user.login.uuid}>
                <td>
                  {user.name.title} {user.name.first} {user.name.last}
                </td>
                <td>{user.gender}</td>

                <td>{user.dob.age}</td>
                <td>{user.location.street.number} </td>

                <td>
                  {user.location.street.name}
                  {user.location.city}, {user.location.state}
                  {user.location.country}
                </td>

                <td>{user.email}</td>
                <td>{user.phone}</td>

                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Fetch;
