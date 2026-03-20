import { useEffect, useState } from "react";
import {
  getStaffProducts,
  createStaffSale,
} from "../../services/staffApi";

const StaffSales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getStaffProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // ✅ Add to cart (no duplicate, increase quantity)
  const addToCart = (product) => {
    const existing = cart.find((c) => c.productId === product._id);

    if (existing) {
      setCart(
        cart.map((c) =>
          c.productId === product._id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product._id,
          quantity: 1,
          name: product.name,
        },
      ]);
    }
  };

  // ✅ Remove item
  const removeFromCart = (id) => {
    setCart(cart.filter((c) => c.productId !== id));
  };

  // ✅ Submit Sale
  const handleSubmit = async () => {
    if (!customerName) {
      return alert("Enter customer name");
    }

    if (cart.length === 0) {
      return alert("Cart is empty");
    }

    try {
      await createStaffSale({
        customerName,
        items: cart.map((c) => ({
          productId: c.productId,
          quantity: c.quantity,
        })),
      });

      alert("✅ Sale Created Successfully");

      setCart([]);
      setCustomerName("");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create sale");
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Create Sale</h1>

      {/* Customer Input */}
      <input
        type="text"
        placeholder="Customer Name"
        className="border p-2 mb-4 w-full md:w-1/2 rounded"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-3 bg-white rounded shadow">
            <h3 className="font-semibold">{p.name}</h3>
            <p>₹{p.price}</p>

            <button
              className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
              onClick={() => addToCart(p)}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <h2 className="mt-6 font-bold text-lg">Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items added</p>
      ) : (
        cart.map((c) => (
          <div
            key={c.productId}
            className="flex justify-between items-center bg-white p-3 mt-2 rounded shadow"
          >
            <span>
              {c.name} × {c.quantity}
            </span>

            <button
              className="text-red-500"
              onClick={() => removeFromCart(c.productId)}
            >
              Remove
            </button>
          </div>
        ))
      )}

      {/* Submit */}
      <button
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
        onClick={handleSubmit}
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default StaffSales;