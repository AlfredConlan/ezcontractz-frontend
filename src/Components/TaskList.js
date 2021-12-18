import TaskTable from "./TasksTable";
import NavBar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const TaskList = () => {
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      const { email } = user;
      if (email) {
        console.log("email is ", email);
        const urlString = "https://backend.ezcontractz.com/users/" + email;
        fetch(urlString, {
          method: "GET",
          headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.length !== 0) {
              localStorage.setItem("UserName", response[0].userName);
              console.log("respone.role = ", response[0].role);
              if (response[0].role === "admin" || response[0].role === "Admin") {
                localStorage.setItem("Admin", true);
                NavBar.setState();
              } else {
                localStorage.setItem("Admin", false);
              }
            } else {
              // document.location.replace("http://localhost:3000/registration");
              window.location.assign("http://localhost:3000/navbar");
            }
          });
      }
    }
  }, [user]);

  return (
    <div>
      <div className="profileHouseSection">
        <h1 className="text-center p-4 blue-text">Your Tasks</h1>
      </div>
      <div className="taskList">
        <TaskTable />
      </div>
    </div>
  );
};

export default TaskList;
