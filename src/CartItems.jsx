import "./CartItems.css";

function CartItems({ cartItems, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-grid">
      {cartItems.map((item) => (
        <div className="card cart-card" key={item.id}>
          <img src={item.imageurl} alt={item.Name} className="card-img-top" />
          <div className="card-body">
            <h3 className="card-title">{item.Name}</h3>
            <p className="card-text">
              ₹{item.price} × {item.quantity} ={" "}
              <b>₹{item.price * item.quantity}</b>
            </p>

            <div className="d-flex justify-content-between">
              <button
                onClick={() => onIncrease(item)}
                className="btn btn-sm btn-success"
              >
                +
              </button>
              <button
                onClick={() => onDecrease(item)}
                className="btn btn-sm btn-warning"
              >
                -
              </button>
              <button
                onClick={() => onRemove(item)}
                className="btn btn-sm btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
