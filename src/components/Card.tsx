import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div>
      <div className=" p-4 rounded-xl bg-red-900 ">{children}</div>
    </div>
  );
}
