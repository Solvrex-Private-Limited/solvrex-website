import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@solvrex/ui/styles/globals.css";
import { Navbar, Footer, siteConfig, BubbleBackground } from "@solvrex/ui";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const HOME_TITLE = "Solvrex | Career Services, Technology Consulting & Business Support";
const HOME_DESCRIPTION =
  "Human-led career services from Solvrex — resume reviews, LinkedIn optimization, job search support, and interview prep — plus technology consulting and enablement.";

// NOTE: no `alternates.canonical` here on purpose. A canonical in the root layout is
// inherited by every page that does not set its own, which would make them all point
// at the homepage. Each page sets its own (pageMetadata in @solvrex/ui does this).
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: HOME_TITLE, template: `%s | ${siteConfig.name}` },
  description: HOME_DESCRIPTION,
  applicationName: siteConfig.name,
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
    locale: siteConfig.locale,
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
    <html lang={siteConfig.hreflang} suppressHydrationWarning>
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('solvrex-theme')==='dark'){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}",
          }}
        />
        <div className="sx-bg" aria-hidden="true" />
        <BubbleBackground />
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
          <Navbar />
          <div style={{ flex: 1 }}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}