export const BASE_URL = "https://www.skillyards.in";

export const STATIC_SITEMAP_ROUTES = [
    { path: "/", label: "Home", section: "Company", priority: 1.0 },
    { path: "/about", label: "About Us", section: "Company" },
    { path: "/contact", label: "Contact", section: "Company" },
    { path: "/services", label: "Our Services", section: "Company" },

    { path: "/programs", label: "Programs", section: "Courses", priority: 0.9 },
    { path: "/programs/on-job-degree", label: "On-Job Degree Programs", section: "Courses", priority: 0.95 },
    { path: "/programs/on-job-training", label: "On-Job Training Programs", section: "Courses", priority: 0.95 },
    { path: "/programs/on-job-degree/best-bca-course-in-agra-with-job-training", label: "BCA Programs", section: "Courses", priority: 0.9 },
    { path: "/programs/on-job-degree/best-bba-course-in-agra-with-job-training", label: "BBA Programs", section: "Courses", priority: 0.9 },
    { path: "/programs/on-job-training/best-full-stack-development-course-in-agra", label: "Full-Stack Development", section: "Courses", priority: 0.9 },
    { path: "/programs/on-job-training/best-digital-marketing-course-in-agra", label: "Digital Marketing", section: "Courses", priority: 0.9 },

    { path: "/blog", label: "Blog", section: "Resources" },
    { path: "/faqs", label: "FAQs", section: "Resources" },
    { path: "/support", label: "Support", section: "Resources" },
    { path: "/10-minutes-test", label: "10-Minute Skill Test", section: "Resources" },

    { path: "/careers", label: "Careers", section: "Careers" },
    { path: "/team", label: "Our Team", section: "Company" },

    { path: "/testimonials", label: "Testimonials", section: "Students" },

    { path: "/legal/privacy-policy", label: "Privacy Policy", section: "Legal" },
    { path: "/legal/refund-policy", label: "Refund Policy", section: "Legal" },
    { path: "/legal/terms-of-service", label: "Terms of Service", section: "Legal" },

];

export const LEADERS = [
    { username: "suryanshupadhyay", name: "Suryansh Upadhyay" },
    { username: "rahulsingh", name: "Rahul Singh" },
];
