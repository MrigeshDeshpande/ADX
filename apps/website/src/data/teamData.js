export const TEAM_MEMBERS = {
    // Leadership
    rahulSingh: {
        id: "rahul-singh",
        name: "Rahul Singh",
        role: "COO",
        bio: "Visionary behind SkillYards, dedicated to delivering industry-relevant learning and empowering tech professionals to bridge the gap between theory and reality.",
        image: "/images/team/rahul-singh.png",
        badge: "Leadership",
        socials: {
            linkedin: "https://linkedin.com",
        },
    },
    suryanshUpadhyay: {
        id: "suryansh-upadhyay",
        name: "Suryansh Upadhyay",
        role: "CEO",
        bio: "Transforming Education & Training by driving product strategy and ensuring we deliver immense value to our students and industry partners alike.",
        image: "/images/team/suryanshSir.webp",
        badge: "Leadership",
        socials: {
            linkedin: "https://linkedin.com/in/suryanshupadhyay",
        },
    },

    // Engineering & Marketing
    mrigeshDeshpande: {
        id: "mrigesh-deshpande",
        name: "Mrigesh Deshpande",
        role: "Sr. Full Stack Developer",
        bio: "Full Stack Engineer focused on backend scalability, system design, and building robust real-world production systems.",
        specialization: "Backend & Systems Design",
        image: "/images/team/Mrigesh-Deshpande.jpg",
        badge: "Core",
        socials: {
            linkedin: "https://linkedin.com/in/mrigeshdeshpande",
        },
    },
    chakreshChakshu: {
        id: "chakresh-chakshu",
        name: "Chakresh Chakshu",
        role: "Jr. Full Stack Developer",
        bio: "React & Next.js developer obsessed with high performance, fluid motion animations, and delivering clean UX.",
        specialization: "Next.js & Frontend Architecture",
        image: "/images/team/Chakresh-Chakshu.webp",
        socials: {
            linkedin: "https://linkedin.com/in/chakreshchakshu",
        },
    },
    neerajDang: {
        id: "neeraj-dang",
        name: "Neeraj Dang",
        role: "SEO & PPC Specialist",
        bio: "An SEO & PPC Specialist known for data analysis and strategic execution.",
        specialization: "Digital Marketing Strategy",
        image: "/images/team/Neeraj.png",
        socials: {
            linkedin: "https://www.linkedin.com/in/neeraj-dang-70350824a",
        },
    },

    // Operations & Sales
    kaushalParihar: {
        id: "kaushal-parihar",
        name: "Kaushal Parihar",
        role: "Field Sales Executive",
        bio: "Sales on the move, results on target. Drives physical outreach and builds enterprise partnerships.",
        image: "/images/team/KaushalSIr.png",
        badge: "Ops",
        socials: {
            linkedin: "https://linkedin.com",
        },
    },
    khushaliGupta: {
        id: "khushali-gupta",
        name: "Khushali Gupta",
        role: "Business Development Executive",
        bio: "Where words meet results. Spearheads outbound campaigns and deepens community engagement pipelines.",
        image: "/images/team/khushali.jpeg",
        socials: {
            linkedin: "https://linkedin.com",
        },
    },
    bhanuSharma: {
        id: "bhanu-sharma",
        name: "Bhanu Sharma",
        role: "Administrative Head",
        bio: "Behind the scenes leader: orchestrating systems, managing people, and laying the groundwork for success.",
        image: "/images/team/Bhanu.jpg",
        socials: {
            linkedin: "https://linkedin.com",
        },
    },
    karanSinghTomar: {
        id: "karan-singh-tomar",
        name: "Karan Singh Tomar",
        role: "Business Development Associate",
        bio: "Crafts stories that drive sales and cultivates long-term relationships with institutional partners.",
        image: "/images/team/Karan.webp",
        socials: {
            linkedin: "https://linkedin.com",
        },
    },
    saurabhVerma: {
        id: "saurabh-verma",
        name: "Saurabh Verma",
        role: "Business Development Associate",
        bio: "Selling solutions, not just products. Connects learners with the exact programs they need to succeed.",
        image: "/images/team/Saurav.webp",
        socials: {
            linkedin: "https://linkedin.com",
        },
    },
};

// General team page groupings
export const leadershipTeam = [
    TEAM_MEMBERS.rahulSingh,
    TEAM_MEMBERS.suryanshUpadhyay,
];

export const engineeringTeam = [
    TEAM_MEMBERS.mrigeshDeshpande,
    TEAM_MEMBERS.chakreshChakshu,
    TEAM_MEMBERS.neerajDang,
];

export const operationsTeam = [
    TEAM_MEMBERS.kaushalParihar,
    TEAM_MEMBERS.karanSinghTomar,
    TEAM_MEMBERS.saurabhVerma,
    TEAM_MEMBERS.khushaliGupta,
    TEAM_MEMBERS.bhanuSharma,
];

// Carousel / Other Team selection
export const carouselTeam = [
    TEAM_MEMBERS.mrigeshDeshpande,
    TEAM_MEMBERS.neerajDang,
    TEAM_MEMBERS.kaushalParihar,
    TEAM_MEMBERS.khushaliGupta,
    TEAM_MEMBERS.bhanuSharma,
    TEAM_MEMBERS.karanSinghTomar,
    TEAM_MEMBERS.saurabhVerma,
    TEAM_MEMBERS.chakreshChakshu,
];

// Course specific educators
export const bcaEducators = [
    TEAM_MEMBERS.mrigeshDeshpande,
    TEAM_MEMBERS.chakreshChakshu,
];

export const bbaEducators = [
    TEAM_MEMBERS.neerajDang,
];
