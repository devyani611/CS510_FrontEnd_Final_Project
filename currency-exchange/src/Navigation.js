import React from 'react';
import { 
	Navbar, 
	NavbarBrand, 
	Nav, 
	NavItem, 
	NavLink, 
	Button 
} from "reactstrap";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
	const navStyle={
		color:'white'
	};
	
    return (
    	<div className="bootstrap-wrapper">
        	<div className="app-container container">
          		<div className="row">
            		<div className="col-lg-12 col-xl-12">
			          	<Fragment>
			                <Navbar bg="dark" variant="dark" expand="md">
			                  	<NavbarBrand style={navStyle}  className="Brand" href="/">
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
			    </div>
			</div>
		</div>
    );
}
 
export default Navigation;