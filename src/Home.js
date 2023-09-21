import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import placeholderImage from "./404.jpg";
import "./Home.css";
import { Modal } from "react-bootstrap";

function Home() {
  const { StoreData, url } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function truncateText(text, limit) {
    const words = text;
    if (words.length > limit) {
      return words.slice(0, limit) + "...";
    }
    return text;
  }

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  if (!StoreData || StoreData.length === 0) {
    // Handle the case where data is not available yet, e.g., show a loading indicator.
    return <div>Loading...</div>;
  }



  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the product already exists in the cart
    const existingItemIndex = existingCart.findIndex((item) => item._id === product._id);
  
    if (existingItemIndex !== -1) {
      // If the product already exists, increment the quantity
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // If it's a new product, add it to the cart with a quantity of 1
      product.quantity = 1;
      existingCart.push(product);
    }
  
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.name} has been added to the cart!`);
  };
  


  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          {StoreData.reverse()
            .slice(-4)
            .map((product) => (
              <Col key={product.id} md={3}>
                <Card className="card w-100">
                  <Card.Img
                    variant="top"
                    src={product.image ? url + product.image : placeholderImage}
                    alt="Product Image"
                    className="card-image"
                  />
                  <Card.Body className="cardbody">
                    <Card.Title>{truncateText(product.name, 10)}</Card.Title>
                    <Card.Text>{product.category}</Card.Text>
                    <Card.Text>
                      {truncateText(product.description, 10)}
                    </Card.Text>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => openModal(product)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        {selectedProduct && (
          <Modal.Body style={{textAlign: "center"}}>
             <Card.Img
                    variant="top"
                    src={selectedProduct.image ? url + selectedProduct.image : placeholderImage}
                    alt="Product Image"
                    className="card-image"
                  />
            <h4>{selectedProduct.name}</h4>
            <p>{selectedProduct.description}</p>
            <p>מחיר: ${selectedProduct.price}</p>
            {/* Add more product details here */}
          </Modal.Body>
        )}
        <Modal.Footer>
  
          <Button
                      variant="info"
                      onClick={() => addToCart(selectedProduct)}
                      style={{ marginRight: "40%" }}
                    >
                      הוסף לסל
                    </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;