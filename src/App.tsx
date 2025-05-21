import { Toaster } from "@/components/landing ui/toaster";
import { Toaster as Sonner } from "@/components/landing ui/sonner";
import { TooltipProvider } from "@/components/landing ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SaasPage from "./pages/landing_index_page";
import NotFound from "./pages/NotFound";
import Index from "./pages/main_index_page";
import Signup from "./components/landing/SignUp";
import Signin from "./components/landing/SignIn";
import Profile from "./components/landing/Profile";
import { AuthProvider } from "./lib/auth-context";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/saas" element={<SaasPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
