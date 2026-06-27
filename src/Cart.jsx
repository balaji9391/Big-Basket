import { useDispatch, useSelector } from "react-redux";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import { calculateTotal } from "./discountUtils";
import { clearCart, increaseQty, decreaseQty, removeFromCart } from "./store";
import "./Cart.css";
import { useMemo } from "react";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const total = useMemo(() => calculateTotal(cartItems), [cartItems]);
  const dispatch = useDispatch();

  return (
    <div className="cart-container">
      
      {cartItems.length > 0 && (
  <button
    onClick={() => dispatch(clearCart())}
    className="btn btn-danger mb-3"
  >
    Clear Cart
  </button>
)}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <center>
            <h1 style={{ color: "red" }}>Your cart is empty 🫤</h1>

            <video width="400" autoPlay loop muted>
              <source src="/videos/NoItems.mp4" type="video/mp4" />
            </video>
          </center>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Left → Items */}
          <div className="cart-left">
            <CartItems
              cartItems={cartItems}
              onIncrease={(item) => dispatch(increaseQty(item))}
              onDecrease={(item) => dispatch(decreaseQty(item))}
              onRemove={(item) => dispatch(removeFromCart(item))}
            />
          </div>

          {/* Right → Summary */}
          <div className="cart-right">
            <CartSummary cartItems={cartItems} total={total} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
