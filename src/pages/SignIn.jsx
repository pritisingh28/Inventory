import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/auth";
import box from "../assets/display/box.svg";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Staff",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // 🔐 LOGIN
        const res = await login(form.email, form.password);

        const { token, user } = res;

        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role.toLowerCase());

        // 🔥 Redirect
        if (user.role.toLowerCase() === "admin") {
          navigate("/admin");
        } else if (user.role.toLowerCase() === "manager") {
          navigate("/manager");
        } else {
          navigate("/staff");
        }
      } else {
        // 📝 REGISTER
        await register(form.username, form.email, form.password, form.role);

        alert("Registered Successfully");

        // 👉 Go to login
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-black p-3 rounded-xl mb-3">
              <img src={box} className="w-6 h-6 invert" />
            </div>
            <h1 className="text-2xl font-semibold">
              {isLogin ? "Login" : "Register"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <input
                  name="username"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <select
                  name="role"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                </select>
              </>
            )}

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />

            <button className="w-full bg-black text-white py-2 rounded">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="text-center mt-4">
            {isLogin ? "No account?" : "Already have account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 ml-2"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-center">
        <h2>Inventory System</h2>
      </div>
    </div>
  );
}
