import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { toast } from "react-toastify";   // ✅ FIX HERE
import "react-toastify/dist/ReactToastify.css";
import "./Veg.css";

function Drinks() {
  const dispatch = useDispatch();
  const milkItems = useSelector((state) => state.prod.drinks);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    toast.success(`${product.Name} added to cart! 🛒`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="main-content">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/videos/drinkbg.mp4" type="video/mp4" />
      </video>

      <div className="veg-row">
        {milkItems.map((product) => (
          <div className="card" key={product.id}>
            <div className="image-container">
              <img
                src={product.imageurl}
                alt={product.Name}
                className="card-img-top"
              />
            </div>

            <div className="card-body">
              <h3 className="card-title">{product.Name}</h3>
              <p className="card-text">Fresh and healthy</p>
              <h4 className="price-tag">
                <b>₹{product.price}</b>
              </h4>

              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  borderRadius: "10px",
                  backgroundColor: "yellow",
                  width: "100%",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drinks;