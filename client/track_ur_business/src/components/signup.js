import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/actions/actions";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleEmailChange = (event) => {
    setFormData({ ...formData, email: event.target.value });
  };
  const handleFirstNameChange = (event) => {
    setFormData({ ...formData, firstName: event.target.value });
  };
  const handleLastNameChange = (event) => {
    setFormData({ ...formData, lastName: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setFormData({ ...formData, password: event.target.value });
  };

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("his is image", formData.image);
    dispatch(signUpUser(formData));
  };

  return (
    <div>
      <h1>Signup</h1>
      <form>
        <h5>E-mail</h5>
        <input
          type="text"
          value={formData.email}
          onChange={handleEmailChange}
        />

        <h5>First Name</h5>
        <input
          type="text"
          value={formData.firstName}
          onChange={handleFirstNameChange}
        />

        <h5>Last Name</h5>
        <input
          type="text"
          value={formData.lastName}
          onChange={handleLastNameChange}
        />

        <h5>Password</h5>
        <input
          type="password"
          value={formData.password}
          onChange={handlePasswordChange}
        ></input>
      </form>

      <Button variant="contained" onClick={handleSubmit}>
        Create Account
      </Button>
    </div>
  );
}

export default SignUp;

// firstName
// LastName
// Email
// Password
