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
          {/* Category pages */}
          <Route path="/pdf-tools" element={<CategoryPage />} />
          <Route path="/image-tools" element={<CategoryPage />} />
          <Route path="/ai-tools" element={<CategoryPage />} />
          <Route path="/text-tools" element={<CategoryPage />} />
          <Route path="/video-audio-tools" element={<CategoryPage />} />
          <Route path="/developer-tools" element={<CategoryPage />} />
          <Route path="/converter-tools" element={<CategoryPage />} />
          <Route path="/calculator-tools" element={<CategoryPage />} />
          <Route path="/seo-web-tools" element={<CategoryPage />} />
          {/* Built tools */}
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/json-formatter" element={<JsonFormatter />} />
          {/* Catch-all for unbuilt tools */}
          <Route path="/tools/:slug" element={<ToolPlaceholder />} />
          <Route path="/all-tools" element={<AllTools />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
