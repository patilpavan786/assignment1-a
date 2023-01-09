import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
function Home() {
  let initialValues;
  if (localStorage.getItem("users") === null) {
    initialValues = [];
  } else {
    initialValues = JSON.parse(localStorage.getItem("users"));
  }
  const [userData, setUserData] = useState(initialValues);
  const [fetching, setFetching] = useState(false);
  const fetchUsers = async () => {
    if (fetching) {
      alert("A data fetch is already in progress!");
      return;
    }
    setFetching(true);
    let dataArray = [];
    for (let i = 0; i < 100; i++) {
      const response = await fetch("https://randomuser.me/api");
      const data = await response.json();
      dataArray.push(data.results);
    }
    const flatDataArray = dataArray.flat();
    localStorage.setItem("users", JSON.stringify(flatDataArray));
    setUserData(JSON.parse(localStorage.getItem("users")));
    alert("Users fetched and stored in local storage");
  };
  function deleteUsers() {
    if (localStorage.getItem("users") === null) {
      alert("No users to delete!");
    } else {
      const response = window.prompt(
        "Are you sure you want to delete all the users? (Y/N)"
      );
      if (response === "Y" || response === "y") {
        localStorage.clear();
      }
    }
  }
  return (
    <div className="container">
      <div className="btn">
        <NavLink to="/">
          <button className="btn1" onClick={fetchUsers}>
            Fetch Users
          </button>
        </NavLink>
        <NavLink to="/Fetch">
          <button className="btn3">User Details</button>
        </NavLink>
        <button className="btn2" onClick={deleteUsers}>
          Delete Users
        </button>
      </div>
    </div>
  );
}

export default Home;
