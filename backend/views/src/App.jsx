import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // ✅ Signup page
import UpperNavbar from "./components/UpperNavbar";
import LowerNavbar from "./components/LowerNavbar";
import CardDetails from "./pages/CardDetails";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import AddCar from "./pages/Addcar"; // ✅ AddCar page

function App() {
  return (
    <Router>
      <Routes>
        {/* Main layout for routes with navbar and footer */}
        <Route path="/*" element={<MainLayout />} />
        
        {/* Routes without navbar and footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

  const noNavbarFooterRoutes = ["/login", "/signup"];

  return (
    <>
      {/* Conditionally render navbar and footer */}
      {!noNavbarFooterRoutes.includes(location.pathname) && <UpperNavbar />}
      {/* {!noNavbarFooterRoutes.includes(location.pathname) && <LowerNavbar />} */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addcar" element={<AddCar />} /> {/* ✅ AddCar route */}
        <Route path="/car/:id" element={<CardDetails />} />
      </Routes>

      {!noNavbarFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
