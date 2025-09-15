import React from 'react';
import { cn } from '../../utils/helpers';

export const MagicCard = ({
  children,
  className,
  isHovered,
  ...otherProps
}) => {
  return (
    <div
      className={cn(
        "relative group/card transition-all duration-300 bg-gray-900/50 dark:bg-gray-900/50 light:bg-white/50 border border-gray-700/50 dark:border-gray-700/50 light:border-gray-300/50 hover:bg-gray-800/70 dark:hover:bg-gray-800/70 light:hover:bg-gray-100/70 hover:border-gray-600/70 dark:hover:border-gray-600/70 light:hover:border-gray-400/70 hover:shadow-xl hover:shadow-gray-500/10 dark:hover:shadow-gray-500/10 light:hover:shadow-gray-400/10",
        className
      )}
      {...otherProps}
    >
      <div className="relative z-10">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-lg" />
    </div>
  );
};
