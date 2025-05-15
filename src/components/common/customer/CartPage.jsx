
import { useCart } from "../../../context/CartContext";
//import "../customer/";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const placeOrder = () => {
    alert("Order Placed!");
    // TODO: Call backend order API
  };

  return (
    <div className="cart">
      <h2>My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={`http://localhost:7130/${item.imageUrl}`}
                      alt={item.name}
                      className="product-image"
                    />{" "}
                    {item.name}
                  </td>
                  <td>{item.price} EGP</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)} EGP</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total">
            <h3>Total Price: {totalPrice.toFixed(2)} EGP</h3>
            <button onClick={placeOrder} className="btn btn-primary">Place Order</button>
            <button onClick={clearCart} className="btn btn-secondary">Clear Cart</button>
            <button onClick={() => alert("Stripe logic goes here")} className="btn btn-primary">
              Pay with Stripe
            </button>
          </div>
        </>
      )}
    </div>
  );
}
