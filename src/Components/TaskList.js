import TaskTable from "./TasksTable";
// import NavBar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const TaskList = () => {
  // Get the user from Auth0
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      // If the user exists, get their info from Auth0 and localStorage
      const { given_name, family_name, email } = user;
      localStorage.setItem("FirstName", given_name);
      localStorage.setItem("LastName", family_name);
      localStorage.setItem("Email", email);

      if (email) {
        // If the email exists, get the user's other info from the database
        const urlString = "https://backend.ezcontractz.com/users/" + email;
        fetch(urlString, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.length !== 0) {
              // If the response is not empty, set the UserName
              localStorage.setItem("UserName", response[0].userName);
              if (response[0].role === "admin" || response[0].role === "Admin") {
                // If the user is an admin, store the value for the navbar to use
                localStorage.setItem("Admin", true);
              } else {
                localStorage.setItem("Admin", false);
              }
            } else {
              document.location.replace("https://ezcontractz-frontend.herokuapp.com/registration");
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
