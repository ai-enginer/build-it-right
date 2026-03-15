import { useLocation, Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import ToolCard from "@/components/ToolCard";
import { getCategoryByRoutePath, getToolsByCategory } from "@/lib/tools-data";
import { ArrowLeft } from "lucide-react";

const CategoryPage = () => {
  const { pathname } = useLocation();
  const category = getCategoryByRoutePath(pathname);
  const categoryTools = category ? getToolsByCategory(category.slug) : [];

  if (!category) {
    return (
      <SiteLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Category not found</h1>
          <Link to="/" className="mt-4 text-sm text-primary hover:underline">Go home</Link>
        </div>
      </SiteLayout>
    );
  }

  const Icon = category.icon;

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.bgClass}`}>
            <Icon className={`h-6 w-6 ${category.colorClass}`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
            <p className="text-sm text-muted-foreground">{categoryTools.length} free tools • No login required</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </div>
    </SiteLayout>
  );
};

export default CategoryPage;
