import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import placeholderImage from "./404.jpg";
import { AppContext } from "./App";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import Modal from "react-bootstrap/Modal";


function Cart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const { url } = useContext(AppContext);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item._id === itemId) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            // If quantity is 1, remove the item
            return null; // Remove item from the updated cart
          }
        }
        return item;
      })
      .filter(Boolean); // Remove null items

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  const addToCart = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === itemId) {
        item.quantity += 1;
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  const displayedItems = cartItems.slice(startIndex, endIndex);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  };

  const handleFinishOrder = () => {
    setShowModal(true); 
  };

  const FinishOrder = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    alert("Order is complete!");
    setShowModal(false);
    window.location.href =("/")
  };


  return (
    <>
      {cartItems.length === 0 ? (
      <div>
        <h1>Your cart is empty.</h1>
        <p>Add items to your cart to continue shopping.</p>
      </div>
    ) : (
      <>
      <Row xs={1} md={4} className="g-4">
        {displayedItems.map((item, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                variant="top"
                src={item.image ? url + item.image : placeholderImage}
                className="card-image"
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.category}</Card.Text>
                <Card.Text style={{ height: "100px" }}>
                  {item.description}
                </Card.Text>
                <Card.Text>מחיר: ${item.price}</Card.Text>
                <div style={{ display: "flex" }}>
                  <Button
                    variant=""
                    onClick={() => removeFromCart(item._id)}
                  >
                    <span style={{ fontSize: "30px" }}>
                      <CiSquareMinus />
                    </span>
                  </Button>
                  <Card.Text style={{ fontSize: "30px", paddingTop: "15px" }}>
                    Quantity: {item.quantity}
                  </Card.Text>
                  <Button variant="" onClick={() => addToCart(item._id)}>
                    <span style={{ fontSize: "30px" }}>
                      <CiSquarePlus />
                    </span>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="pagination-text-center">
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-2">{currentPage}</span>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      <div style={{ position: "fixed", bottom: "20px", right: "47%" }}>
        <Button variant="success" onClick={handleFinishOrder} >Finish Order</Button>
      </div>




      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.map((item, idx) => (
            <div key={idx}>
              {/* Display cart item details here */}
              <p>{item.name} - Quantity: {item.quantity} - Price: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <hr />
          <p>Total Price: ${calculateTotalPrice()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {/* Add a button to clear the cart */}
          <Button variant="success" onClick={FinishOrder}>
            End Order
          </Button>
        </Modal.Footer>
      </Modal>

    </>
      )}
      </>
  );
}

export default Cart;