import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store"; 
import { ToastContainer, toast } from "react-toastify";  // ✅ import toast
import "react-toastify/dist/ReactToastify.css"; // ✅ import styles
import "./Veg.css"; // reuse same styles

function Chocolate() {
  const dispatch = useDispatch();
  const chocolates = useSelector((state) => state.prod.chocolates);

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
  <source src="/videos/chocobg.mp4" type="video/mp4" />
</video>

      <div className="veg-row">
        {chocolates.length > 0 ? (
          chocolates.map((product) => (
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
                <p className="card-text">Delicious and sweet 🤎</p>
                <h4 className="price-tag">
                  <b>₹{product.price}</b>
                </h4>
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "yellow",
                    width: "100%",
                    padding: "8px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-state">🍫 No chocolates available 😢</p>
        )}
      </div>

      {/* ✅ Toast notifications container */}
      <ToastContainer />
    </div>
  );
}

export default Chocolate;
