import { SITE } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description:
      "Same-day junk removal in Northern Virginia. Serving Fairfax, Loudoun County, and nearby. Fully insured, locally owned.",
    telephone: SITE.phoneTel,
    email: SITE.email,
    priceRange: "$70–$1000",
    url: "https://example.com",
    image: "https://example.com/og.jpg",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Northern Virginia" },
      { "@type": "City", name: "Fairfax" },
      { "@type": "AdministrativeArea", name: "Loudoun County" },
    ],
    slogan: SITE.tagline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
