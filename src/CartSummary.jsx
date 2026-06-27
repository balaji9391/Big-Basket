import { useState } from "react";
import { useDispatch } from "react-redux";
import emailjs from "@emailjs/browser";
import QRCode from "react-qr-code";
import { calculateButtonDiscount, getcoupondiscount } from "./discountUtils";
import { clearCart, addOrder } from "./store";
import "./CartSummary.css";
import { useNavigate } from "react-router-dom";

function CartSummary({ cartItems, total }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const btnDiscount = calculateButtonDiscount(total, discount);

  const handleCouponcode = () => {
    const result = getcoupondiscount(couponCode, total);
    setCouponResult(result);
  };

  const orderId = `ORD-${Date.now()}`;
  const shippingCost = 10;
  const taxAmount = (total * 5) / 100;

  const finalPrice =
    total -
    btnDiscount -
    (couponResult?.discountAmount || 0) +
    taxAmount +
    shippingCost;

  const templateParams = {
    order_id: orderId,
    orders: cartItems
      .map(
        (item, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${item.Name}</td>
          <td>₹${item.price}</td>
          <td>${item.quantity}</td>
          <td>₹${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
      )
      .join(""),
    shipping: shippingCost.toFixed(2),
    tax: taxAmount.toFixed(2),
    total: finalPrice.toFixed(2),
    email: customerEmail,
  };

  const handleCheckOut = () => {
    if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
      alert("⚠️ Please enter a valid email address");
      return;
    }

    // 🎉 SHOW CELEBRATION FIRST
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);

      emailjs
        .send(
          "service_2knwa9j",
          "template_l04z98h",
          templateParams,
          "Peud0YFIsdgm2laKj"
        )
        .then(() => {
          dispatch(
            addOrder({
              orderId,
              items: cartItems,
              email: customerEmail,
              finalPrice: finalPrice.toFixed(2),
              date: new Date().toLocaleString(),
            })
          );

          dispatch(clearCart());

          setCustomerEmail("");
          setCouponCode("");
          setCouponResult(null);
          setDiscount(0);

          navigate("/home");
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
          alert("❌ Email sending failed. Please try again.");
        });
    }, 3000);
  };

  return (
    <div className="final-summary colorful-summary">

      <h3>Total: ₹{total}</h3>

      {discount > 0 && (
        <h3 className="discount-info">
          {discount}% Discount Applied
        </h3>
      )}

      {couponResult ? (
        couponResult.isvalid ? (
          <h3 className="coupon-success">
            ✅ Coupon Applied: ₹{couponResult.discountAmount} off
          </h3>
        ) : (
          <h3 className="coupon-fail">❌ Invalid Coupon Code</h3>
        )
      ) : null}

      <h3>Shipping: ₹{shippingCost}</h3>
      <h3>GST: ₹{taxAmount.toFixed(2)}</h3>
      <h2>Final Price: ₹{finalPrice.toFixed(2)}</h2>

      {/* Coupon */}
      <div className="coupon-box">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button onClick={handleCouponcode} className="fancy-btn">
          Apply
        </button>
      </div>

      

      {/* Email */}
      <div className="email-box">
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="yourname@gmail.com"
        />
      </div>

      {/* QR */}
      {cartItems.length > 0 && customerEmail && (
        <div className="qr-code-box">
          <p>Scan to Pay:</p>
          <QRCode
            value={`upi://pay?pa=9391732731@axl&pn=Big-Basket&am=${finalPrice.toFixed(
              2
            )}&cu=INR&tn=${orderId}`}
            size={140}
          />
        </div>
      )}

      {/* Checkout */}
      <button onClick={handleCheckOut} className="checkout-btn">
        Confirm Order
      </button>

      {/* 🎉 Celebration Overlay */}
      {showNotification && (
        <div className="celebration-overlay">
          <div className="celebration-box">
            🎉 Order Placed Successfully 🎉
            <p>Thank you for shopping 🛒</p>
            <div className="confetti">🎊 🎊 🎊</div>
          </div>
        </div>
      )}

    </div>
  );
}

export default CartSummary;