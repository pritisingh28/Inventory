import React, { useState } from "react";
import box from "../assets/display/box.svg";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-black p-3 rounded-xl mb-4 flex items-center justify-center">
              <img src={box} alt="logo" className="w-6 h-6 invert" />
            </div>

            <h1 className="text-2xl font-semibold text-gray-900">
              {isLogin ? "Inventory Pro" : "Create Account"}
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              {isLogin
                ? "Sign in to manage your inventory"
                : "Register to start managing inventory"}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
            )}

            <div>
              <label className="text-sm text-gray-600">Email address</label>
              <input
                type="email"
                placeholder="admin@inventory.com"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="text-blue-600">
                  Forgot password?
                </a>
              </div>
            )}

            <button className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition">
              {isLogin ? "Sign in" : "Register"}
            </button>
          </form>

          {/* Switch Link */}
          <p className="text-sm text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-medium"
            >
              {isLogin ? "Register" : "Sign in"}
            </button>
          </p>

          {/* Test Credentials */}
          {isLogin && (
            <div className="mt-6 bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              <p className="font-medium mb-2">Test Credentials:</p>
              <p>Admin: admin@inventory.com / admin123</p>
              <p>Staff: staff@inventory.com / admin123</p>
              <p>Sales: sales@inventory.com / admin123</p>
              <p>Manager: manager@inventory.com / admin123</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1741655262435-4890ab9918fa?auto=format&fit=crop&w=1600&q=80"
          alt="Warehouse"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-6">
          <div>
            <h2 className="text-white text-3xl font-semibold mb-3">
              Modern Inventory Management
            </h2>
            <p className="text-gray-200">
              Streamline your warehouse operations with real-time tracking and analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
