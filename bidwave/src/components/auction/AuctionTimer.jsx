import { Clock } from "lucide-react";
import useCountdown from "../../hooks/useCountdown";

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center bg-gray-900 dark:bg-gray-800 rounded-xl px-4 py-3 min-w-[60px]">
      <span className="text-2xl font-black text-white font-mono leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function AuctionTimer({ endsAt }) {
  const { hours, minutes, seconds } = useCountdown(endsAt);
  const isUrgent = hours === 0 && minutes < 10;

  return (
    <div>
      <p
        className={`text-xs font-medium mb-3 flex items-center gap-1.5 ${isUrgent ? "text-red-500" : "text-gray-400"}`}
      >
        <Clock size={13} />
        {isUrgent ? "⚡ Ending very soon!" : "Auction ends in"}
      </p>
      <div className="flex items-center gap-2">
        <TimeBox value={hours} label="Hrs" />
        <span className="text-gray-300 dark:text-gray-600 font-black text-lg">
          :
        </span>
        <TimeBox value={minutes} label="Min" />
        <span className="text-gray-300 dark:text-gray-600 font-black text-lg">
          :
        </span>
        <TimeBox value={seconds} label="Sec" />
      </div>
    </div>
  );
}
