import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ChatWidget from "./components/chatbot/ChatWidget";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auctions from "./pages/Auctions";
import AuctionDetail from "./pages/AuctionDetail";
import SellItem from "./pages/SellItem";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import HowItWorks from "./pages/HowItWorks";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#FAF9F6] dark:bg-[#121212] min-h-screen transition-colors duration-300 font-sans">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1E1E1E",
              color: "#E0E0E0",
              fontSize: "13px",
              borderRadius: "8px",
              border: "1px solid #D4AF3730",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
        <Navbar />
        <ChatWidget />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/auctions"
            element={
              <ProtectedRoute>
                <Auctions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auctions/:id"
            element={
              <ProtectedRoute>
                <AuctionDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <SellItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/buyer"
            element={
              <ProtectedRoute>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/seller"
            element={
              <ProtectedRoute>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:paymentId"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
