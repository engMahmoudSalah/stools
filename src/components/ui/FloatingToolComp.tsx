import React from "react";

export const FloatingToolComp = ({
  Icon,
  className,
  delay,
  duration = "12s",
}: {
  Icon: any;
  className?: string;
  delay: string;
  duration?: string;
}) => (
  <div
    className={`absolute text-black dark:text-white mix-blend-overlay opacity-0 ${className}`}
    style={{ animationDelay: delay, animationDuration: duration }}
  >
    <Icon size={40} strokeWidth={1} />
  </div>
);
