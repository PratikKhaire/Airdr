import clsx from "clsx";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

export default function Card({
  children,
  title,
  className,
  childrenClassName,
}: Props) {
  return (
    <div
      className={clsx(
        "p-4 rounded-2xl flex flex-col gap-4 2xl:h-full transition-all duration-300",
        "bg-linear-to-br from-card to-card/60 shadow-md border dark:border-white/10",
        "dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5",
        "dark:backdrop-blur-xl dark:shadow-[0_0_40px_rgba(255,140,0,0.08)]",
        "dark:hover:shadow-[0_0_60px_rgba(255,140,0,0.12)]",
        className
      )}
    >
      <h2 className="text-2xl font-semibold dark:text-white">{title}</h2>
      <div
        className={clsx(
          childrenClassName,
          "animate-[fade-in_1s_ease-out_forwards] 2xl:flex-1"
        )}
      >
        {children}
      </div>
    </div>
  );
}
