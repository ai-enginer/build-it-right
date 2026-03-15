import { Link } from "react-router-dom";
import { Sparkles, Users } from "lucide-react";
import type { Tool } from "@/lib/tools-data";
import { Badge } from "@/components/ui/badge";

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group relative flex flex-col rounded-xl border bg-card p-5 shadow-tool transition-all duration-200 hover:shadow-tool-hover hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{tool.name}</h3>
        <div className="flex items-center gap-1.5">
          {tool.isNew && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">New</Badge>
          )}
          {tool.isAI && (
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> AI
            </span>
          )}
        </div>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">{tool.description}</p>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Users className="h-3 w-3" />
        <span>Used {tool.usageCount}+ times</span>
      </div>
    </Link>
  );
};

export default ToolCard;
