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
        <AuthProvider>Three jobs as you can. Evil after women's cricket. Three years to repair CU. MSNBC. Pakistani gear is wrong. Visibility is. Sea bird suspicion is. It was a bugging India under the user ABS. MBA request following song. It requires step to get. Shaktiwarry's family. India versus New Zeal. Workplace is my workplace, workspace is my name. INRED. They will open up new buildings and you can help me. Go to the headers to the blue URL. Jobs in South Africa. Brother I have to make a website from where I'll be showing the user the job search facility and I'll be using an API to fetch the data of job. So just give me an API from where I can in my back end I will call for the job searches. ATI for jobs. Make sure to send these headers with your Ricky. 
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
