import { useState } from "react";
import { Search, ArrowRight, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import CategoryCard from "@/components/CategoryCard";
import ToolCard from "@/components/ToolCard";
import { categories, popularTools, tools } from "@/lib/tools-data";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchResults = searchQuery.length > 1
    ? tools.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-card">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.06),transparent_70%)]" />
        <div className="container relative py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              <Shield className="h-3 w-3" />
              76+ Free Tools • No Login Required • 100% Private
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Every tool you need,{" "}
              <span className="text-gradient">all in one place</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Free online tools for PDF, images, text, code, and more. No signup, no uploads to servers — everything runs in your browser.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-8 max-w-lg">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tools... e.g. 'PDF to Word', 'JSON formatter'"
                className="w-full rounded-xl border bg-background py-3.5 pl-11 pr-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-xl border bg-card p-1.5 shadow-card-hover animate-scale-in">
                  {searchResults.map(t => (
                    <Link
                      key={t.slug}
                      to={`/tool/${t.slug}`}
                      onClick={() => setSearchQuery("")}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-secondary transition-colors"
                    >
                      <span className="font-medium text-foreground">{t.name}</span>
                      <span className="text-xs text-muted-foreground">{t.category}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Browse by Category</h2>
          <Link to="/all-tools" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(cat => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Popular Tools */}
      <section className="container pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Popular Tools</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popularTools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* AI Spotlight */}
      <section className="border-t bg-card">
        <div className="container py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground">✨ AI-Powered Tools</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              14 tools powered by AI. Summarize text, check grammar, generate content — all for free.
            </p>
            <Button className="mt-6" onClick={() => navigate("/category/ai")}>
              Explore AI Tools <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
