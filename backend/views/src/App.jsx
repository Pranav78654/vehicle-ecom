import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
import ForgotPassword from "./pages/ForgotPassword";
import UpperNavbar from "./components/UpperNavbar";
import LowerNavbar from "./components/LowerNavbar";
import CardDetails from "./pages/CardDetails";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import AddCar from "./pages/Addcar";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without navbar and footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Main layout for routes with navbar and footer */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const noNavbarFooterRoutes = ["/login", "/signup", "/forgot-password"];

  const showLayout = !noNavbarFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {showLayout && <UpperNavbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/car/:id" element={<CardDetails />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>

      {showLayout && <Footer />}
    </div>
  );
}

export default App;
