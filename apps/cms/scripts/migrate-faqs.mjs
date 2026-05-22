/**
 * Migration script: imports hardcoded FAQs into Sanity.
 *
 * Usage:
 *   node apps/cms/scripts/migrate-faqs.mjs
 *
 * Environment variables (optional, for non-production datasets):
 *   SANITY_PROJECT_ID  (default: 2it7abok)
 *   SANITY_DATASET     (default: production)
 *   SANITY_TOKEN       (required for writes)
 *
 * To create a write token:
 *   https://www.sanity.io/manage → API → Tokens → Add token (editor role)
 */

import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "2it7abok";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN;

if (!token) {
  console.error(
    "ERROR: SANITY_TOKEN environment variable is required.\n" +
      "Create a token at https://www.sanity.io/manage → API → Tokens → Add token (editor role)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── Source data (from apps/website/src/data/faqs.js) ──────────────────────

const faqCategories = {
  homepage: {
    label: "About SkillYards",
    description:
      "General questions about SkillYards, our training model, and what we offer.",
    faqs: [
      {
        question: "What is On Job Training (OJT)?",
        answer:
          "On Job Training (OJT) is a 7-9 month program where you learn full-stack development or digital marketing through live projects and real work experience. You don't need a degree - just complete the training, build your portfolio, and get placement support.",
      },
      {
        question: "What is the On Job Degree program?",
        answer:
          "The On Job Degree combines formal university education with practical work experience, enabling you to earn a recognised degree while contributing to live industry projects.",
      },
      {
        question: "Do you provide placement assistance?",
        answer:
          "Yes, we provide 100% placement assistance. Our network of 180+ partner companies and dedicated placement cell help students secure high-paying jobs in the IT industry.",
      },
      {
        question: "Which technologies do you train in?",
        answer:
          "We offer comprehensive training in Full-Stack Web Development (MERN), Digital Marketing, BCA, and BBA - each with on-job training and placement support.",
      },
      {
        question: "Is there any certification provided?",
        answer:
          "Yes, upon successful completion of the training or degree program, you receive industry-recognised certifications that are highly valued by top IT employers.",
      },
      {
        question: "What is the duration of the training programs?",
        answer:
          "Our short-term skill courses typically range from 3 to 6 months, while the On Job Degree programs follow standard academic timelines (3 years) integrated with practical work.",
      },
      {
        question: "Are the classes online or offline?",
        answer:
          "We offer completely offline training at our Agra campus. Our institute provides direct mentorship, code reviews, and laboratory access.",
      },
      {
        question: "Who is eligible to join SkillYards?",
        answer:
          "Students who have completed or are pursuing their 12th, BCA, B.Tech, MCA, or any degree with a passion for IT are eligible to join our various programs.",
      },
      {
        question: "Where is SkillYards located?",
        answer:
          "Our main centre is located at A-3, behind Manoj Dhaba, Bhagwan Talkies crossing, Indra Puri, New Agra Colony, Agra, Uttar Pradesh – 282005, India.",
      },
    ],
  },

  general: {
    label: "General",
    description: "About SkillYards, admissions, fees, and placement.",
    faqs: [
      {
        question: "What are the eligibility criteria for joining SkillYards?",
        answer:
          "For skill courses (Full-Stack Dev & Digital Marketing), there is no strict eligibility - anyone with basic computer literacy can join. For degree programs (BCA & BBA), you need to have passed 12th grade with at least 50% marks.",
      },
      {
        question: "What's the difference between a Degree program and a Skill Course?",
        answer:
          "Degree programs (BCA & BBA) are 3-year university-affiliated programs that give you an accredited bachelor's degree plus on-job training. Skill Courses (Full-Stack Dev & Digital Marketing) are shorter, intensive programs (3–6 months) focused on immediate job readiness with industry certificates. Both include placement support.",
      },
      {
        question: "How do I enroll in a program?",
        answer:
          "Visit our Contact page or come to the campus directly. Our counsellors will guide you through the right program, seat availability, and the joining process. Enrollment is confirmed once the initial fee is paid.",
      },
      {
        question: "Can I join mid-batch?",
        answer:
          "Mid-batch joining is possible in limited cases depending on how far the batch has progressed. Contact us to check availability and get access to recorded sessions to catch up.",
      },
      {
        question: "Is placement actually guaranteed?",
        answer:
          "We have a strong track record of placements - which means we actively work to place every eligible student. We don't guarantee a specific salary, but we do guarantee dedicated placement support: resume building, mock interviews, referrals, and direct connections with 180+ hiring partners.",
      },
      {
        question: "What are the fee and EMI options?",
        answer:
          "Skill courses start from ₹15,000 (Digital Marketing) and ₹25,000 (Full-Stack Dev). Degree program fees are shared during your counselling session. EMI and instalment options are available across all programs - contact us to know the exact payment plan.",
      },
      {
        question: "What payment modes are accepted?",
        answer:
          "We accept UPI, bank transfer, cash, and debit/credit card at our campus. Digital payments can be made via UPI or bank transfer after confirming your seat.",
      },
      {
        question: "Can I switch programs after joining?",
        answer:
          "Program switches are evaluated case-by-case within the first 2 weeks of joining. After that, seat allocation and scheduling make switches difficult. We strongly recommend attending a counselling session before enrolling to make the right choice from the start.",
      },
      {
        question: "Are the programs available online?",
        answer:
          "All our programs are exclusively offline at our Agra campus. We believe in hands-on training to provide the best learning environment and direct mentorship.",
      },
      {
        question: "What if I miss classes?",
        answer:
          "All sessions are recorded and shared with enrolled students. Our mentors also hold weekly doubt-clearing sessions. For degree programs, we follow the university attendance policy (minimum 75% attendance required).",
      },
    ],
  },

  fullstack: {
    label: "Full-Stack Dev",
    description: "Everything about the Full-Stack Development program.",
    faqs: [
      {
        question: "Do I need prior coding experience to join?",
        answer:
          "No. The course starts from absolute scratch - HTML, CSS, and basic JavaScript in Month 1. The only requirement is basic computer comfort (using a browser, typing). If you can use WhatsApp and Google, you can start this course.",
      },
      {
        question: "Is a laptop mandatory? What are the minimum specs?",
        answer:
          "Yes, a laptop is required - this is a hands-on practical course. Minimum: Intel Core i5 / Ryzen 5, 8GB RAM, 256GB SSD, Windows 10 or macOS. A smartphone alone won't work. If you don't have a laptop that meets these specs, talk to us before enrolling.",
      },
      {
        question: "What if I miss a class?",
        answer:
          "Every session is recorded and shared with enrolled students within 24 hours. We also hold weekly doubt-clearing sessions. That said - missing classes regularly will hurt you. The projects have deadlines. The code reviews expect your code.",
      },
      {
        question: "How is this different from just learning on YouTube or Udemy?",
        answer:
          "YouTube gives you videos. We give you a mentor who reviews your code, peers who challenge you, real projects with real deadlines, and placement support that includes actual referrals to companies. Most people who start a programming tutorial online alone don't finish it. Our completion rate is significantly higher because of the mentorship and peer environment.",
      },
      {
        question: "What does your placement support actually mean?",
        answer:
          "It means 100% active effort - resume building, mock interviews, referrals to our 180+ hiring partners, and direct introductions where possible. It does not mean we guarantee a specific salary or that a company must hire you. We will work hard to get you placed - but you have to show up hireable.",
      },
      {
        question: "Can I join if I'm currently working a day job?",
        answer:
          "Yes. We offer weekend batches and evening batches for working professionals. Check current availability during your free demo session. Be honest with yourself though - this course requires 4–6 hours of daily work. A full-time job + this course is doable but demanding.",
      },
      {
        question: "What language is the course taught in?",
        answer:
          "Primarily Hinglish (Hindi + English) - which is the most effective way to explain complex technical concepts to students in Agra. Technical terms, documentation, and code are in English. No prior English fluency required.",
      },
      {
        question: "How many students are in each batch?",
        answer:
          "Maximum 20 students per batch. This is intentional - smaller batches mean more mentor attention, better code review quality, and a tighter peer learning environment. We don't scale beyond 20 per batch.",
      },
      {
        question: "What happens after I complete the course?",
        answer:
          "You stay in the SkillYards alumni network - which means access to future job referrals, continued doubt support for 3 months post-completion, and invites to alumni events. Many graduates come back as mentors once they're 2–3 years into their careers.",
      },
      {
        question: "What's the refund and cancellation policy?",
        answer:
          "Full refund if you cancel before attending the first class. 50% refund within the first 2 weeks. No refund after 2 weeks. The free demo class exists precisely so you can make this decision before paying - we strongly recommend attending before enrolling.",
      },
    ],
  },

  digitalmarketing: {
    label: "Digital Marketing",
    description: "Everything about the Digital Marketing program.",
    faqs: [
      {
        question: "Do I need any prior marketing or tech knowledge?",
        answer:
          "None at all. The course starts from the very beginning - what digital marketing is, why it matters, and how each channel works. If you can use Instagram and search on Google, you have everything you need to start.",
      },
      {
        question: "Do I need to know coding?",
        answer:
          "No. Digital marketing is creative and analytical - not technical. You'll learn to use tools, run campaigns, and read data. The most technical thing you'll do is set up a WordPress site, which requires no coding.",
      },
      {
        question: "Is a laptop mandatory? What specs do I need?",
        answer:
          "Yes, a laptop is required. Any laptop with 4GB+ RAM running Windows 10 or macOS works - digital marketing tools are browser-based, so even an older machine is fine. This is much more accessible than coding courses.",
      },
      {
        question: "Will I get access to paid tools like Ahrefs or SEMrush?",
        answer:
          "Yes. Tool access is included during the course - you don't need to subscribe yourself. This includes Ahrefs, SEMrush (or Ubersuggest), Canva Pro, and Google Workspace. These are the same tools working professionals use daily.",
      },
      {
        question: "Will I get hands-on practice running campaigns during the course?",
        answer:
          "You learn campaign execution through mentor-guided practical work - using guided practice setups, sample datasets, and structured exercises designed to reflect real workflows. The focus is hands-on learning and portfolio-ready case work, without making unverifiable claims about live client accounts.",
      },
      {
        question: "What certifications will I earn?",
        answer:
          "We focus on practical training and career preparation. If you choose to pursue any third-party certifications (like Google/Meta/HubSpot), mentors can guide you on what to study and how to prepare, but certification outcomes depend on the provider and your performance.",
      },
      {
        question: "Is placement guaranteed? What does that actually mean?",
        answer:
          "We provide dedicated placement support - resume building, mock interviews, and interview preparation. We do not guarantee placements or specific salary outcomes.",
      },
      {
        question: "Can I freelance after this course? Will SkillYards help me get work?",
        answer:
          "Some students choose freelancing as a career path. We can cover practical basics like pricing, proposals, and professional communication as part of career preparation. We do not provide paid work; the focus is on building skills and a portfolio that helps you pursue opportunities independently.",
      },
      {
        question: "Are there evening or weekend batches for working professionals?",
        answer:
          "Yes. We offer weekday morning, weekday evening, and weekend batches. Working professionals commonly join evening or weekend batches. Discuss options during your free demo session.",
      },
      {
        question: "How is this different from doing a free Google Digital Garage course?",
        answer:
          "Free resources teach concepts. At SkillYards, training is mentor-led and practical - you learn by executing structured assignments, building a portfolio, and getting feedback on your work.",
      },
      {
        question: "Can small business owners join to grow their own business?",
        answer:
          "Absolutely - and several do. If you run or help run a family business, you can apply everything you learn to your own brand in real time. Many graduates report growing their business during the course itself, not just after.",
      },
      {
        question: "What language are classes taught in?",
        answer:
          "Hinglish - Hindi mixed with English. Technical terms and tools are in English, but explanations are in Hindi or Hinglish to make sure everyone understands deeply. No prior English fluency required.",
      },
    ],
  },

  degrees: {
    label: "BCA & BBA",
    description: "About the 3-year degree programs.",
    faqs: [
      {
        question: "What are the eligibility criteria for BCA and BBA?",
        answer:
          "Both BCA and BBA require 12th pass (any stream) with a minimum of 50% marks. There's no entrance exam - just a counselling session to ensure the program is the right fit for you.",
      },
      {
        question: "Are BCA and BBA degrees university-recognised?",
        answer:
          "Yes. Both programs are affiliated with a recognised university. You receive a standard bachelor's degree (BCA or BBA) along with SkillYards' practical training and career support.",
      },
      {
        question: "Do BCA and BBA programs offer placement support?",
        answer:
          "Yes. Both programs include dedicated placement support such as resume building, mock interviews, and interview preparation.",
      },
      {
        question: "Is attendance mandatory for degree programs?",
        answer:
          "Yes. BCA and BBA are primarily offline programs with university attendance requirements. A minimum of 75% attendance is required as per university policy.",
      },
      {
        question: "Can I do BCA if I'm from an arts or commerce background?",
        answer:
          "Yes. BCA does not require a science background at 12th level - any stream is accepted as long as you meet the 50% minimum marks requirement.",
      },
      {
        question: "What is the OJT (On-Job Training) component in degree programs?",
        answer:
          "OJT is SkillYards' signature component where you work on mentor-guided practical projects alongside your academic coursework. This helps you build hands-on skills beyond the university syllabus.",
      },
    ],
  },

  support: {
    label: "Support",
    description: "Technical help, LMS access, and administrative queries.",
    faqs: [
      {
        question: "I can't access my student portal / LMS. What do I do?",
        answer:
          "Try resetting your password first. If the issue persists, WhatsApp or email us with your enrollment ID and we'll restore access within a few hours.",
      },
      {
        question: "Where can I find recorded sessions?",
        answer:
          "Recorded sessions are uploaded to the LMS within 24 hours of each class. Check the 'Recordings' section under your enrolled course. If a recording is missing, contact your batch coordinator.",
      },
      {
        question: "How do I get a payment receipt or invoice?",
        answer:
          "A receipt is issued at the time of payment. If you need a duplicate receipt or a formal invoice for reimbursement, email us with your enrollment details.",
      },
      {
        question: "What does the placement process look like?",
        answer:
          "Placement prep starts early - resume building, LinkedIn optimisation, and mock interviews. In the final phase, we support interview preparation and share opportunities where available, without guaranteeing outcomes.",
      },
    ],
  },

  test: {
    label: "Skill Test",
    description: "About the free 10-minute skill assessment.",
    faqs: [
      {
        question: "Is the skill test really free?",
        answer:
          "Yes, completely free. There is no payment, no subscription, and no catch. You take the test and get your score at zero cost.",
      },
      {
        question: "How long does the test take?",
        answer:
          "The test has 20–25 multiple choice questions and is designed to be completed in under 10 minutes. Most students finish in 6–8 minutes.",
      },
      {
        question: "Do I need any coding experience to take the test?",
        answer:
          "No coding is required. The test is multiple choice - you just need a basic familiarity with HTML, CSS, JavaScript, and SEO concepts. Beginners are welcome.",
      },
      {
        question: "When will I receive my certificate?",
        answer:
          "Your certificate is generated instantly after you submit the test. It is emailed to the address you provide in the registration form, typically within a few minutes.",
      },
      {
        question: "Is the certificate valid / recognised?",
        answer:
          "The certificate is issued by SkillYards and is suitable for sharing on LinkedIn, your portfolio, or your CV. It demonstrates that you have completed a verified skill assessment.",
      },
      {
        question: "What happens if I score below 60%?",
        answer:
          "You still receive a certificate - labelled 'Beginner' - along with a personalised recommendation for which SkillYards program would help you reach the next level. There is no fail.",
      },
      {
        question: "Can I retake the test?",
        answer:
          "Yes, you can retake the test after 7 days. We encourage you to revisit the topics you found challenging and come back for a better score.",
      },
      {
        question: "Will SkillYards contact me after the test?",
        answer:
          "Our counselling team may reach out with a program recommendation based on your score - but only once, and only to help. You can opt out at any time.",
      },
    ],
  },
};

// ── Helpers ─────────────────────────────────────────────────────────────

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function upsertDocument(doc) {
  const slug = doc.slug?.current;
  const existing = slug
    ? await client.fetch(`*[_type == $type && slug.current == $slug][0]{_id}`, {
        type: doc._type,
        slug,
      })
    : null;

  try {
    if (existing) {
      const result = await client.patch(existing._id).set(doc).commit();
      const label = doc.title || doc.question?.slice(0, 60);
      console.log(`  ~ Updated ${doc._type}: "${label}"`);
      return result;
    }
    const result = await client.create(doc);
    const label = doc.title || doc.question?.slice(0, 60);
    console.log(`  ✓ Created ${doc._type}: "${label}"`);
    return result;
  } catch (err) {
    const label = doc.title || doc.question?.slice(0, 60);
    console.error(`  ✗ Failed ${doc._type}: "${label}" — ${err.message}`);
    throw err;
  }
}

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  console.log("Starting FAQ migration...\n");
  console.log(`Project: ${projectId}, Dataset: ${dataset}\n`);

  const categoryRefs = {};

  // Step 1: Upsert faqCategory documents
  console.log("── FAQ Categories ──");
  for (const [slug, cat] of Object.entries(faqCategories)) {
    const doc = {
      _type: "faqCategory",
      title: cat.label,
      slug: { _type: "slug", current: slug },
      description: cat.description,
      order: Object.keys(faqCategories).indexOf(slug),
    };
    const result = await upsertDocument(doc);
    categoryRefs[slug] = { _type: "reference", _ref: result._id };
  }

  // Step 2: Upsert faq documents
  console.log("\n── FAQs ──");
  for (const [slug, cat] of Object.entries(faqCategories)) {
    for (let i = 0; i < cat.faqs.length; i++) {
      const faq = cat.faqs[i];
      const doc = {
        _type: "faq",
        question: faq.question,
        answer: faq.answer,
        category: categoryRefs[slug],
        slug: { _type: "slug", current: slugify(faq.question).slice(0, 120) },
        order: i,
        isActive: true,
        targetPages: getTargetPages(slug),
      };
      await upsertDocument(doc);
    }
  }

  console.log("\n✓ Migration complete!");
  console.log(`  Categories: ${Object.keys(faqCategories).length}`);
  const totalFaqs = Object.values(faqCategories).reduce((sum, c) => sum + c.faqs.length, 0);
  console.log(`  FAQs: ${totalFaqs}`);
}

function getTargetPages(slug) {
  const map = {
    homepage: ["/"],
    general: ["/programs"],
    fullstack: ["/full-stack-web-development-training-in-agra"],
    digitalmarketing: ["/digital-marketing-course-in-agra"],
    degrees: ["/programs/on-job-degree"],
    support: ["/support"],
    test: ["/10-minutes-test"],
  };
  return map[slug] || [];
}

main().catch((err) => {
  console.error("\nMigration failed:", err);
  process.exit(1);
});
