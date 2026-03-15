import { useParams, Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { getToolBySlug, getCategoryBySlug } from "@/lib/tools-data";
import { ArrowLeft, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const ToolPlaceholder = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug || "");

  if (!tool) {
    return (
      <SiteLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Tool not found</h1>
          <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">Go home</Link>
        </div>
      </SiteLayout>
    );
  }

  const category = getCategoryBySlug(tool.categorySlug);

  return (
    <SiteLayout>
      <div className="container py-8">
        {category && (
          <Link to={category.routePath} className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to {category.name}
          </Link>
        )}

        <div className="mx-auto max-w-lg py-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{tool.name}</h1>
          <p className="mt-2 text-muted-foreground">{tool.description}</p>
          <div className="mt-6 rounded-xl border bg-card p-6 shadow-card">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Bell className="h-4 w-4" />
              <span>This tool is coming soon!</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              We're actively building this tool. Check back soon or explore our other available tools.
            </p>
            <Link to="/">
              <Button variant="outline" className="mt-4">
                Browse available tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default ToolPlaceholder;
