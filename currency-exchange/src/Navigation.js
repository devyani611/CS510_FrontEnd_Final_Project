import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const navStyle = {
    color: "black",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-xl-12">
          <Fragment>
            <Navbar
              style={{ height: "50px" }}
              bg="dark"
              variant="dark"
              expand="md"
            >
              <NavbarBrand style={navStyle} className="Brand" href="/">
                <h2>X-rates Dash</h2>
              </NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold">
                    <Link style={navStyle} to="/Ratespage">
                      Rates Table
                    </Link>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold">
                    <Link style={navStyle} to="/Historic">
                      Historic Lookup
                    </Link>
                  </NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default Navigation;