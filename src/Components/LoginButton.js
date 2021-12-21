import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  // Use Auth0 to login
  const { loginWithRedirect } = useAuth0();

  return (
    // Login button
    <button className="btn btn-primary ms-2" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;
