

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./store";
import "./SignUp.css";

function SignUp() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch("password");

  const handleSignUp = (data) => {

  const userDetails = {
    email: data.email,
    password: data.password,
  };

  // get old users
  const existingUsers =
    JSON.parse(localStorage.getItem("users")) || [];

  // check duplicate email
  const alreadyExists = existingUsers.find(
    (u) => u.email === data.email
  );

  if (alreadyExists) {
    alert("Email already exists");
    return;
  }

  // save new user
  existingUsers.push(userDetails);

  localStorage.setItem(
    "users",
    JSON.stringify(existingUsers)
  );

  alert("Signup successful ✅");

  navigate("/signin");
};
  return (
    <div className="signup-wrapper">

      <div className="signup-container">

        <h2 className="signup-title">
          Create an Account
        </h2>

        <form
          className="signup-form"
          onSubmit={handleSubmit(handleSignUp)}
        >

        {/* Email */}
        <input type="email" placeholder="Enter Email"
          {...register("email", {required: "Email is required",pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,message: "Enter a valid email address"}})}
        />

        {errors.email && (<p className="error">
          {errors.email.message}</p>)
        }

          {errors.userName && (
            <p className="error">
              {errors.userName.message}
            </p>
          )}

          {/* Password */}

          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />

          {errors.password && (
            <p className="error">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password */}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password is required",

              validate: (value) =>
                value === password || "Passwords don't match"
            })}
          />

          {errors.confirmPassword && (
            <p className="error">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="signup-btn"
          >
            Sign Up
          </button>

        </form>

        <p className="signin-text">
          Already have an account?

          <Link
            to="/signin"
            className="signin-link"
          >
            Sign in
          </Link>
        </p>

      </div>

    </div>
  );
}

export default SignUp;


/* import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { useDispatch } from "react-redux";

function SignUp() {

  const dispatch=useDispatch();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");
  
  const handleSignUp = (data) => 
    {
      const userDetails = {
      userName: data.userName,
      password: data.password,
      };
      dispatch(addUser(userDetails));
      console.log("signup Data:", data);
      alert("Signup successful");
  };



  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2 className="signup-title">Create an Account</h2>

        <form className="signup-form" onSubmit={handleSubmit(handleSignUp)}>
          <input
            type="text"
            placeholder="Enter Username"
            {...register("userName",{ required:"Username is required" })}
          />
          {errors.userName && <p className="error">{errors.userName.message}</p>}

          <input
            type="password"
            placeholder="Enter Password"
            {...register("password",{ required:"Password is required" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required:"Confirm password is required",
              validate:(value)=> value === password || "Passwords don't match"
            })}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="signin-text">
          Already have an account? <Link to="/Signin" className="signin-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
 */
