import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import "./MyNavbar.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import { AppContext } from "./App";


function MyNavbar() {
    const { StoreData, url } = useContext(AppContext);

  
    return (
      <Navbar expand="lg" className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand><NavLink to="/"  className="ll" >E-lux</NavLink>   </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
              E-lux
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-1">
                <NavLink to="/All" className="ll">
                  כל המוצרים
                </NavLink>
                <NavLink to="/Cart" className="ll">
                 <AiOutlineShoppingCart/>
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
  
  export default MyNavbar;