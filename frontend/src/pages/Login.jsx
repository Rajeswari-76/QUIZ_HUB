import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", data);

      // save token + user
      login(res.data);

      alert("Login successful ✅");
      navigate("/"); // go to home

    } catch (err) {
      console.error(err);
      alert("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="form-container">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p onClick={() => navigate("/register")} className="link">
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}