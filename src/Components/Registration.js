import "./Registration.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Registration() {
  const { user } = useAuth0();
  const { given_name, family_name, email } = user;

  function registerUser() {
    if (user) {
      const { email } = user;
      if (email) {
        fetch("https://backend.ezcontractz.com/users", {
          method: "POST",
          headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: document.getElementById("InputFirstName").value,
            lastName: document.getElementById("InputLastName").value,
            userName: document.getElementById("InputUserName").value,
            email: document.getElementById("InputEmail").value,
            location: document.getElementById("InputZip").value,
            role: "user",
            userImage: document.getElementById("InputImage").value,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            const userName = document.getElementById("InputUserName").value;
            localStorage.setItem("UserName", userName);
          })
          .then((res) => {
            let user_name = localStorage.getItem("UserName");
            if (user_name === "No One" || user_name === null) {
              return;
            } else {
              alert("User was added");
              document.location.replace("https://ezcontractz.com/tasks");
            }
          });
      }
    }
  }

  function validateRegistration(e) {
    e.preventDefault();
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
      // }
      // if (document.getElementById("InputPassword").value === "") {
      //   alert("Please provide your Password!");
      //   document.getElementById("InputPassword").focus();
      //   return false;
    } else {
      registerUser();
    }
  }

  // function convertPhoto(e) {
  //   e.preventDefault();

  //   let photo = document.getElementById("InputImage").value;

  //   uploadPhoto(photo);
  // }

  // function encodeImageFileAsURL(fileData) {
  //   alert(fileData);
  //   if (fileData) {
  //     var reader = new FileReader();
  //     reader.onloadend = function () {
  //       uploadPhoto(reader.result.substring("data:image/png;base64,".length).trim());
  //     };
  //     reader.readAsDataURL(fileData);
  //   }
  // }

  // function uploadPhoto(photo) {
  //   // const data = new FormData();
  //   // data.append("source", photo);
  //   axios
  //     .post(
  //       "https://backend.ezcontractz.com/image-upload",

  //       // body: data,
  //       { source: photo },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     // .then((res) => res.json())
  //     .then((res) => {});
  //   // .then((res) => {

  //   // });
  // }

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
              <input type="text" className="form-control" id="InputFirstName" required defaultValue={given_name} />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="InputLastName" className="form-label">
                Last Name
              </label>
              <input type="text" className="form-control" id="InputLastName" required defaultValue={family_name} />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="InputUserName" className="form-label">
                Username - this is what other users will see
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
            {/* <div className="mb-3 text-start">
              <label htmlFor="InputImage" className="form-label">
                Profile Photo
              </label>
              <input type="file" onChange={(e) => encodeImageFileAsURL(e.target.files[0])} />{" "}
            </div> */}
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
}

export default Registration;
