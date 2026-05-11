export const ORGANIZATION_ID = "https://www.skillyards.in/#organization";
export const WEBSITE_ID = "https://www.skillyards.in/#website";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",

  "@id": ORGANIZATION_ID,

  name: "SkillYards",
  url: "https://www.skillyards.in",

  description:
    "SkillYards is an IT training institute in Agra offering project-based BCA, BBA, full-stack development, digital marketing, and career-focused training programs.",
  
  foundingDate: "2023",
  founder: [
    {
      "@type": "Person",
      name: "Rahul Singh",
      jobTitle: "Chief Operating Officer"
    },
    {
      "@type": "Person",
      name: "Suryansh Upadhyay",
      jobTitle: "Chief Executive Officer"
    }
  ],
  
  knowsAbout: [
    "Full Stack Web Development",
    "Data Science & Analytics",
    "On Job Training (OJT)",
    "Industrial Certifications",
    "Career Placement",
    "Digital Marketing",
    "BCA & MCA Specialized Training"
  ],

  areaServed: [
    {
      "@type": "City",
      "name": "Agra"
    },
    {
      "@type": "Country",
      "name": "India"
    }
  ],

  logo: {
    "@type": "ImageObject",
    url: "https://www.skillyards.in/images/logo-square.png",
    width: 512,
    height: 512
  },

  image: {
    "@type": "ImageObject",
    url: "https://www.skillyards.in/images/opengraph/home-og.jpg",
    width: 1200,
    height: 630
  },

  address: {
    "@type": "PostalAddress",
    streetAddress: "A3, Behind Manoj Dhaba, Bhagwan Talkies Xing",
    addressLocality: "Agra",
    addressRegion: "Uttar Pradesh",
    postalCode: "282005",
    addressCountry: "IN"
  },

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 7895501840",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"]
  },

  sameAs: [
    "https://www.facebook.com/skillyardss",
    "https://www.linkedin.com/company/skillyards",
    "https://www.instagram.com/skillyardss",
    "https://www.twitter.com/skillyardss",
    "https://www.youtube.com/@Skillyardss"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,

  url: "https://www.skillyards.in",
  name: "SkillYards",

  publisher: {
    "@id": ORGANIZATION_ID
  }
};
