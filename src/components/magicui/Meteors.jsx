import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/helpers';

export const Meteors = ({
  number = 20,
  className,
  ...otherProps
}) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const newMeteors = Array.from({ length: number }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 2,
      animationDuration: Math.random() * 3 + 2,
    }));
    setMeteors(newMeteors);
  }, [number]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} {...otherProps}>
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute top-0 h-0.5 w-0.5 bg-white rounded-full shadow-[0_0_0_1px_#ffffff10] shadow-white animate-meteor"
          style={{
            left: `${meteor.left}%`,
            animationDelay: `${meteor.animationDelay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};
