"use client";

import { useEffect, useState } from "react";

type CountdownBarProps = {
  targetDate: string;
};

function getTimeLeft(targetDate: string) {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    expired: false,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function CountdownBar({ targetDate }: CountdownBarProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="sticky top-36 z-40 w-full bg-[#D4AF37] text-white shadow-md">
      <div className="mx-auto flex flex-wrap items-center justify-center gap-3 px-4 py-2 text-center">
        <span className="font-semibold tracking-wide">Giving Day is here! DONATE to support BESS.   </span>

        {timeLeft.expired ? (
          <span className="text-sm">Thank you for supporting BESS! #NUGIVINGDAY.</span>
        ) : (
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>Ends in</span>
            <div className="flex gap-2">
              <TimeBox label="D" value={timeLeft.days} />
              <TimeBox label="H" value={timeLeft.hours} />
              <TimeBox label="M" value={timeLeft.minutes} />
              <TimeBox label="S" value={timeLeft.seconds} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-w-[48px] flex-col items-center rounded-md bg-white/15 px-2 py-1">
      <span className="text-sm font-bold">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] tracking-widest">{label}</span>
    </div>
  );
}