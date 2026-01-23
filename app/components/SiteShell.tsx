import type { ReactNode } from "react";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main className="page">
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}
