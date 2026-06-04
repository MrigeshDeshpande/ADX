import { BASE_URL } from "../constants/ids.js";
import { PRESS_MENTIONS } from "./press.js";

export const orgData = {
  name: "AdhyayanX",
  url: BASE_URL,
  description:
    "AdhyayanX is a modern education operations platform for coaching institutes, training centers, and educational organizations.",

  foundingDate: "2023",

  founders: [
    {
      name: "Rahul Singh",
      jobTitle: "Chief Operating Officer",
    },
    {
      name: "Suryansh Upadhyay",
      jobTitle: "Chief Executive Officer",
    },
  ],

  knowsAbout: [
    "Full Stack Web Development",
    "Data Science & Analytics",
    "On Job Training (OJT)",
    "On Job Degree (OJD)",
    "Industrial Certifications",
    "Career Placement",
    "Digital Marketing",
    "BCA Specialized Training",
    "BBA Specialized Training",
  ],

  areaServed: [
    { type: "City", name: "Agra" },
    { type: "Country", name: "India" },
  ],

  media: {
    logo: {
      url: `${BASE_URL}/images/logo-square.png`,
      width: 512,
      height: 512,
    },
    defaultOgImage: {
      url: `${BASE_URL}/images/opengraph/home-og.jpg`,
      width: 1200,
      height: 630,
    },
  },

  location: {
    name: "AdhyayanX",
    address: {
      streetAddress: "A-3, behind Manoj Dhaba, Bhagwan Talkies Crossing, Indra Puri, New Agra Colony, Agra, Uttar Pradesh",
      addressLocality: "Agra",
      addressRegion: "Uttar Pradesh",
      postalCode: "282005",
      addressCountry: "IN",
    },
  },

  contact: {
    telephone: "+91 7060166562",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },

  socials: [
    "https://www.facebook.com/adhyayanx",
    "https://www.linkedin.com/company/adhyayanx",
    "https://www.instagram.com/adhyayanx_eduhub",
    "https://www.twitter.com/adhyayanx",
    "https://www.youtube.com/@Adhyayanx",
  ],

  press: PRESS_MENTIONS,
};
