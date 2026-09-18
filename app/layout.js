import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SiteEffects from "./components/SiteEffects";

export const metadata = {
  metadataBase: new URL("https://kanwalkumar.com"),
  title: "Kanwal Kumar — Agentic AI and Automation Engineer",
  description:
    "Kanwal Kumar — AI and automation engineer. Agents, automation, web apps, products and plugins. Stack, project teardowns, references and availability in one place.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Kanwal Kumar — AI & automation engineer",
    description:
      "Agents, automation, web apps and plugins — built, deployed and maintained. Project teardowns, stack and availability in one place.",
    images: ["/images/og.jpg"],
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/images/favicon.svg", type: "image/svg+xml" }],
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/images/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A1B2D",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kanwal Kumar",
  url: "https://kanwalkumar.com",
  image: "https://kanwalkumar.com/images/kanwal.jpg",
  jobTitle: "AI & Automation Engineer",
  email: "mailto:kanwalkumarofficial@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/kanwal-kumar-ai/",
    "https://github.com/kumarkanwal",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Workflow Automation",
    "RAG",
    "LangChain",
    "Python",
    "FastAPI",
    "Next.js",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Mite University",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600&f[]=switzer@400,500,600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("kk_theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <Nav />
        <SiteEffects />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
