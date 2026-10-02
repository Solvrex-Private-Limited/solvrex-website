import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@solvrex/ui/styles/globals.css";
import { Navbar } from "@solvrex/ui";
import { Footer } from "@solvrex/ui";
import { siteConfig } from "@solvrex/ui";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const HOME_TITLE = "Solvrex | Business Enablement, Technology, Sales & Marketing Support";
const HOME_DESCRIPTION =
  "Solvrex helps businesses operate and grow — website & digital enablement, technology consulting, and sales, marketing, and operational support from a senior, independent team.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: HOME_TITLE, template: `%s | ${siteConfig.name}` },
  description: HOME_DESCRIPTION,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/mark.png",
    shortcut: "/mark.png",
    apple: "/mark.png",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/`,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('solvrex-theme')==='dark'){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}",
          }}
        />
        <div className="sx-bg" aria-hidden="true" />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
          }}
        >
          <Navbar variant="business" />
          <div style={{ flex: 1 }}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
