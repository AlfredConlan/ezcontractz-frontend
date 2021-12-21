import React, { useState, useEffect, useMemo, useRef, } from "react";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash, Pencil, PlusCircleFill, Hammer } from "react-bootstrap-icons";
import "./styles.css";
import axios from "axios";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const TaskTable = (props) => {
  const [tasks, setTasks] = useState([]);
  const [searchTasks, setSearchTasks] = useState("");
  const tasksRef = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handle2Close = () => setShow2(false);
  const handle2Show = (rowIndex) => {
    setShow2(true)
  };
  // Defining newTask in order to pass data in post request 
  const [newTask, setNewTask] = useState({
    taskName: "",
    description: "",
    maxBudget: "",
    category: "",
    assignedContractor: "",
    date: "",
  });
  const [taskEdit, setTaskEdit] = useState({
    taskName: "",
    description: "",
    maxBudget: "",
    category: "",
    assignedContractor: "",
    date: "",
  });

  tasksRef.current = tasks;

  //Setting user
  const { user } = useAuth0();

  //Trying to Update State of Modal Form to capture values
  const onInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Not working
  const onChangeSearchTasks = (e) => {
    const searchTasks = e.target.value;
    setSearchTasks(searchTasks);
  };

  // Fetching tasks from database - NEED TO UPDATE TO TARGET BASED ON USER NAME
  const retrieveTasks = () => {
    const user_name = localStorage.getItem("UserName");
    fetch("https://backend.ezcontractz.com/tasks/" + user_name)
      .then((resp) => resp.json())
      .then((resp) => {
        setTasks(resp);
      });
  };

  //Refreshing the task list 
  const refreshList = () => {
    retrieveTasks();
  };


  useEffect(() => {
    if (user) {
      const { email } = user;
      if (email) {
        const urlString = "https://ezcontractz-backend.herokuapp.com/users/" + email;
        fetch(urlString, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.length !== 0) {
              localStorage.setItem("UserName", response[0].userName);
            }
          });
      }
    }
    retrieveTasks();
  }, []);

  //Search Bar
  const searchCriteria = tasks.filter(task => task.taskName.includes(searchTasks))

  // Delete task Function
  const deleteTasks = (rowIndex) => {
    const id = tasksRef.current[rowIndex].id;
    axios.delete("https://ezcontractz-backend.herokuapp.com/tasks/delete/" + id).then((resp) => {
      refreshList();
    })
  };

  // Function to add a task via the modal
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: localStorage.getItem("UserName"),
        taskName: newTask.taskName,
        description: newTask.description,
        maxBudget: newTask.maxBudget,
        assignedContractor: newTask.assignedContractor,
        scheduled: newTask.scheduled,
        date: newTask.date,
        category: newTask.category,
      }),
    };
    fetch("https://ezcontractz-backend.herokuapp.com/tasks", requestOptions)
      .then((response) => response.json())
      .then((resp) => {
        refreshList();
        handleClose();
      });
  };

  // Function to edit task via the modal
  const handle2Submit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: localStorage.getItem("UserName"),
        taskName: newTask.taskName,
        description: newTask.description,
        maxBudget: newTask.maxBudget,
        assignedContractor: newTask.assignedContractor,
        scheduled: newTask.scheduled,
        date: newTask.date,
        category: newTask.category,
      }),
    };
    fetch("https://ezcontractz-backend.herokuapp.com/tasks/updatebyid/" + newTask.taskName, requestOptions)
      .then((response) => response.json())
      .then((resp) => {
        refreshList();
        handleClose();
      });
  };

  // Defining the columns for the React Table 
  const columns = useMemo(
    () => [
      {
        Header: "Task Name",
        accessor: "taskName",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Assigned Contractor",
        accessor: "assignedContractor",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Max Budget",
        accessor: "maxBudget",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span>
                <Hammer className="far fa-edit action ms-2 xxl" 
                onClick={() => document.location.replace("/contractor-search")} 
                />
              </span>
              <span
                onClick={() => handle2Show()}
              >
                <Pencil className="far fa-edit action ms-2 xl" />
              </span>
              <span onClick={() => {
                deleteTasks(rowIdx)
              }}>
                <Trash className="bi bi-trash ms-2 xxl" fill="red" />
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  
  // Search Bar Functionality 
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: searchCriteria ? searchCriteria : tasks,
  });

  return (
    <div className="container">
      <div className="list row">
        <div className="col-md-8 container">
          <div className="input-group mb-3">
            <input type="text" className="form-control me-2" placeholder="Search by Task Name Here" value={searchTasks} onChange={onChangeSearchTasks} />
            <div className="input-group-append">
              <Button variant="primary" className="btn btnOrange ps-1" onClick={handleShow}>
                Add Task
                <span className="ml-3">
                  <PlusCircleFill className="mb-1 ms-2" />
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-12 list">
          <table className="table table-striped table-bordered" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* // Modal to add task  */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>ADD A TASK!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="taskName" value={newTask.taskName} name="taskName" placeholder="Task Name" onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Form.Group controlId="custom-select" className="mb-3" value={newTask.category}>
              {/* <Form.Control value={newTask.taskName} /> */}
              <InputGroup className="mb-2" value={newTask.category}>
                <InputGroup.Text>Category</InputGroup.Text>
                <select
                  required
                  onChange={(e) => {
                    onInputChange(e);
                  }}
                  className="me-sm-2"
                  input
                  id="category"
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
                  <option value="roofing_company">Roofing</option>
                  <option value="tvmounting">TV Mounting</option>
                </select>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="description" value={newTask.description} name="description" placeholder="Description" onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Select Date</Form.Label>
              <Form.Control type="date" name="date" value={newTask.scheduled} placeholder="Schedule Date" onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="maxBudget">
              <Form.Label>Max Budget</Form.Label>
              <Form.Control type="maxBudget" value={newTask.maxBudget} name="maxBudget" placeholder="Max Budget (Number)" onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Form.Group>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" className="pe-4">
                ADD TASK
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      {/* Second modal for editing the task  */}
      <Modal show={show2} onHide={handle2Close} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handle2Submit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="taskName" value={newTask.taskName} name="taskName" placeholder="Task Name" onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Form.Group controlId="custom-select" className="mb-3">
              <InputGroup className="mb-2">
                <InputGroup.Text>Category</InputGroup.Text>
                <select
                  required
                  onChange={(e) => {
                    onInputChange(e);
                  }}
                  className="me-sm-2"
                  input
                  id="category"
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
                  <option value="roofing_company">Roofing</option>
                  <option value="tvmounting">TV Mounting</option>
                </select>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="description" value={newTask.description} name="description" placeholder="Description" onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="assignedContractor">
              <Form.Label>Assigned Contractor</Form.Label>
              <Form.Control
                type="assignedContractor"
                value={newTask.assignedContractor}
                name="assignedContractor"
                placeholder="Assigned Contractor"
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Select Date</Form.Label>
              <Form.Control type="date" name="date" value={newTask.scheduled} placeholder="Schedule Date" onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="maxBudget">
              <Form.Label>Max Budget</Form.Label>
              <Form.Control type="maxBudget" value={newTask.maxBudget} name="maxBudget" placeholder="Max Budget (Number)" onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Form.Group>
              <Button variant="secondary" onClick={handle2Close}>
                Close
              </Button>
              <Button variant="primary" type="submit" className="pe-4">
                ADD TASK
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskTable;
