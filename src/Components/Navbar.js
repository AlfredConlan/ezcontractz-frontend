import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/img/logo.png";
import "./Grid.css";

//Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import AuthenticationButton from "./AuthenticationButton";

function NavBar() {
  // Check if the user is an admin
  let isAdmin = localStorage.getItem("Admin");
  if (isAdmin === true) {
    // If the uer is an admin, show the navbar with the Admin link
    return (
      <div>
        <Navbar collapseOnSelect expand="sm" className="blue-background" variant="dark">
          <Navbar.Brand href="/home" className="ms-5">
            <img src={logo} alt="logo" />
          </Navbar.Brand>
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav>
                <Link to="/tasks" style={{ textDecoration: "none" }} className="nav-link text-white">
                  Tasks
                </Link>
                <Link to="/contractor-search" style={{ textDecoration: "none" }} className="nav-link text-white">
                  ContractorSearch
                </Link>
                <Link to="/admin" id="adminLink" style={{ textDecoration: "none" }} className="nav-link text-white">
                  Admin
                </Link>
                <Link to="/profile" style={{ textDecoration: "none" }} className="nav-link text-white">
                  Profile
                </Link>
                <Link to="/aboutus" style={{ textDecoration: "none" }} className="nav-link text-white">
                  About Us
                </Link>
                <AuthenticationButton />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  } else {
    // If the uer is not an admin, show the navbar without the Admin link
    return (
      <div>
        <Navbar collapseOnSelect expand="sm" className="blue-background" variant="dark">
          <Navbar.Brand href="/home" className="ms-5">
            <img src={logo} alt="logo" />
          </Navbar.Brand>
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav>
                <Link to="/tasks" style={{ textDecoration: "none" }} className="nav-link text-white">
                  Tasks
                </Link>
                <Link to="/contractor-search" style={{ textDecoration: "none" }} className="nav-link text-white">
                  ContractorSearch
                </Link>
                <Link to="/profile" style={{ textDecoration: "none" }} className="nav-link text-white">
                  Profile
                </Link>
                <Link to="/aboutus" style={{ textDecoration: "none" }} className="nav-link text-white">
                  About Us
                </Link>
                <AuthenticationButton />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
