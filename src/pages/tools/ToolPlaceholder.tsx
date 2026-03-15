import { useParams, Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { getToolBySlug } from "@/lib/tools-data";
import { ArrowLeft, Construction } from "lucide-react";

const ToolPlaceholder = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug || "");

  if (!tool) {
    return (
      <SiteLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Tool not found</h1>
          <Link to="/" className="mt-4 text-sm text-primary hover:underline">Go home</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to all tools
        </Link>
        <div className="mx-auto max-w-lg rounded-xl border bg-card p-12 text-center shadow-card">
          <Construction className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">{tool.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
          <p className="mt-6 text-xs text-muted-foreground">This tool is coming soon. Stay tuned!</p>
        </div>
      </div>
    </SiteLayout>
  );
};

export default ToolPlaceholder;
