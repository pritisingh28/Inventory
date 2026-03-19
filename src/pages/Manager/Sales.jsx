import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/inventoryService";
import { createInvoice } from "../../services/invoiceService";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  // ➕ Add to cart
  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // ➖ Quantity change
  const updateQty = (id, qty) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // ❌ Remove item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // 💰 Total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🧾 Create Invoice
  const handleCheckout = async () => {
  try {
    if (!cart.length) {
      return alert("Cart is empty");
    }

    const payload = {
      customerName,
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    };

    await createInvoice(payload);

    // ✅ RESET UI
    setCart([]);
    setCustomerName("");

    // ✅ REFRESH PRODUCTS (IMPORTANT)
    await fetchProducts();

    alert("Invoice created successfully!");

  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl md:text-3xl font-semibold mb-4">Sales</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT - PRODUCTS */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {products.map((p) => (
              <div
                key={p._id}
                className="border p-3 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => addToCart(p)}
              >
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-sm text-gray-500">₹{p.price}</p>
                <p className="text-xs">Stock: {p.stock}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - CART */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Cart</h2>

          <input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded-lg"
          />

          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-2">

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm">₹{item.price}</p>
              </div>

              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQty(item._id, Number(e.target.value))
                }
                className="w-16 border px-2 py-1 rounded"
              />

              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="mt-4 border-t pt-3">
            <h3 className="font-semibold">Total: ₹{total}</h3>

            <button
              onClick={handleCheckout}
              className="w-full mt-3 bg-green-500 text-white py-2 rounded-lg"
            >
              Create Invoice
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sales;