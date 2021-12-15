// import React, { useState } from "react";
// import {Dropdown} from "react-bootstrap";

// export default function MDropDown() {
//     const [tasks, setTasks] = useState([]); 
//     const [assignedContractor,setAssignedContractor] = useState("")
// //fetch to get task by user
// const usertask =() => {
//   fetch(`https://ezcontractz-backend.herokuapp.com/tasks/${localStorage.getItem("UserName")}`)
//     .then((res) => res.json())
//     .then((data) => {
//         if (data.error) {
//           alert(data.error);
//         } else {
//           console.log(data);
//           setTasks(data.task);
//         }        
//     })
// //put to update the assigned contractor to the task   
// const assignContractor = () => {
// fetch(`https://ezcontractz-backend.herokuapp.com/tasks/${localStorage.getItem("UserName")}`,{
//           method: "PUT",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.error) {
//               alert(data.error);
//             } else {
//               console.log(data);
//               setAssignedContractor(assignedContractor);
//             }
//           });
//         }
// return (
    
//     <div className = "contractorGrid">
//     <Dropdown.Menu show> {
//         tasks.map((task, index) => { 
//          return(   <div key={index}>           
//             <Dropdown.Item eventKey="1">{task.title}</Dropdown.Item>
//             <Dropdown.Divider /> 
//             </div>    
//          )          
//         }         
//         )
//     }</Dropdown.Menu>
//     </div>
// )
// }}