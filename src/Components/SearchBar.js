import React, { useState } from "react";
import { Row, Col, Form, Button, InputGroup, FormControl, Card, Modal, Dropdown } from "react-bootstrap";
import "./Grid.css";

export default function SearchBar() {
  const [businessInfo, setBusinessInfo] = useState([]);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState("");
  const [show, setShow] = useState(false);
  const [modalData, setmodalData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (contractor) => {
    setShow(true);
    setmodalData(contractor);
    usertask();
  };
  const [tasks, setTasks] = useState([]);
  const [assignedContractor, setAssignedContractor] = useState("");
  const usertask = () => {
    fetch(`https://ezcontractz-backend.herokuapp.com/tasks/${localStorage.getItem("UserName")}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setTasks(data);
        }
      });
  };
  // const [task, setTask] = useState([]);
  // ----------------------------------------------------Fetch on Submit--------------------------------------------------------------//
  //Note: Typically, a form refreshes on submit, so you have to put in the prevent default so it doesn't. Line 26)
  return (
    <div className="SearchBar">
      <h4>Select the Cateogry and enter your Zip Code to find a contractor in your area.</h4>
      <br></br>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("https://backend.ezcontractz.com/yelp", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              categories,
              location,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                alert(data.error);
              } else {
                setBusinessInfo(data.businesses);
              }
            });
        }}
      >
        <Row className="align-items-center">
          {/* //------------------------------------------------------------Category Input---------------------------------------------// */}
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
              Category
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>Category</InputGroup.Text>
              <select
                required
                onChange={(e) => {
                  setCategories(e.target.value);
                }}
                className="me-sm-2"
                input
                id="alias"
              >
                <option active selected disabled value="">
                  Select Category
                </option>
                <option value="carpet_cleaning">Carpet Cleaning</option>
                <option value="homecleaning">Cleaning</option>
                <option value="drywall">Drywall</option>
                <option value="electricians">Electricians</option>
                <option value="garage_door_services">Garage Door Repair</option>
                <option value="hvac">HVAC Repair</option>
                <option value="lawnservices">Lawn Care</option>
                <option value="painters">Painters</option>
                <option value="pest_control">Pest Control</option>
                <option value="plumbing">Plumbers</option>
                <option value="homeservices">Roofing</option>
                <option value="tvmounting">TV Mounting</option>
              </select>
            </InputGroup>
          </Col>
          {/* //--------------------------------------------------Location Input (included validation)----------------------------------// */}
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
              Location
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>Zip Code</InputGroup.Text>
              <FormControl
                required
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                input
                id="zipcode"
                placeholder="30080"
                minLength={5}
                maxLength={5}
              />
            </InputGroup>
          </Col>
          {/* //------------------------------------------------------Search Button with Fetch-----------------------------------------// */}
          <Col xs="auto">
            <Button type="submit" className="mb-2">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      {/* //-----------------------------------------Map through results and populate card-----------------------------------------// */}
      <div className="contractorGrid">
        {" "}
        {businessInfo.map((contractor, index) => {
          return (
            <div key={index} className="contractorCard">
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" height="165px" width="70px" src={contractor.image_url} />
                <Card.Body>
                  <Card.Title>
                    <h6>Name:</h6>
                    <h6>{contractor.name}</h6>
                  </Card.Title>
                  <Card.Text>
                    <h6>Phone:</h6>
                    <h6>{contractor.display_phone}</h6>
                  </Card.Text>
                  <Card.Text>
                    <h6>Rating:</h6> <h6>{contractor.rating}</h6>
                  </Card.Text>
                  <Card.Text>
                    <h6>Rating:</h6> <h6>{contractor.rating}</h6>
                  </Card.Text>
                  <Button variant="primary" classname="assignCButton" onClick={() => handleShow(contractor)}>
                    Assign Contractor
                  </Button>
                  {/* //-----------------------------Modal to assign Contractor(working shell with contractor info and user tasks-----*/}
                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    modalData={modalData} //assigning a prop
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>{modalData.name}</Modal.Title>
                      <Modal.Title>{modalData.display_phone}</Modal.Title>
                      {/* <img src={modalData.image_url} height="30%" width="30%"/> */}
                    </Modal.Header>

                    <Modal.Body></Modal.Body>
                    {/*------------------------------------------------ Dropdown menu that contains user tasks --------------------------*/}
                    <Dropdown>
                      <Dropdown.Toggle>Select the task to assign to this contractor.</Dropdown.Toggle>
                      <Dropdown.Menu show>
                        {" "}
                        {tasks.map((task, index) => {
                          return (
                            <div key={index}>
                              <Dropdown.Item eventKey="1">{task.taskName}</Dropdown.Item>
                              <Dropdown.Divider />
                            </div>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                    {/*------------------------------------------------End of Dropdown Menu---------------------------------------------*/}
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Assign
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Go to Task List
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/*--------------------------------------------------End of Modal--------------------------------------------------- */}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}
