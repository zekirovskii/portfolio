import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/helpers';

export const TextReveal = ({
  text,
  revealText,
  className,
  ...otherProps
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)} {...otherProps}>
      <div
        className={cn(
          "transition-transform duration-1000 ease-out",
          isRevealed ? "translate-y-0" : "translate-y-full"
        )}
      >
        {text}
      </div>
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-1000 ease-out",
          isRevealed ? "-translate-y-full" : "translate-y-0"
        )}
      >
        {revealText}
      </div>
    </div>
  );
};
