import { cn } from "../../lib/utils";

const variants = {
  default: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  orange:
    "bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400",
  green: "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400",
  red: "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400",
  blue: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
