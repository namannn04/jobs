import { Toaster } from "@/components/landing ui/toaster";
import { Toaster as Sonner } from "@/components/landing ui/sonner";
import { TooltipProvider } from "@/components/landing ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SaasPage from "./pages/landing_index_page";
import NotFound from "./pages/NotFound";
import Index from "./pages/main_index_page";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>  
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/saas" element={<SaasPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
