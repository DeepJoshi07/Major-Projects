import React from "react";

async function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-[var(--animate-appear)]">
        {children}
    </div>
  );
}

export default Template;
