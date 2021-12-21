import "./Registration.css";

const Registration = () => {
  // get the user info out of localStorage
  let firstName = localStorage.getItem("FirstName");
  let lastName = localStorage.getItem("LastName");
  let email = localStorage.getItem("Email");

  function registerUser() {
    fetch("https://backend.ezcontractz.com/users", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Create the body from the form fields values
        firstName: document.getElementById("InputFirstName").value,
        lastName: document.getElementById("InputLastName").value,
        userName: document.getElementById("InputUserName").value,
        email: document.getElementById("InputEmail").value,
        location: document.getElementById("InputZip").value,
        role: "user",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // Store the user's username for API calls
        const userName = document.getElementById("InputUserName").value;
        localStorage.setItem("UserName", userName);
      })
      .then((res) => {
        let user_name = localStorage.getItem("UserName");
        // If the username is empty, return
        if (user_name === null) {
          return;
        } else {
          // Let the user know they were added and reroute them to the tasks component
          alert("User was added");
          document.location.replace("https://ezcontractz-frontend.herokuapp.com/tasks");
        }
      });
  }

  function validateRegistration(e) {
    e.preventDefault();

    // Validate the values in each field
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
      //Everything is validated so register the user
      registerUser();
    }
  }

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
              <input type="text" className="form-control" id="InputFirstName" required defaultValue={firstName} />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="InputLastName" className="form-label">
                Last Name
              </label>
              <input type="text" className="form-control" id="InputLastName" required defaultValue={lastName} />
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
              <input type="email" className="form-control" id="InputEmail" required defaultValue={email} />
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

export default Registration;
