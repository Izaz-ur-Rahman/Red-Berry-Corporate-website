import type { ReactNode } from "react";
import { MegaNav } from "./MegaNav";
import { SiteFooter } from "./SiteFooter";
import { AIAskWidget } from "./AIAskWidget";
import { ScrollToTop } from "./ScrollToTop";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-foreground">
      <MegaNav />
      <main className="pt-24">{children}</main>
      <SiteFooter />
      <AIAskWidget />
      <ScrollToTop/>
    </div>
  );
}

