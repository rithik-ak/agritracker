import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ExpenseTrackerPage from "./pages/ExpenseTrackerPage";
import ProfitLossPage from "./pages/ProfitLossPage";
import WeatherPage from "./pages/WeatherPage";
import MarketPricesPage from "./pages/MarketPricesPage";
import CommunityChatPage from "./pages/CommunityChatPage";
import ChatbotPage from "./pages/ChatbotPage";
import ProfilePage from "./pages/ProfilePage";

const isAuthenticated = () => !!sessionStorage.getItem("user");

const ProtectedRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />;

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard"      element={<DashboardPage />} />
      <Route path="/expenses"       element={<ExpenseTrackerPage />} />
      <Route path="/profit-loss"    element={<ProfitLossPage />} />
      <Route path="/weather"        element={<WeatherPage />} />
      <Route path="/market-prices"  element={<MarketPricesPage />} />
      <Route path="/community-chat" element={<CommunityChatPage />} />
      <Route path="/chatbot"        element={<ChatbotPage />} />
      <Route path="/profile"        element={<ProfilePage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
