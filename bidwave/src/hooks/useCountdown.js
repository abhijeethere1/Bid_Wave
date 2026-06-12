import { useState, useEffect } from "react";

function useCountdown(endsAt) {
  const calculate = () => {
    const diff = new Date(endsAt) - new Date();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, ended: true };

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds, ended: false };
  };

  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(timer);
  }, [endsAt]);

  return time;
}

export default useCountdown;
