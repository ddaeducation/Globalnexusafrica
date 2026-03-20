import {
  Home, Info, BookOpen, Briefcase, Newspaper, GraduationCap, Phone,
  Users, Mail, UserCheck, FileQuestion, Image as ImageIcon, Send,
} from "lucide-react";

export type FieldConfig = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "number";
};

export type SectionConfig = {
  key: string;
  label: string;
  fields: FieldConfig[];
};

export type PageConfig = {
  key: string;
  label: string;
  icon: any;
  sections: SectionConfig[];
};

// Helper to generate numbered item fields
const itemFields = (prefix: string, count: number, fields: { suffix: string; label: string; type: FieldConfig["type"] }[]): FieldConfig[] => {
  const result: FieldConfig[] = [];
  for (let i = 1; i <= count; i++) {
    fields.forEach((f) => {
      result.push({ key: `${prefix}${i}_${f.suffix}`, label: `Item ${i} — ${f.label}`, type: f.type });
    });
  }
  return result;
};

export const defaults: Record<string, Record<string, Record<string, string>>> = {
  home: {
    hero: {
      badge: "Empowering Africa's Tech Future",
      title_line1: "Global Nexus",
      title_line2: "Institute",
      subtitle: "Connect with future tech leaders",
      hero_image: "/images/hero-main.jpg",
    },
    stats: {
      stat1_value: "200+", stat1_label: "Students Trained",
      stat2_value: "95%", stat2_label: "Success Rate",
      stat3_value: "10+", stat3_label: "Expert Mentors",
    },
    popup: {
      title: "Call For Application!",
      subtitle: "Don't miss this opportunity to join us!",
      deadline: "Deadline: April 6, 2026",
      program_name: "Python For Data Analyst (Online)",
      details: "• Learn With our platform: www.skilla.africa\n• 4 Weeks, live online sessions\n• Led by Professional Data Analysts & Scientists\n• Live sessions Start on: April 6, 2026\n• WhatsApp: +250787406140",
      apply_url: "https://forms.gle/ReNWMuzp6vhBLaMs8",
      apply_button_text: "Apply For Python For Data Analyst",
      payment_info: "MOMOpay: 030700 | Contact: 0787406140",
    },
    vision_mission: {
      vision: "To be a transformative institution that empowers the next generation of leaders, innovators, and professionals in technology and data sciences across Africa and beyond.",
      mission: "To provide high-quality, accessible education that bridges local needs with global opportunities, creating pathways to employment, innovation, and societal impact.",
    },
    gallery: {
      img1: "/images/gallery-1.jpg",
      img2: "/images/gallery-2.jpg",
      img3: "/images/gallery-3.jpg",
      img4: "/images/gallery-4.jpg",
    },
    quicklinks: {
      ql1_title: "Apply Now", ql1_desc: "Start your journey with Global Nexus", ql1_path: "/admissions",
      ql2_title: "Scholarships", ql2_desc: "Explore funding opportunities", ql2_path: "/admissions",
      ql3_title: "Learning Portal", ql3_desc: "Access your online courses", ql3_path: "/programs",
      ql4_title: "Contact Us", ql4_desc: "Get in touch with our team", ql4_path: "/contact",
    },
  },
  about: {
    hero: {
      title: "About Global Nexus Institute",
      subtitle: "Bridging the Digital Skills Gap — Empowering the next generation of tech leaders with world-class education and hands-on experience.",
    },
    story: {
      paragraph1: "A leading institution empowering Africa's next generation of tech leaders. We bridge the digital skills gap in Rwanda and East Africa through world-class education and industry partnerships.",
      paragraph2: "We blend theory with hands-on practice to prepare students for today's tech industry. Our partnerships with leading companies and research institutions keep our curriculum cutting-edge.",
    },
    purpose: {
      card1_title: "Our Purpose", card1_text: "Bridging the digital skills gap in Rwanda and East Africa.",
      card2_title: "Our Approach", card2_text: "Combining theory with practical, hands-on industry experience.",
      card3_title: "Our Edge", card3_text: "Partnerships with leading tech companies keep us cutting-edge.",
    },
    partners: {
      p1_name: "RTB Rwanda", p1_desc: "Accredited by Rwanda TVET Board for quality technical and vocational education.", p1_img: "/images/rtb.jpg",
      p2_name: "NCC Education UK", p2_desc: "Certified programs ensuring international recognition of qualifications.", p2_img: "ncc.png",
      p3_name: "WorldQuant University", p3_desc: "Partnership coming soon — global online university for data science and quantitative finance.", p3_img: "/images/wqu.png",
      p4_name: "RMI-Rwanda", p4_desc: "Strategic partnership for professional development and industry-aligned training.", p4_img: "rmi.png",
      p5_name: "SOLVIT AFRICA", p5_desc: "Collaborations for internships, mentorship, and employment opportunities.", p5_img: "solvit.png",
      p6_name: "ICT Chamber-Rwanda", p6_desc: "Leading tech companies partnerships for mentorship and employment.", p6_img: "ict.png",
    },
    team: {
      t1_name: "Theoneste NDAYISENGA", t1_role: "Founder, CEO & Project Lead", t1_desc: "Educator, Data Scientist, and Analyst", t1_img: "theoneste.jpeg",
      t2_name: "Francis KIPKOGEI YEGO", t2_role: "Board Member & Data Scientist", t2_desc: "AI, Actuarial Scientist, Statistician", t2_img: "francis.png",
      t3_name: "Ass Prof. Innocent NGARUYE", t3_role: "Board Member & Senior Researcher", t3_desc: "Data Scientist, and Researcher", t3_img: "innocent.png",
      t4_name: "Didier NGAMIJE", t4_role: "Data Analytics Instructor", t4_desc: "Data Analyst, and Developer", t4_img: "didier.png",
      t5_name: "Dieudonne UWASE", t5_role: "Board Member & Coach", t5_desc: "Educational Technology, Business Coach", t5_img: "Uwase.jpg",
      t6_name: "Eugene MUTUYIMANA", t6_role: "Software Developer & Facilitator", t6_desc: "Software development, Data Analysis", t6_img: "eugene.jpg",
      t7_name: "Francis Muhirwa", t7_role: "Web & Graphic Designer", t7_desc: "Project management, Content Creation", t7_img: "muhirwa.png",
      t8_name: "Elizen Awuor", t8_role: "Client Experience Coordinator", t8_desc: "Customer Experience, Quality Assurance", t8_img: "elizen.jpeg",
      t9_name: "Geredi NIYIBIGIRA", t9_role: "AI Instructor", t9_desc: "Artificial Intelligence, Machine Learning", t9_img: "geredi.png",
    },
  },
  services: {
    hero: {
      title: "Professional Services",
      subtitle: "Comprehensive data solutions and actionable insights for informed business decisions.",
    },
    services_list: {
      s1_title: "Training Enumerators", s1_desc: "Comprehensive training covering survey methodologies, data quality protocols, and ethical guidelines with hands-on practice.",
      s2_title: "Data Collection", s2_desc: "Cutting-edge digital tools and methodologies with rigorous quality control across various sectors.",
      s3_title: "Data Processing", s3_desc: "Advanced cleaning algorithms, statistical validation, and quality assurance for meaningful insights.",
      s4_title: "Report Writing", s4_desc: "Complex data transformed into clear, actionable insights with visual representations and recommendations.",
      s5_title: "Internship", s5_desc: "Academic and professional internships in Data Analytics, Data Science, and Software Development.",
      s6_title: "Interns to Companies", s6_desc: "Connecting companies with skilled interns proficient in data analytics, ML, and software development.",
    },
    cta: {
      title: "Ready to Get Started?",
      subtitle: "Contact us to discuss your project requirements and how we can help you achieve your goals.",
    },
  },
  news: {
    hero: {
      title: "News & Events",
      subtitle: "Stay updated with the latest happenings at Global Nexus Institute.",
    },
    news_items: {
      n1_title: "New Partnership with ASSA (University of Rwanda)", n1_date: "March 15, 2024", n1_desc: "Global Nexus announces strategic partnerships with University of Rwanda Students to enhance student opportunities...", n1_image: "team.jpeg", n1_link: "https://www.linkedin.com/pulse/global-nexus-institute-updates-global-nexus-institute-nunyf/",
      n2_title: "Data Analytics & Data Science in-person Training", n2_date: "September 15, 2024", n2_desc: "Global Nexus Institute we don't keep all of our training online, we do meet in-person, cheer and discuss more.", n2_image: "team1.jpeg", n2_link: "https://www.linkedin.com/feed/update/urn:li:activity:7289945115026989056/",
      n3_title: "Student at Tech Innovation GIZ learning facilities", n3_date: "August 21, 2024", n3_desc: "Our students secured top positions at the Innovation Challenge, highlighting that learning and collaboration are key to success.", n3_image: "learning.jpeg", n3_link: "#",
      n4_title: "Student Success at Tech Innovation Challenge", n4_date: "June 10, 2024", n4_desc: "Our students secured a meeting with the Business Manager at the National Computing Center (UK).", n4_image: "studing.jpeg", n4_link: "#",
    },
    testimonials: {
      t1_name: "Didier NGAMIJE", t1_role: "Data Analyst at Ganza Africa", t1_quote: "The Data Science course completely transformed my career. Within 3 months of graduation, I landed my first job at Ganza Africa.", t1_img: "didier.png",
      t2_name: "Samuelson MUKIZA", t2_role: "Student at University of Rwanda", t2_quote: "I am excited to have completed the Python for Data Science course at GNI, gaining invaluable skills. I highly recommend this course.", t2_img: "samuelson.jpg",
      t3_name: "Samuel KIPKOGEI", t3_role: "Data Analyst Intern", t3_quote: "Thanks to the Data Analytics program, I transitioned from statistics to a data analytics career successfully.", t3_img: "samuel.png",
    },
  },
  admissions: {
    hero: {
      title: "Admissions Process",
      subtitle: "Begin your journey towards a successful career in technology.",
    },
    steps: {
      step1_title: "Submit Application", step1_desc: "Complete the online application form with your personal and academic information.",
      step2_title: "Document Review", step2_desc: "Our admissions team will review your application and supporting documents.",
      step3_title: "Interview", step3_desc: "Selected candidates will be invited for an interview with faculty members.",
    },
    scholarships: {
      s1_title: "Merit Scholarships", s1_desc: "Available for outstanding academic achievers, covering up to 30% of tuition fees.",
      s2_title: "Installment Plans", s2_desc: "Flexible payment options available to help manage your educational investment.",
      s3_title: "Pay Upfront & Save", s3_desc: "Pay your full tuition before the program starts and receive an exclusive early-bird discount on your fees.",
    },
  },
  contact: {
    hero: {
      title: "Contact Us",
      subtitle: "Get in touch for inquiries about programs, admissions, or partnerships.",
    },
    info: {
      address: "Kigali, Rwanda\nKN 78 St, Norrsken House",
      email: "info@globalnexus.africa",
      phone: "+250 787 406 140\n+254 707 825 181",
    },
    social: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
    donation: {
      heading: "Support Our Mission",
      description: "Help us provide education to underrepresented groups including females, young mothers, and people with disabilities.",
      payment_url: "https://flutterwave.com/pay/8atwd1q3u556",
      impact1: "Fund scholarships for deserving students",
      impact2: "Support educational resources and equipment",
      impact3: "Enable impactful mentorship programs",
      impact4: "Create opportunities for vulnerable communities",
    },
  },
};

