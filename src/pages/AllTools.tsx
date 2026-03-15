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
        <h1 className="mb-8 text-2xl font-bold text-foreground">All Tools</h1>

        {categories.map(cat => {
          const catTools = tools.filter(t => t.categorySlug === cat.slug);
          if (catTools.length === 0) return null;
          const Icon = cat.icon;
          return (
            <div key={cat.slug} className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <Icon className={`h-4 w-4 ${cat.colorClass}`} />
                <h2 className="text-lg font-semibold text-foreground">{cat.name}</h2>
              </div>
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
