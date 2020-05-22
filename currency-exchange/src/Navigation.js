import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { Fragment } from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
	const navStyle={
		color:'white'
	};
    return (
       	<div>
          <Fragment>
                <Navbar bg="dark" variant="dark" expand="md">
                  	<NavbarBrand className="Brand" href="/">
                    	X-rates Dash
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
    );
}
 
export default Navigation;