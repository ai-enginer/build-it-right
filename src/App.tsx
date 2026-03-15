import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import WordCounter from "./pages/tools/WordCounter.tsx";
import JsonFormatter from "./pages/tools/JsonFormatter.tsx";
import ToolPlaceholder from "./pages/tools/ToolPlaceholder.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import AllTools from "./pages/AllTools.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tool/word-counter" element={<WordCounter />} />
          <Route path="/tool/json-formatter" element={<JsonFormatter />} />
          <Route path="/tool/:slug" element={<ToolPlaceholder />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/all-tools" element={<AllTools />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
