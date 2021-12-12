import React, { useState } from "react";
import { Row, Col, Form, Button, InputGroup, FormControl, Card } from "react-bootstrap";
import "./Grid.css";

export default function SearchBar() {
  const [businessInfo, setBusinessInfo] = useState([]);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState("");
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // -----------------------------------------------------------Form Validation--------------------------------------------------------------//
  function validateInput(e) {
    // e.preventDefault();
    if (document.getElementById("alias").value === "null") {
      alert("Please select a category.");
      document.getElementById("alias").focus();
      return false;
    }
    if (document.getElementById("zipcode").value === "") {
      alert("Please provide your Zip Code!");
      document.getElementById("zipcode").focus();
      return false;
    } else if (document.getElementById("zipcode").value.length !== 5) {
      console.log(document.getElementById("zipcode").value.length);
      alert("Zip Code must be 5 digits!");
      document.getElementById("zipcode").focus();
      return false;
    } else {
      SearchBar();
    }
  }

  //1. need to make the category a drop down selector - complete
  //2. need to make the default value "select category"
  //3. need to pass the input from the user to the get the results (i.e. need to make the route dynamic) - complete
  //4. need to include stying for the pictures
  //Note: Typically, a form refreshes on submit, so you have to put in the prevent default so it doesn't. Line 26)
  return (
    <div className="SearchBar">
      <h6>Select the Cateogry and enter your Zip Code to find a contractor in your area.</h6>
      <br></br>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row className="align-items-center">
          {/* //------------------------------------------------------------Category Input-------------------------------------------------------------------// */}
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>Category
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>Category</InputGroup.Text>
              <Form.Select
                onChange={(e) => {
                  setCategories(e.target.value);
                }}
                className="me-sm-2" input id="alias">
                    <option value="null">Select Category</option>
                    <option value="carpet_cleaning">Carpet</option>
                    <option value="cleaners">Cleaning</option>
                    <option value="electricians">Electricians</option>
                    <option value="gutters">Gutter</option>
                    <option value="hvac">HVAC Repair</option>
                    <option value="installation">Installation</option>
                    <option value="lawnservices">Lawn Care</option>
                    <option value="painters">Painters</option>
                    <option value="pest_control">Pest Control</option>
                    <option value="plumbers">Plumbers</option>
                    <option value="roofing">Roofing</option>
                    <option value="windows">Window Services</option>
              </Form.Select>
              {/* <FormControl id="inlineFormInputGroup" placeholder="Plumbing" /> */}
            </InputGroup>
          </Col>
          {/* //----------------------------------------------------------Location Input--------------------------------------------------------------------// */}
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
              Location
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>Zip Code</InputGroup.Text>
              <FormControl onChange={
                (e) => {setLocation(e.target.value);
                }
                }input id="zipcode" placeholder="30080"/>
            </InputGroup>
          </Col>
          {/* //---------------------------------------------------------Search Button with Fetch---------------------------------------------------------------// */}
          <Col xs="auto">
            <Button
              onClick={() => {
                validateInput();
                fetch("https://ezcontractz-backend.herokuapp.com/yelp", {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    categories, location,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.error) {
                      alert(data.error);
                    } else {
                      console.log(data);
                      setBusinessInfo(data.businesses);
                    }
                  });
                // .then(function (response) {
                //   setBusinessInfo(response.data);
              }}
              type="submit" className="mb-2">Search
            </Button>
          </Col>
        </Row>
      </Form>
    {/* //---------------------------------------------Map through results and populate card---------------------------------------------------------------// */}
      <div className = "contractorGrid"> {
            businessInfo.map((contractor, index)=> {
              return(
                <div key={index} className = "contractorCard">
                  <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" height="165px" width="70px"src={contractor.image_url}/>
                      <Card.Body>
                        <Card.Title><h6>{contractor.name}</h6></Card.Title>
                          <Card.Text><h6>{contractor.phone}</h6></Card.Text>
                           
                            <Button variant="primary" onClick={handleShow}>Assign Contractor
                            </Button>  
     {/* //---------------------------------------------Modal to assign Contractor(working shell)---------------------------------------------------------------// */}                       
                            <Modal
                              show={show}
                              onHide={handleClose}
                              backdrop="static"
                              keyboard={false}                            
                            >
                    
                                <Modal.Header closeButton>
                                  <Modal.Title>ContractorName</Modal.Title>
                                </Modal.Header>
                                
                                <Modal.Body>Select the task you want to assign the contrctor to.                                  
                                
                                </Modal.Body>
                                
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={handleClose}>
                                    Close
                                  </Button>
                                  <Button variant="primary" onClick={handleClose}>
                                    Go to Task List
                                  </Button>
                                </Modal.Footer>
                              </Modal>                                                                 
                            </Card.Body>
                        </Card>             
              </div>
              )})
              }
              </div>
              <div>
              </div>     
              </div>);
            }  
    
