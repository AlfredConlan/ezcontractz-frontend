// src/views/profile.js

// import React from "react";
import { useEffect, setState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  const { email } = user;

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
          // console.log(response.status);
          if (response.length !== 0) {
            //
            // setState for user image
            // console.log("image is :", response[0].userImage.toString("base64"));
            // this.setState({ data: response[0].userImage.toString("base64") });

            console.log("The response is: ", response);
            // const Image = document.getElementById("userImage");
            const FirstName = document.getElementById("userFirstName");
            const LastName = document.getElementById("userLastName");
            const Email = document.getElementById("userEmail");
            const UserName = document.getElementById("userUserName");
            const Location = document.getElementById("userLocation");

            // Image.innerHTML = "<img src={`data:image/jpeg;base64,${this.state.data}`} />";
            FirstName.innerHTML = "First Name: <h5>" + response[0].firstName + "</h5>";
            LastName.innerHTML = "Last Name: <h5>" + response[0].lastName + "</h5>";
            Email.innerHTML = "Email: <h5>" + response[0].email + "</h5>";
            UserName.innerHTML = "Username: <h5>" + response[0].userName + "</h5>";
            Location.innerHTML = "Location: <h5>" + response[0].location + "</h5>";
          } else {
            // document.location.replace("http://localhost:3000/registration");
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
              <img src="" id="userImage" alt="profile" className="card-img-top rounded-circle img-fluid profile-picture mb-3 mb-md-0" />
              <p id="userFirstName" className="card-text"></p>
              <p id="userLastName" className="card-text"></p>
              <p id="userEmail" className="card-text"></p>
              <p id="userUserName" className="card-text"></p>
              <p id="userLocation" className="card-text"></p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <pre className="col-12 text-light bg-dark p-4">{JSON.stringify(user, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default Profile;
