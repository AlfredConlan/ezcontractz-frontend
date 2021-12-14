// import React from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./profile.css";

const Profile = () => {
  const { user } = useAuth0();
  const { email } = user;

  useEffect(() => {
    (async function () {
      const urlString = "https://backend.ezcontractz.com/users/" + email;
      console.log(email);
      await fetch(urlString, {
        method: "GET",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.length !== 0) {
            console.log("The response is: ", response);
            const Image = document.getElementById("userImage");
            const FirstName = document.getElementById("userFirstName");
            const LastName = document.getElementById("userLastName");
            const Email = document.getElementById("userEmail");
            const UserName = document.getElementById("userUserName");
            const Location = document.getElementById("userLocation");

            Image.innerHTML = response[0].userImage;
            FirstName.innerHTML = "First Name: <h5>" + response[0].firstName + "</h5>";
            LastName.innerHTML = "Last Name: <h5>" + response[0].lastName + "</h5>";
            Email.innerHTML = "Email: <h5>" + response[0].email + "</h5>";
            UserName.innerHTML = "Username: <h5>" + response[0].userName + "</h5>";
            Location.innerHTML = "Location: <h5>" + response[0].location + "</h5>";
          } else {
            document.location.replace("https://ezcontractz.herokuapp.com:3000/registration");
          }
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div>
        <h1 className="text-center p-4 text-primary">Profile</h1>
      </div>
      <div className="container mt-lg-3">
        <div className="card w-25">
          <div className="card-body">
            <img id="userImage" src="" alt="Profile" className="rounded-circle img-fluid profile-picture mb-3 mb-md-0" />
            <p id="userFirstName" className="lead card-text"></p>
            <p id="userLastName" className="lead card-text"></p>
            <p id="userEmail" className="lead card-text"></p>
            <p id="userUserName" className="lead card-text"></p>
            <p id="userLocation" className="lead card-text"></p>
            <div className="text-center">
              <a href="/registration" class="btn btn-primary">
                Edit Profile
              </a>
            </div>
          </div>
        </div>
        <div className=" container col-md-6 text-start text-md-center"></div>
      </div>

      {/* <div className="row">
        <pre className="col-12 text-light bg-dark p-4">{JSON.stringify(user, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default Profile;
