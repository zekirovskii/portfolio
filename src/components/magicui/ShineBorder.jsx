import React from 'react';
import { cn } from '../../utils/helpers';

export const ShineBorder = ({
  borderRadius = 8,
  borderWidth = 1,
  duration = 2000,
  color = "#ffffff",
  className,
  children,
  ...otherProps
}) => {
  return (
    <div
      style={{
        '--border-radius': `${borderRadius}px`,
        '--border-width': `${borderWidth}px`,
        '--duration': `${duration}ms`,
        '--color': color,
      }}
      className={cn(
        "relative grid min-h-[60px] w-full place-items-center rounded-[--border-radius] bg-background p-3",
        "bg-gradient-to-r from-transparent via-[--color] to-transparent",
        "transition-all duration-300 ease-in-out",
        className
      )}
      {...otherProps}
    >
      <div className="z-10 flex h-full w-full flex-col items-center justify-center rounded-[--border-radius] bg-background text-sm text-foreground">
        {children}
      </div>
      <div
        className="absolute inset-0 rounded-[--border-radius] bg-gradient-to-r from-transparent via-[--color] to-transparent opacity-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, var(--color), transparent)`,
          animation: `shimmer var(--duration) infinite`,
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

