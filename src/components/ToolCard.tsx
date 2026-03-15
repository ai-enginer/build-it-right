import { Link } from "react-router-dom";
import { Sparkles, Users } from "lucide-react";
import type { Tool } from "@/lib/tools-data";

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <Link
      to={`/tool/${tool.slug}`}
      className="group relative flex flex-col rounded-xl border bg-card p-5 shadow-tool transition-all duration-200 hover:shadow-tool-hover hover:-translate-y-0.5"
    >
      {tool.isAI && (
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          <Sparkles className="h-3 w-3" /> AI
        </span>
      )}
      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{tool.name}</h3>
      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">{tool.description}</p>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Users className="h-3 w-3" />
        <span>Used {tool.usageCount}+ times</span>
      </div>
    </Link>
  );
};

export default ToolCard;
