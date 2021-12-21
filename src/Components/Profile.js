import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  // Get the email from the login data returned from Auth0
  const { user } = useAuth0();
  const { email } = user;

  // This useEffect with run once after page load
  useEffect(() => {
    (async function () {
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
          // If the response is not empty, pre-populate the form
          if (response.length !== 0) {
            // Get the references
            const FirstName = document.getElementById("userFirstName");
            const LastName = document.getElementById("userLastName");
            const Email = document.getElementById("userEmail");
            const UserName = document.getElementById("userUserName");
            const Location = document.getElementById("userLocation");

            // Fill in the defaultValue of the fields
            FirstName.innerHTML = "First Name: <h5>" + response[0].firstName + "</h5>";
            LastName.innerHTML = "Last Name: <h5>" + response[0].lastName + "</h5>";
            Email.innerHTML = "Email: <h5>" + response[0].email + "</h5>";
            UserName.innerHTML = "Username: <h5>" + response[0].userName + "</h5>";
            Location.innerHTML = "Location: <h5>" + response[0].location + "</h5>";
          } else {
            console.log("Response is empty");
          }
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div>
        <h1 className="text-center p-4 blue-text">Profile</h1>
      </div>
      <div className="row align-items-center profile-header mt-lg-3">
        <div className=" container col-md-6 text-start text-md-center">
          <div className="card w-50 ms-auto me-auto">
            <div className="card-body">
              <p id="userFirstName" className="card-text"></p>
              <p id="userLastName" className="card-text"></p>
              <p id="userEmail" className="card-text"></p>
              <p id="userUserName" className="card-text"></p>
              <p id="userLocation" className="card-text"></p>
            </div>
            <div className="text-center">
              <a href="/edituser">
                <button type="text" className="btn btn-primary mb-3">
                  Edit
                </button>
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
