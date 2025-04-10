import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import UpperNavbar from "./components/UpperNavbar";
import LowerNavbar from "./components/LowerNavbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import AddCar from "./pages/Addcar";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
        <Route path="/signin" element={<Auth />} /> {/* Signin page without Navbar/Footer */}
        <Route path="/addcar" element={<AddCar />} />

      </Routes>
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

  // Define routes where Navbar and Footer should NOT be displayed
  const noNavbarFooterRoutes = ["/signin"];

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

      {/* Show Footer only if the current route is NOT in noNavbarFooterRoutes */}
      {!noNavbarFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
