import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

function App() {
  function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
