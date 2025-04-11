import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // ✅ import Signup page
import UpperNavbar from "./components/UpperNavbar";
import LowerNavbar from "./components/LowerNavbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* ✅ Sign up page */}
      </Routes>
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

  const noNavbarFooterRoutes = ["/login", "/signup"]; // ✅ added /signup

  return (
    <>
      {!noNavbarFooterRoutes.includes(location.pathname) && <UpperNavbar />}
      {!noNavbarFooterRoutes.includes(location.pathname) && <LowerNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {!noNavbarFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
