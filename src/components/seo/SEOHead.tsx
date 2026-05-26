import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = "/og-image.png",
  ogType = "website",
  schema,
}: SEOHeadProps) {
  const siteName = "OneOfOneSystems LLC";
  // Use title as-is. Pages own their full <title> so we can keep it under 60 chars.
  const fullTitle = title;
  const baseUrl = "https://www.oneofonemarketing.com";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={`${baseUrl}${canonical}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      {canonical && <meta property="og:url" content={`${baseUrl}${canonical}`} />}
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OneOfOneSystems LLC",
  url: "https://www.oneofonemarketing.com",
  logo: "https://www.oneofonemarketing.com/android-chrome-512x512.png",
  description: "We build customer-acquisition systems: high-converting websites + SEO + paid ads + automation.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-631-766-5791",
    email: "john@oneofonemarketing.com",
    contactType: "sales",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/oneofonemarketing",
    "https://www.facebook.com/oneofonemarketing",
    "https://www.instagram.com/oneofonemarketing",
  ],
};

// Local Business Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "OneOfOneSystems LLC",
  image: "https://www.oneofonemarketing.com/android-chrome-512x512.png",
  "@id": "https://www.oneofonemarketing.com",
  url: "https://www.oneofonemarketing.com",
  telephone: "+1-631-766-5791",
  email: "john@oneofonemarketing.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dallas",
    addressRegion: "TX",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
  },
};

// Service Schema Generator
export const generateServiceSchema = (
  name: string,
  description: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  provider: {
    "@type": "Organization",
    name: "OneOfOneSystems LLC",
    url: "https://www.oneofonemarketing.com",
  },
  description,
  url,
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
});

// FAQ Schema Generator
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// Collection Page Schema Generator (for portfolio / case study indexes)
export const generateCollectionPageSchema = (
  name: string,
  description: string,
  url: string,
  items: Array<{ name: string; url?: string; description?: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name,
  description,
  url,
  isPartOf: {
    "@type": "WebSite",
    name: "OneOfOneSystems LLC",
    url: "https://www.oneofonemarketing.com",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  },
});

// Review Schema
export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  itemReviewed: {
    "@type": "Organization",
    name: "OneOfOneSystems LLC",
  },
  ratingValue: "4.9",
  bestRating: "5",
  worstRating: "1",
  ratingCount: "50",
};
