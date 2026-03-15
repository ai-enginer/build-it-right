import { Link } from "react-router-dom";
import type { Category } from "@/lib/tools-data";

const CategoryCard = ({ category }: { category: Category }) => {
  const Icon = category.icon;
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group flex items-center gap-4 rounded-xl border bg-card p-4 shadow-tool transition-all duration-200 hover:shadow-tool-hover hover:-translate-y-0.5"
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${category.bgClass}`}>
        <Icon className={`h-5 w-5 ${category.colorClass}`} />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
        <p className="text-xs text-muted-foreground">{category.toolCount} tools</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
