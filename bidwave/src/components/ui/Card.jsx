import { cn } from "../../lib/utils";

function Card({ children, className, hover = false }) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300",
        hover &&
          "hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
