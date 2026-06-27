import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store"; 
import { toast } from "react-toastify";
import "./Veg.css";
import "./App.css";
function Veg() {
  const dispatch = useDispatch();
  const vegItems = useSelector((state) => state.prod.veg);

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
        <source src="/videos/vege1.mp4" type="video/mp4" />
      </video>

      {/* Product Cards in Grid */}
      <div className="veg-row">
        {vegItems.length > 0 ? (
          vegItems.map((product) => (
            <div className="card" key={product.id}>
              <div className="image-container">
                <img
                  src={product.imageurl}
                  alt={product.Name}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h1 className="card-title">{product.Name}</h1>
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
          ))
        ) : (
          <p className="empty-state">No vegetables available.</p>
        )}
      </div>

      
    </div>
  );
}

export default Veg;
