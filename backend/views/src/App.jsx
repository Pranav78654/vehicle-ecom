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
import SearchPage from "./pages/SearchPage";
import Payment from "./pages/Payment";
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

  const showLayout = !noNavbarFooterRoutes.includes(location.pathname);

  return (
    <>
      {/* Show Navbar only if the current route is NOT in noNavbarFooterRoutes */}
      {!noNavbarFooterRoutes.includes(location.pathname) && <UpperNavbar />}
      {!noNavbarFooterRoutes.includes(location.pathname) && <LowerNavbar />}
      {/* Nested Routes for pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} /> 
      </Routes>

      {showLayout && <Footer />}
    </div>
  );
}
export default App;
