import { Link } from "react-router-dom";
import { categories, tools } from "@/lib/tools-data";
import { Wrench } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hero-gradient">
                <Wrench className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">ToolBox</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              110+ free online tools. No login, no signup, no credit card. Just get things done.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Categories</h4>
            <div className="flex flex-col gap-1.5">
              {categories.slice(0, 5).map(cat => (
                <Link key={cat.slug} to={cat.routePath} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">More Categories</h4>
            <div className="flex flex-col gap-1.5">
              {categories.slice(5).map(cat => (
                <Link key={cat.slug} to={cat.routePath} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Popular Tools</h4>
            <div className="flex flex-col gap-1.5">
              {tools.slice(0, 5).map(t => (
                <Link key={t.slug} to={`/tools/${t.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">© 2026 ToolBox. All tools are free forever.</p>
          <p className="text-xs text-muted-foreground">Your files never leave your browser. 100% private.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
