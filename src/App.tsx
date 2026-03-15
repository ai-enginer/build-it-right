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

// AI Tools
import AISummarizer from "./pages/tools/AISummarizer.tsx";
import AIGrammarChecker from "./pages/tools/AIGrammarChecker.tsx";
import AIParaphraser from "./pages/tools/AIParaphraser.tsx";
import AITranslator from "./pages/tools/AITranslator.tsx";
import AIEssayWriter from "./pages/tools/AIEssayWriter.tsx";
import AIEmailWriter from "./pages/tools/AIEmailWriter.tsx";
import AICodeGenerator from "./pages/tools/AICodeGenerator.tsx";
import AIImageGenerator from "./pages/tools/AIImageGenerator.tsx";
import AIChatbot from "./pages/tools/AIChatbot.tsx";
import AIPlagiarismChecker from "./pages/tools/AIPlagiarismChecker.tsx";
import AIHashtagGenerator from "./pages/tools/AIHashtagGenerator.tsx";
import AIBioGenerator from "./pages/tools/AIBioGenerator.tsx";
import AICaptionGenerator from "./pages/tools/AICaptionGenerator.tsx";
import AITextToSpeech from "./pages/tools/AITextToSpeech.tsx";

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
          {/* AI Tools */}
          <Route path="/tools/ai-summarizer" element={<AISummarizer />} />
          <Route path="/tools/ai-grammar-checker" element={<AIGrammarChecker />} />
          <Route path="/tools/ai-paraphraser" element={<AIParaphraser />} />
          <Route path="/tools/ai-translator" element={<AITranslator />} />
          <Route path="/tools/ai-essay-writer" element={<AIEssayWriter />} />
          <Route path="/tools/ai-email-writer" element={<AIEmailWriter />} />
          <Route path="/tools/ai-code-generator" element={<AICodeGenerator />} />
          <Route path="/tools/ai-image-generator" element={<AIImageGenerator />} />
          <Route path="/tools/ai-chatbot" element={<AIChatbot />} />
          <Route path="/tools/ai-plagiarism-checker" element={<AIPlagiarismChecker />} />
          <Route path="/tools/ai-hashtag-generator" element={<AIHashtagGenerator />} />
          <Route path="/tools/ai-bio-generator" element={<AIBioGenerator />} />
          <Route path="/tools/ai-caption-generator" element={<AICaptionGenerator />} />
          <Route path="/tools/ai-text-to-speech" element={<AITextToSpeech />} />
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
