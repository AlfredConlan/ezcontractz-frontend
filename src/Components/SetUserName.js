import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function SetUserName() {
  const { user } = useAuth0();
  const { email } = user;

  useEffect(() => {
    (async function () {
      const urlString = "https://ezcontractz-backend.herokuapp.com/users/" + email;
      await fetch(urlString, {
        method: "GET",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            console.log("The response is: ", response);
            localStorage.setItem("UserName", response.userName);
            console.log(localStorage.getItem("UserName"));
          } else {
            document.location.replace("https://ezcontractz.herokuapp.com:3000/registration");
          }
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
