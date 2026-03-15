import { Link } from "react-router-dom";
import { Search, Wrench, Menu, X } from "lucide-react";
import { useState } from "react";
import { tools } from "@/lib/tools-data";

const SiteHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = query.length > 1
    ? tools.filter(t => t.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">ToolBox</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/category/pdf" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">PDF</Link>
          <Link to="/category/image" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Image</Link>
          <Link to="/category/ai" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">AI Tools</Link>
          <Link to="/category/developer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Developer</Link>
          <Link to="/all-tools" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">All Tools</Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-12 w-80 rounded-xl border bg-card p-2 shadow-card-hover animate-scale-in">
                <input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search 76+ tools..."
                  className="w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                {filtered.length > 0 && (
                  <div className="mt-1 space-y-0.5">
                    {filtered.map(t => (
                      <Link
                        key={t.slug}
                        to={`/tool/${t.slug}`}
                        onClick={() => { setSearchOpen(false); setQuery(""); }}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                      >
                        <span className="font-medium">{t.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{t.category}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t bg-card p-4 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-2">
            <Link to="/category/pdf" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">PDF Tools</Link>
            <Link to="/category/image" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">Image Tools</Link>
            <Link to="/category/ai" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">AI Tools</Link>
            <Link to="/category/developer" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">Developer</Link>
            <Link to="/all-tools" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">All Tools</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
