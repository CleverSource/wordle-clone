import React, { HTMLAttributes } from "react";

export const Layout: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div {...props} className="h-screen bg-neutral-900">
      {children}
    </div>
  );
};
