import { useSelector } from "react-redux";
import "./Order.css";

function Orders() {
  // ✅ fallback to empty array if undefined
  const orders = useSelector((state) => state.orders) || [];

  if (orders.length === 0) {
    return <h2 className="no-orders">No orders found</h2>;
  }

  // Show from recent → past
  const sortedOrders = [...orders].reverse();

  return (
    <div className="order-history">
      {sortedOrders.map((order) => (
        
        <div key={order.orderId || order.id} className="order-card">

          {/* Order Header */}
          <div className="order-header">
            <h4>Order ID: {order.orderId || "N/A"}</h4>
            <span className="order-date">{order.date || "N/A"}</span>
          </div>

          {/* Items */}
          <div className="items-grid">
            {order.items?.map((item) => (
              <div key={item.id} className="order-item">
                <img
                  src={item.imageurl || "/images/placeholder.png"}
                  alt={item.Name}
                  className="item-image"
                />
                <div className="item-details">
                  <p className="item-name">{item.Name}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                  <p className="item-price">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="order-footer">
            <p><b>Email:</b> {order.email}</p>
            <h5>Total Paid: ₹{order.finalPrice}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
