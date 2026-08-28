"use client";

import { sendGAEvent } from "@next/third-parties/google";

type Props = {
  href: string;
  eventName: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function TrackedLink({
  href,
  eventName,
  target,
  rel,
  className,
  children,
  onClick,
}: Props) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    sendGAEvent("event", eventName);
    onClick?.(event);
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}