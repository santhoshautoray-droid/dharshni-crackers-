import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dharshinicrackers-tiruvallur.com"),
  title: "Dharshini Crackers – Tiruvallur | Premium Fireworks Showroom",
  description: "Official digital showroom for Dharshini Crackers – Tiruvallur. Shop No. 139, Shakti Nagar, near Vivekananda School, Tiruvaloor, Tamil Nadu 602001. Premium festival fireworks, aerial sky shots, gift boxes, and celebration crackers. Rated 4.8/5 on Google Maps.",
  keywords: [
    "Dharshini Crackers Tiruvallur",
    "Fireworks store Tiruvallur",
    "Diwali crackers Tamil Nadu",
    "Aerial sky shots",
    "Gift boxes",
    "Shakti Nagar crackers",
  ],
  authors: [{ name: "Dharshini Crackers Tiruvallur" }],
  openGraph: {
    title: "Dharshini Crackers – Tiruvallur | Premium Fireworks Showroom",
    description: "Discover futuristic festival fireworks and curated celebration crackers at our verified Tiruvallur showroom.",
    images: ["/images/hero-bloom.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FireworksStore",
    "name": "Dharshini Crackers – Tiruvallur",
    "image": "/images/hero-bloom.jpg",
    "telephone": "+91 96775 85657",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop No. 139, Shakti Nagar, near Vivekananda School, near Salai Road",
      "addressLocality": "Tiruvaloor",
      "addressRegion": "Tamil Nadu",
      "postalCode": "602001",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.1294422,
      "longitude": 79.8989643,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00",
      },
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "55",
    },
    "hasMap": "https://www.google.com/maps/place/Dharshini+Crackers+%E2%80%93+Tiruvallur/@13.1294422,79.8989643,17z/",
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.variable} font-sans bg-obsidian text-white antialiased selection:bg-brand-purple/40`}>
        {children}
      </body>
    </html>
  );
}
