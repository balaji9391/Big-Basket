// -------------------------------
// Imports
// -------------------------------
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Veg.css"; // ✅ reuse same styles

// -------------------------------
// Component: NonVeg
// -------------------------------
function NonVeg() {
  const nonveg = useSelector((state) => state.prod.nonveg);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(
      `${product.Name} added to cart! 🛒`,
      {
        position: "top-right",
        autoClose: 2000,
      }
    );
  };

  

  return (
    <div className="main-content">
      <video autoPlay loop muted playsInline className="bg-video">
  <source src="/videos/nv.mp4" type="video/mp4" />
</video>
      {/* Product list container */}
      <div className="veg-row">
        {nonveg.map((product) => (
          <div className="card" key={product.id}>
            {/* Product Image */}
            <div className="image-container">
              <img
                src={product.imageurl}
                alt={product.Name}
                className="card-img-top"
              />
            </div>

            {/* Product Details */}
            <div className="card-body">
              <h3 className="card-title">{product.Name}</h3>
              <p className="card-text">Fresh and healthy</p>
              <h4 className="price-tag">
                <b>₹{product.price}</b>
              </h4>

              <button
                onClick={() => handleAddToCart(product)}
                style={{borderRadius:"10px" , backgroundColor:"yellow", width:"100%"}}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Toast notifications container */}
      <ToastContainer />
    </div>
  );
}

// -------------------------------
// Export
// -------------------------------
export default NonVeg;
