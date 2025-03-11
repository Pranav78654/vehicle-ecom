import React, { useState } from "react";

const Auth = () => {
  const [form, setForm] = useState("login"); // 'login', 'register', 'forgotPassword'
  const [identifier, setIdentifier] = useState(""); // For login & forgot password
  const [password, setPassword] = useState(""); // For login & register
  const [username, setUsername] = useState(""); // For register
  const [phone, setPhone] = useState(""); // For register

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", identifier, password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering with:", username, phone, password);
  };

  const handleSendOTP = async () => {
    if (!identifier) {
      alert("Please enter your username or phone number.");
      return;
    }

    try {
      const response = await fetch("/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      const result = await response.json();

      if (result.success) {
        alert("OTP sent successfully. Please check your phone/email.");
      } else {
        alert(result.message || "Failed to send OTP. Try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* <div className="flex justify-around mb-6">
          <button
            onClick={() => setForm("login")}
            className={`px-4 py-2 rounded-md ${form === "login" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Login
          </button>
          <button
            onClick={() => setForm("register")}
            className={`px-4 py-2 rounded-md ${form === "register" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Register
          </button>
          <button
            onClick={() => setForm("forgotPassword")}
            className={`px-4 py-2 rounded-md ${form === "forgotPassword" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Forgot Password
          </button>
        </div> */}

        {/* Login Form */}
        {form === "login" && (
          <form onSubmit={handleLogin}>
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username or Phone</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
              Login
            </button>
            <p className="text-center mt-4">
              <button onClick={() => setForm("forgotPassword")} className="text-red-500">
                Forgot Password?
              </button>
            </p>
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <button onClick={() => setForm("register")} className="text-blue-500">
                Register here
              </button>
            </p>
          </form>
        )}

        {/* Register Form */}
        {form === "register" && (
          <form onSubmit={handleRegister}>
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Register
            </button>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <button onClick={() => setForm("login")} className="text-blue-500">
                Login here
              </button>
            </p>
          </form>
        )}

        {/* Forgot Password Form */}
        {form === "forgotPassword" && (
          <div>
            <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Enter Username or Phone</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button
              type="button"
              onClick={handleSendOTP}
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
            >
              Send OTP
            </button>
            <p className="text-center mt-4">
              <button onClick={() => setForm("login")} className="text-blue-500">
                Back to Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
