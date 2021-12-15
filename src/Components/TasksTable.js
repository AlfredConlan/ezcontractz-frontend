import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash, Pencil } from "react-bootstrap-icons";
import "./styles.css"; 
import axios from 'axios';
import { Modal, Button, Form } from "react-bootstrap"; 

const TaskTable = (props) => {
  const [tasks, setTasks] = useState([]);
  const [searchTasks, setSearchTasks] = useState("");
  const tasksRef = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newTask, setNewTask] = useState({
    taskName: "", description: "", maxBudget: "", category: "", assignedContractor: "", 
  });

  tasksRef.current = tasks;



  //Declaring variables for newTask modal 
  const { taskName, description, maxBudget } = newTask;

  //Trying to Update State of Modal Form to capture values 
  const onInputChange = (e) => {
    setNewTask({...newTask,[e.target.name]: e.target.value})
    // setNewTask({...newTask,[e.target.description]: e.target.value})
    // setNewTask({...newTask,[e.target.name]: e.target.value})
}

  // Not working 
  const onChangeSearchTasks = (e) => {
    const searchTasks = e.target.value;
    setSearchTasks(searchTasks);
  };

  // Fetching tasks from database - NEED TO UPDATE TO TARGET BASED ON USER NAME
  const retrieveTasks = () => {
    const user_name = localStorage.getItem("UserName");
    console.log(user_name)
    fetch("https://ezcontractz-backend.herokuapp.com/tasks/" + user_name)
      .then((resp) => resp.json())
      .then((resp) => {
        setTasks(resp);
        // console.log(tasks);
        // console.log(user_name);
      });
  };

  const refreshList = () => {
    retrieveTasks();
  };

  useEffect(() => {
    retrieveTasks();
  }, []);

  const findByTitle = () => {
    tasks
      .findByTitle(tasks)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openTasks = (rowIndex) => {
    const id = tasks.current[rowIndex].id;

    props.history.push("/tasks/" + id);
  };

  const deleteTasks = (rowIndex) => {
    const id = tasksRef.current[rowIndex].id;
    console.log(tasksRef.current[rowIndex].id);
    axios.delete("http://localhost:3001/tasks/delete/" + id)
      .then(resp => {
        console.log(resp)
        refreshList();
        // if (resp.data.userDeleted){
        //   setTriggerUseEffect(triggerUseEffect+1)
        // }
      })
  };

  // Function to submit task via the modal 
  const handleSubmit = (e) => {
    e.preventDefault();
    // setNewTask(taskName, description, maxBudget);
    const requestOptions = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        userName: localStorage.getItem("UserName"),
        taskName: newTask.taskName,
        description: newTask.description,
        maxBudget: newTask.maxBudget,
        assignedContractor:newTask.assignedContractor,
        scheduled: newTask.scheduled,
        date: newTask.date,
        category: newTask.category
      })
    };
    fetch('http://localhost:3001/tasks', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(resp=> {
        refreshList();
        handleClose();
      })
  }

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
        Header: "Scheduled",
        accessor: "scheduled",
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
              <span onClick={() => openTasks(rowIdx)}>
                <Pencil className="far fa-edit action mr-2" />
              </span>
              <span onClick={() => deleteTasks(rowIdx)}>
                <Trash className="bi bi-trash" />
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: tasks,
  });

  return (
    <div className="container">
      <div className="list row">
        <div className="col-md-8 container">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search by title" value={searchTasks} onChange={onChangeSearchTasks} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btnOrange" type="button" onClick={findByTitle}>
                Search
              </button>
              <Button variant="primary" className="btn btn-success" onClick={handleShow}>
                Add A Task
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ADD A TASK!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="taskName" value={newTask.taskName} name="taskName" placeholder="Task Name"
                onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control type="category" value={newTask.category} name="category" placeholder="Category"
                onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="description" value={newTask.description} name="description" placeholder="Description"
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="assignedContractor">
              <Form.Label>Assigned Contractor</Form.Label>
              <Form.Control type="assignedContractor" value={newTask.assignedContractor} name="assignedContractor" placeholder="Assigned Contractor"
                onChange={(e) => onInputChange(e)} />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="scheduled">
              <Form.Label>Scheduled</Form.Label>
              <Form.Control type="scheduled" value={newTask.scheduled} name="scheduled" placeholder="Scheduled"
                onChange={(e) => onInputChange(e)} />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="maxBudget">
              <Form.Label>Max Budget</Form.Label>
              <Form.Control type="maxBudget" value={newTask.maxBudget} name="maxBudget" placeholder="Max Budget (Number)"
                onChange={(e) => onInputChange(e)} />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">ADD TASK</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" >ADD TASK</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskTable;
