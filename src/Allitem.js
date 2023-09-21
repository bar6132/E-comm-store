import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import placeholderImage from "./404.jpg";
import "./Allitem.css";
import { Modal } from "react-bootstrap";

function Allitem() {
  const { StoreData, url } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

const filterProductsByCategoryAndSearch = (category, searchQuery) => {
  let filteredProducts = StoreData;

  // Filter by category
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }

  return filteredProducts;
};

useEffect(() => {
  // Filter products by the selected category and search query
  const filteredProducts = filterProductsByCategoryAndSearch(
    selectedCategory,
    searchQuery
  );

  // Update the total number of pages based on the filtered products
  const newTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  setTotalPages(newTotalPages);

  setProducts(filteredProducts);
}, [selectedCategory, searchQuery]);

  function truncateText(text, limit) {
    const words = text;
    if (words.length > limit) {
      return words.slice(0, limit) + "...";
    }
    return text;
  }

  if (!StoreData || StoreData.length === 0) {
    return <div>Loading...</div>;
  }

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      product.quantity = 1;
      existingCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.name} has been added to the cart!`);
  };

  if (!StoreData || StoreData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div style={{ marginBottom: "20px", marginLeft: "40%" }}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        style={{ marginBottom: "20px" }}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="Fashion and Apparel">Fashion and Apparel</option>
        <option value="Electronics and Gadgets">Electronics and Gadgets</option>
        <option value="Home and Furniture">Home and Furniture</option>
        <option value="Health and Wellness">Health and Wellness</option>
        <option value="Food and Groceries">Food and Groceries</option>
      </select>
      </div>
      <Container>
        <Row className="d-flex justify-content-center">
          {products.slice(startIndex, endIndex).map((product) => (
            <Col key={product.id} md={4}>
              <Card className="card w-100">
                {" "}
                <Card.Img
                  variant="top"
                  src={product.image ? url + product.image : placeholderImage}
                  alt="Product Image"
                  className="card-image"
                />
                <Card.Body className="cardbody">
                  <Card.Title>{truncateText(product.name, 10)}</Card.Title>
                  <Card.Text>{product.category}</Card.Text>
                  <Card.Text>{truncateText(product.description, 10)}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Button variant="primary" onClick={() => openModal(product)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
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

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        {selectedProduct && (
          <Modal.Body style={{ textAlign: "center" }}>
            <Card.Img
              variant="top"
              src={
                selectedProduct.image
                  ? url + selectedProduct.image
                  : placeholderImage
              }
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

export default Allitem;
