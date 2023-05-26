import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Auth from "../utils/auth";

const NavFunction = () => {
    const isLoggedIn = Auth.loggedIn();

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">

            {isLoggedIn ? (
                <>
                    <Navbar.Brand as={Link} to="/" className="navBrand d-flex align-items-center">

                        <img alt="logo" style={{ display: "inline" }} className="logo" />
                        Fit  N  Run
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="navCollapse">

                        <Nav className="navLinks text-info">
                            <Nav.Link as={Link} to="/">
                                Profile
                            </Nav.Link>
                            <Nav.Link as={Link} to="/history">
                                History
                            </Nav.Link>
                            <Nav.Link as={Link} to="/workout">
                                Workout
                            </Nav.Link>
                        </Nav>
                        <Nav>
                        </Nav>
                    </Navbar.Collapse>
                </>
            ) :

                (<Navbar.Brand as={Link} to="/" className="navBrand d-flex align-items-center">
                    <img alt="logo" style={{ display: "inline" }} className="logo" />
                    Fit N Run
                </Navbar.Brand>)}
        </Navbar>
    );
};

export default NavFunction;