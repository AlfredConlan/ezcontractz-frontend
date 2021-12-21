import "./Registration.css";
import { useEffect } from "react";

const EditUser = () => {
  // Get UserName to add to fetch URL
  let userName = localStorage.getItem("UserName");

  // Update the user based on form fields
  function updateUser() {
    const url = "https://backend.ezcontractz.com/users/modify/" + userName;
    fetch(url, {
      method: "PUT",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Send form values as body
        firstName: document.getElementById("InputFirstName").value,
        lastName: document.getElementById("InputLastName").value,
        userName: document.getElementById("InputUserName").value,
        email: document.getElementById("InputEmail").value,
        location: document.getElementById("InputZip").value,
        role: "user",
      }),
    })
      // Convert response to JSON format
      .then((res) => res.json())
      .then((res) => {
        const userName = document.getElementById("InputUserName").value;
        // Store userName for use in API calls
        localStorage.setItem("UserName", userName);
      })
      .then((res) => {
        let user_name = localStorage.getItem("UserName");
        if (user_name === null) {
          return;
        } else {
          alert("Profile was updated");
          // Update was successful. Redirect to Task component
          document.location.replace("https://ezcontractz-frontend.herokuapp.com/tasks");
        }
      });
  }

  function validateRegistration(e) {
    e.preventDefault();

    // Validate that each field has the proper data
    if (document.getElementById("InputFirstName").value === "") {
      alert("Please provide your First Name!");
      document.getElementById("InputFirstName").focus();
      return false;
    }
    if (document.getElementById("InputLastName").value === "") {
      alert("Please provide your Last Name!");
      document.getElementById("InputLastName").focus();
      return false;
    }
    if (document.getElementById("InputUserName").value === "") {
      alert("Please provide your User Name!");
      document.getElementById("InputUserName").focus();
      return false;
    }
    if (document.getElementById("InputEmail").value === "") {
      alert("Please provide your email!");
      document.getElementById("InputEmail").focus();
      return false;
    }
    if (document.getElementById("InputZip").value === "") {
      alert("Please provide your Zip Code!");
      document.getElementById("InputZip").focus();
      return false;
    } else if (document.getElementById("InputZip").value.length !== 5) {
      alert("Zip Code must be 5 digits!");
      document.getElementById("InputZip").focus();
      return false;
    } else {
      //All the fields passed validation. Perform the update
      updateUser();
    }
  }

  // This useEffect will run once after the initial rendering
  useEffect(() => {
    (async function () {
      // Get the email
      let email = localStorage.getItem("Email");

      // fetch the data using email
      const urlString = "https://backend.ezcontractz.com/users/" + email;
      await fetch(urlString, {
        method: "GET",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          // If the response is not empty, fill in the values
          if (response.length !== 0) {
            // Get references to the elements
            const FirstName = document.getElementById("InputFirstName");
            const LastName = document.getElementById("InputLastName");
            const Email = document.getElementById("InputEmail");
            const UserName = document.getElementById("InputUserName");
            const Location = document.getElementById("InputZip");

            // Set the default value for the fields
            FirstName.defaultValue = response[0].firstName;
            LastName.defaultValue = response[0].lastName;
            Email.defaultValue = response[0].email;
            UserName.defaultValue = response[0].userName;
            Location.defaultValue = response[0].location;
          } else {
            console.log("Response is empty");
          }
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row showBackground">
      <div className="col-s-0 col-md-1 col-lg-4"></div>
      <div className="col">
        <div className="container border border-primary border-2 mt-5 bg-white loginBackground">
          <form autoComplete="off" className="pb-3 pt-3" onSubmit={validateRegistration}>
            <div className="mb-3 text-start">
              <h1 className="text-center p-4 blue-text">Your Profile</h1>
              <label htmlFor="InputFirstName" className="form-label">
                First Name
              </label>
              <input type="text" className="form-control" id="InputFirstName" required />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="InputLastName" className="form-label">
                Last Name
              </label>
              <input type="text" className="form-control" id="InputLastName" required />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="InputUserName" className="form-label">
                Username
              </label>
              <input type="text" className="form-control" id="InputUserName" required />
            </div>{" "}
            <div className="mb-3 text-start">
              <label htmlFor="InputEmail" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control" id="InputEmail" required />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="InputZip" className="form-label">
                Zip Code
              </label>
              <input type="text" className="form-control" id="InputZip" required />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-s-0 col-md-1 col-lg-4"></div>
    </div>
  );
};

export default EditUser;
