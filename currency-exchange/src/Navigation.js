import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse,
  NavbarToggler } from "reactstrap";
import "./Navigation.css";


const Navigation = (props) => {
  const navStyle = {
    color: "black",
    textDecoration: 'none',
    border:"none"
    
  };
  
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => setIsOpen(!isOpen);

  const headStyle = {
    color: "purple",
  };

  return (
    <div className="container">
            <Navbar
              bg="dark"
              variant="dark"
              expand="md"
            >
              <NavbarBrand style={headStyle} className="Brand" href="/CS510_FrontEnd_Final_Project#/">
                <h2><b>X-rates Dash</b></h2>
              </NavbarBrand>
              <NavbarToggler id="toggle" onClick={toggle} aria-controls="basic-navbar-nav" 
              aria-label="Toggle navigation">
              &#x290A;</NavbarToggler>
             
              <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/CS510_FrontEnd_Final_Project/#/Ratespage" style={navStyle}> 
                  Rates Table   
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/CS510_FrontEnd_Final_Project/#/Historic" style={navStyle}>
                      Historic Lookup
                  </NavLink>
                </NavItem>
              </Nav>
              </Collapse>
            </Navbar>
        </div>
       
  );
};

export default Navigation;