export const pages: PageConfig[] = [
  {
    key: "home", label: "Home Page", icon: Home,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "badge", label: "Badge Text", type: "text" },
        { key: "title_line1", label: "Title Line 1", type: "text" },
        { key: "title_line2", label: "Title Line 2", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "text" },
        { key: "hero_image", label: "Hero Background Image URL", type: "url" },
      ]},
      { key: "stats", label: "Statistics", fields: [
        { key: "stat1_value", label: "Stat 1 Value", type: "text" },
        { key: "stat1_label", label: "Stat 1 Label", type: "text" },
        { key: "stat2_value", label: "Stat 2 Value", type: "text" },
        { key: "stat2_label", label: "Stat 2 Label", type: "text" },
        { key: "stat3_value", label: "Stat 3 Value", type: "text" },
        { key: "stat3_label", label: "Stat 3 Label", type: "text" },
      ]},
      { key: "popup", label: "Application Popup", fields: [
        { key: "title", label: "Popup Title", type: "text" },
        { key: "subtitle", label: "Popup Subtitle", type: "text" },
        { key: "deadline", label: "Deadline", type: "text" },
        { key: "program_name", label: "Program Name", type: "text" },
        { key: "details", label: "Details (one per line)", type: "textarea" },
        { key: "apply_url", label: "Apply URL", type: "url" },
        { key: "apply_button_text", label: "Apply Button Text", type: "text" },
        { key: "payment_info", label: "Payment Info Line", type: "text" },
      ]},
      { key: "vision_mission", label: "Vision & Mission", fields: [
        { key: "vision", label: "Vision Text", type: "textarea" },
        { key: "mission", label: "Mission Text", type: "textarea" },
      ]},
      { key: "gallery", label: "Gallery Images", fields: [
        { key: "img1", label: "Gallery Image 1 URL", type: "url" },
        { key: "img2", label: "Gallery Image 2 URL", type: "url" },
        { key: "img3", label: "Gallery Image 3 URL", type: "url" },
        { key: "img4", label: "Gallery Image 4 URL", type: "url" },
      ]},
      { key: "quicklinks", label: "Quick Links", fields: [
        ...itemFields("ql", 4, [
          { suffix: "title", label: "Title", type: "text" },
          { suffix: "desc", label: "Description", type: "text" },
          { suffix: "path", label: "Link Path", type: "text" },
        ]),
      ]},
    ],
  },
  {
    key: "about", label: "About Page", icon: Info,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "story", label: "Who We Are / How We Teach", fields: [
        { key: "paragraph1", label: "Who We Are", type: "textarea" },
        { key: "paragraph2", label: "How We Teach", type: "textarea" },
      ]},
      { key: "purpose", label: "Purpose Cards (3)", fields: [
        ...itemFields("card", 3, [
          { suffix: "title", label: "Title", type: "text" },
          { suffix: "text", label: "Description", type: "textarea" },
        ]),
      ]},
      { key: "partners", label: "Partners & Accreditation (6)", fields: [
        ...itemFields("p", 6, [
          { suffix: "name", label: "Name", type: "text" },
          { suffix: "desc", label: "Description", type: "text" },
          { suffix: "img", label: "Image (URL or /images/...)", type: "text" },
        ]),
      ]},
      { key: "team", label: "Team Members (9)", fields: [
        ...itemFields("t", 9, [
          { suffix: "name", label: "Name", type: "text" },
          { suffix: "role", label: "Role", type: "text" },
          { suffix: "desc", label: "Bio", type: "text" },
          { suffix: "img", label: "Photo filename or URL", type: "text" },
        ]),
      ]},
    ],
  },
  {
    key: "services", label: "Services", icon: Briefcase,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "services_list", label: "Service Cards (6)", fields: [
        ...itemFields("s", 6, [
          { suffix: "title", label: "Title", type: "text" },
          { suffix: "desc", label: "Description", type: "textarea" },
        ]),
      ]},
      { key: "cta", label: "CTA Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
    ],
  },
  {
    key: "news", label: "News & Events", icon: Newspaper,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "news_items", label: "News Articles (4)", fields: [
        ...itemFields("n", 4, [
          { suffix: "title", label: "Title", type: "text" },
          { suffix: "date", label: "Date", type: "text" },
          { suffix: "desc", label: "Description", type: "textarea" },
          { suffix: "image", label: "Image filename", type: "text" },
          { suffix: "link", label: "Link URL", type: "url" },
        ]),
      ]},
      { key: "testimonials", label: "Testimonials (3)", fields: [
        ...itemFields("t", 3, [
          { suffix: "name", label: "Name", type: "text" },
          { suffix: "role", label: "Role/Title", type: "text" },
          { suffix: "quote", label: "Quote", type: "textarea" },
          { suffix: "img", label: "Photo filename", type: "text" },
        ]),
      ]},
    ],
  },
  {
    key: "admissions", label: "Admissions", icon: GraduationCap,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "steps", label: "Application Steps (3)", fields: [
        ...itemFields("step", 3, [
          { suffix: "title", label: "Title", type: "text" },
          { suffix: "desc", label: "Description", type: "textarea" },
        ]),
      ]},
      { key: "scholarships", label: "Scholarships (3)", fields: [
        ...itemFields("s", 3, [
          { suffix: "title", label: "Title", type: "text" },
          { suffix: "desc", label: "Description", type: "textarea" },
        ]),
      ]},
    ],
  },
  {
    key: "contact", label: "Contact", icon: Phone,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "info", label: "Contact Info", fields: [
        { key: "address", label: "Address", type: "textarea" },
        { key: "email", label: "Email", type: "text" },
        { key: "phone", label: "Phone Numbers", type: "textarea" },
      ]},
      { key: "social", label: "Social Media Links", fields: [
        { key: "facebook", label: "Facebook URL", type: "url" },
        { key: "linkedin", label: "LinkedIn URL", type: "url" },
        { key: "twitter", label: "Twitter / X URL", type: "url" },
        { key: "instagram", label: "Instagram URL", type: "url" },
      ]},
      { key: "donation", label: "Donation Section", fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "payment_url", label: "Payment URL", type: "url" },
        { key: "impact1", label: "Impact Item 1", type: "text" },
        { key: "impact2", label: "Impact Item 2", type: "text" },
        { key: "impact3", label: "Impact Item 3", type: "text" },
        { key: "impact4", label: "Impact Item 4", type: "text" },
      ]},
    ],
  },
  {
    key: "programs", label: "Programs", icon: BookOpen,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
    ],
  },
  // Non-content management pages
  { key: "applications", label: "Applications", icon: Users, sections: [] },
  { key: "messages", label: "Messages", icon: Mail, sections: [] },
  { key: "subscribers", label: "Subscribers", icon: UserCheck, sections: [] },
  { key: "form-questions", label: "Form Questions", icon: FileQuestion, sections: [] },
  { key: "images", label: "Images", icon: ImageIcon, sections: [] },
  { key: "send-message", label: "Send Message", icon: Send, sections: [] },
];
