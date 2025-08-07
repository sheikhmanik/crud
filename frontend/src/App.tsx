import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { jwtDecode } from "jwt-decode";
import api from "./api/axios";

interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}

export default function App() {

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(storedToken);

        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          setIsValid(true);
        } else {
          localStorage.removeItem("token");
          setIsValid(false);
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setIsValid(false);
      }
    }
  }, []);

  function handleRegister(username: String, password: String) {
    api.post("/auth/register", { username, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setIsValid(true);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      })
  }

  function handleLogin(username: String, password: String) {
    api.post("/auth/login", { username, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setIsValid(true);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials and try again.");
      })
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsValid(false);
    alert("You have been logged out.");
  }

  return (
    <div className="space-y-7">
      {isValid ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Auth onRegister={handleRegister} onLogin={handleLogin} />
      )}
    </div>
  )
}
