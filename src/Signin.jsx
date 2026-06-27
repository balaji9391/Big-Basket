import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Auth.css";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = (e) => {
  e.preventDefault();

  // get users
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  // check email + password
  const validUser = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (!validUser) {
    alert("Invalid email or password");
    return;
  }

  // save logged in user
  localStorage.setItem(
    "loggedInUser",
    JSON.stringify(validUser)
  );

  alert("Login successful ✅");

  navigate("/home");
};

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p>Sign in to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>

        <p className="auth-footer">
          New user? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Signin;