export const globalSchema = {
    "@context": "https://schema.org",
    "@type": ["WebSite", "EducationalOrganization", "LocalBusiness"],

    "@id": "https://www.adhyayanx.in/#organization",

    "name": "AdhyayanX – IT Training Institute in Agra",
    "url": "https://www.adhyayanx.in",

    "description":
        "AdhyayanX is an IT training institute in Agra offering project-based BCA, BBA, full-stack development, digital marketing, and career-focused training programs.",

    "image": {
        "@type": "ImageObject",
        "url": "https://www.adhyayanx.in/images/opengraph/home-og.jpg",
        "width": 1200,
        "height": 630
    },

    "logo": {
        "@type": "ImageObject",
        "url": "https://www.adhyayanx.in/images/logo-square.png",
        "width": 512,
        "height": 512
    },

    "address": {
        "@type": "PostalAddress",
        "streetAddress": "A-3, behind Manoj Dhaba, Bhagwan Talkies crossing, Indra Puri, New Agra Colony, Agra, Uttar Pradesh",
        "addressLocality": "Agra",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "282005",
        "addressCountry": "IN"
    },

    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91 7060166562",
        "contactType": "support",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
    },

    "sameAs": [
        "https://www.facebook.com/adhyayanx",
        "https://www.linkedin.com/company/adhyayanx",
        "https://www.instagram.com/adhyayanx",
        "https://www.twitter.com/adhyayanx",
        "https://www.youtube.com/@AdhyayanX"
    ]
};
