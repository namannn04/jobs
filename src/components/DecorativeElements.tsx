
import React from "react";

interface DecorativeElementProps {
  className?: string;
}

export const DecorativeCircle: React.FC<DecorativeElementProps> = ({
  className
}) => {
  return <div className={className}></div>;
};

export const DecorativeSquare: React.FC<DecorativeElementProps> = ({
  className
}) => {
  return <div className={className}></div>;
};
