import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Drinks from "./Drinks";
import Chocolate from "./Chocolate";
import SignUp from "./SignUp";
import Signin from "./Signin";
import Cart from "./Cart";
import Orders from "./Orders";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Error from "./Error";

import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";
import "./index.css";

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/signin" replace />;
}

function App() {
  const navigate = useNavigate();

  const reduxUser = useSelector((s) => s.userlogin.loggedInUser);

  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const loggedInUser = reduxUser || storedUser;

  const cartCount = useSelector((s) =>
    s.cart.reduce((sum, i) => sum + i.quantity, 0)
  );

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/signin", { replace: true });
    window.location.reload(); // ensures clean reset (prevents blink issues)
  };

  return (
    <>
      <ToastContainer />

      {/* NAVBAR */}
      {loggedInUser && (
        <div className="navbar">
          <div className="logo">🛒 Big Basket</div>

          <div className="links">
            <Link to="/home">🏠 Home</Link>
            <Link to="/veg">🥦 Veg</Link>
            <Link to="/nonveg">🍗 Non-Veg</Link>
            <Link to="/drinks">🥛 Drinks</Link>
            <Link to="/chocolate">🍫 Chocolates</Link>
            <Link to="/cart">🛍️ Cart ({cartCount})</Link>
            <Link to="/order">🛒 Orders</Link>
            <Link to="/aboutus">ℹ️ About</Link>
            <Link to="/contactus">📞 Contact</Link>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      )}

      {/* ROUTES */}
      <main className={loggedInUser ? "main-content" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              loggedInUser ? <Navigate to="/home" replace /> : <SignUp />
            }
          />

          <Route
            path="/signup"
            element={
              loggedInUser ? <Navigate to="/home" replace /> : <SignUp />
            }
          />

          <Route
            path="/signin"
            element={
              loggedInUser ? <Navigate to="/home" replace /> : <Signin />
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute user={loggedInUser}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/veg" element={<ProtectedRoute user={loggedInUser}><Veg /></ProtectedRoute>} />
          <Route path="/nonveg" element={<ProtectedRoute user={loggedInUser}><NonVeg /></ProtectedRoute>} />
          <Route path="/drinks" element={<ProtectedRoute user={loggedInUser}><Drinks /></ProtectedRoute>} />
          <Route path="/chocolate" element={<ProtectedRoute user={loggedInUser}><Chocolate /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute user={loggedInUser}><Cart /></ProtectedRoute>} />
          <Route path="/order" element={<ProtectedRoute user={loggedInUser}><Orders /></ProtectedRoute>} />
          <Route path="/aboutus" element={<ProtectedRoute user={loggedInUser}><AboutUs /></ProtectedRoute>} />
          <Route path="/contactus" element={<ProtectedRoute user={loggedInUser}><ContactUs /></ProtectedRoute>} />

          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </>
  );
}

export default App;