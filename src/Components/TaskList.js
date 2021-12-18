import TaskTable from "./TasksTable";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const TaskList = () => {
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      const { email } = user;
      if (email) {
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
            console.log("Response.length = ", response.length);
            if (response.length !== 0) {
              console.log("The response is: ", response);
              localStorage.setItem("UserName", response[0].userName);
              console.log("Username is: ", localStorage.getItem("UserName"));
            } else {
              console.log("Response is empty");
              // document.location.replace("http://localhost:3000/registration");
            }
          });
      }
    }
  }, [user]);

  return (
    <div>
      <div className="profileHouseSection">
        <h1 className="text-center p-4 blue-text display-3">Your Tasks</h1>
      </div>
      <div className="taskList">
        <TaskTable />
      </div>
    </div>
  );
};

export default TaskList;
