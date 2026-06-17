import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Maryland ESA Habitat Dashboard",
  description: "Static MVP for Maryland ESA-listed species and habitat planning",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
