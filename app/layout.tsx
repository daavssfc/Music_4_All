import "@/app/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Music 4 All",
  description: "Headless content platform foundation for Music 4 All"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
