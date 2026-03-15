import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import ToolCard from "@/components/ToolCard";
import { categories, tools } from "@/lib/tools-data";
import { ArrowLeft } from "lucide-react";

const AllTools = () => {
  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>
        <h1 className="mb-2 text-2xl font-bold text-foreground">All Tools</h1>
        <p className="mb-8 text-sm text-muted-foreground">{tools.length} free tools across {categories.length} categories</p>

        {categories.map(cat => {
          const catTools = tools.filter(t => t.categorySlug === cat.slug);
          if (catTools.length === 0) return null;
          const Icon = cat.icon;
          return (
            <div key={cat.slug} className="mb-10">
              <Link to={cat.routePath} className="mb-3 inline-flex items-center gap-2 group">
                <Icon className={`h-4 w-4 ${cat.colorClass}`} />
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h2>
                <span className="text-xs text-muted-foreground">({catTools.length})</span>
              </Link>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {catTools.map(t => <ToolCard key={t.slug} tool={t} />)}
              </div>
            </div>
          );
        })}
      </div>
    </SiteLayout>
  );
};

export default AllTools;
