import { useState, useEffect } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { saveSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AdminProgramManager from "@/components/AdminProgramManager";
import AdminApplications from "@/components/AdminApplications";
import AdminMessages from "@/components/AdminMessages";
import AdminSubscribers from "@/components/AdminSubscribers";
import AdminFormQuestions from "@/components/AdminFormQuestions";
import AdminImageManager from "@/components/AdminImageManager";
import AdminSendMessage from "@/components/AdminSendMessage";
import AdminListEditor, { FieldDef } from "@/components/AdminListEditor";
import {
  LogOut, Home, Info, BookOpen, Briefcase, Newspaper, GraduationCap, Phone,
  Save, Loader2, ChevronRight, Users, Mail, UserCheck, FileQuestion, Image as ImageIcon, Send,
  Menu, X, FlaskConical, Star, Building2, Handshake, HelpCircle, Heart, Monitor
} from "lucide-react";

type PageConfig = {
  key: string;
  label: string;
  icon: any;
  sections: SectionConfig[];
};

type SectionConfig = {
  key: string;
  label: string;
  fields: FieldConfig[];
};

type FieldConfig = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "number" | "json-array";
  defaultValue?: string;
};

const defaults: Record<string, Record<string, Record<string, string>>> = {
  home: {
    hero: {
      badge: "Empowering Africa's Tech Future",
      title_line1: "Global Nexus",
      title_line2: "Institute",
      subtitle: "Connect with future tech leaders",
      hero_image: "https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images/hello.avif",
      explore_text: "Explore Programs",
      elearning_text: "Our eLearning",
      elearning_url: "https://skilla.africa/",
      instructor_text: "Become an Instructor",
      instructor_url: "https://skilla.africa/auth?redirect=/become-instructor",
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
      momopay: "030700",
      whatsapp: "250787406140",
    },
    vision_mission: {
      section_title: "Our Vision & Mission",
      section_subtitle: "Shaping the future of technology education in Africa",
      vision: "To be a transformative institution that empowers the next generation of leaders, innovators, and professionals in technology and data sciences across Africa and beyond.",
      mission: "To provide high-quality, accessible education that bridges local needs with global opportunities, creating pathways to employment, innovation, and societal impact.",
    },
    gallery: {
      section_title: "Our Team & Students",
      section_subtitle: "Our team brings together diverse talents and expertise.",
    },
    quick_links: {
      link1_title: "Apply Now", link1_desc: "Start your journey with Global Nexus",
      link2_title: "Scholarships", link2_desc: "Explore funding opportunities",
      link3_title: "Learning Portal", link3_desc: "Access your online courses",
      link4_title: "Contact Us", link4_desc: "Get in touch with our team",
    },
  },
  about: {
    hero: {
      title: "About Global Nexus Institute",
      subtitle: "Bridging the Digital Skills Gap — Empowering the next generation of tech leaders with world-class education and hands-on experience.",
    },
    story: {
      paragraph1: "Global Nexus Institute is a leading educational institution dedicated to empowering the next generation of technology leaders. Founded with the vision of bridging the digital skills gap in Rwanda and East Africa, we provide world-class education in partnership with industry leaders.",
      paragraph2: "Our institute combines theoretical knowledge with practical, hands-on experience to prepare students for the demands of the modern tech industry. Through our partnerships with leading technology companies and research institutions, we ensure our curriculum remains cutting-edge and relevant.",
    },
    values: {
      purpose_title: "Our Purpose", purpose_text: "Bridging the digital skills gap in Rwanda and East Africa.",
      approach_title: "Our Approach", approach_text: "Combining theory with practical, hands-on industry experience.",
      edge_title: "Our Edge", edge_text: "Partnerships with leading tech companies keep us cutting-edge.",
    },
    sections: {
      partners_title: "Accreditation & Partnerships",
      partners_subtitle: "Globally recognized certifications and industry partnerships",
      team_title: "Our Passionate Team",
      team_subtitle: "Meet the experts driving innovation and excellence",
    },
  },
  programs: {
    hero: {
      title: "Professional Programs",
      subtitle: "Comprehensive programs designed to prepare you for success in the data-driven world.",
    },
  },
  services: {
    hero: {
      title: "Professional Services",
      subtitle: "Comprehensive data solutions and actionable insights for informed business decisions.",
    },
    cta: {
      title: "Ready to Get Started?",
      subtitle: "Contact us to discuss your project requirements and how we can help you achieve your goals.",
    },
  },
  research: {
    hero: {
      title: "Research",
      subtitle: "Driving innovation through applied research and collaboration across Africa's tech ecosystem.",
    },
    sections: {
      focus_title: "Our Research Focus",
      focus_subtitle: "We conduct impactful research that bridges the gap between academia and industry.",
    },
    cta: {
      title: "Collaborate With Us",
      subtitle: "We welcome partnerships with universities, organizations, and researchers. Get in touch to explore opportunities.",
      button_text: "Contact Our Team",
    },
  },
  news: {
    hero: {
      title: "News & Events",
      subtitle: "Stay updated with the latest happenings at Global Nexus Institute.",
    },
    sections: {
      news_title: "Latest News",
      news_subtitle: "Updates, events, and achievements from our community",
      stories_title: "Success Stories",
      stories_subtitle: "Hear from graduates who transformed their careers",
    },
  },
  admissions: {
    hero: {
      title: "Admissions Process",
      subtitle: "Begin your journey towards a successful career in technology.",
    },
    apply: {
      apply_url: "https://forms.gle/B1vbHxjXeQMt4hDx9",
    },
    sections: {
      steps_title: "How to Apply",
      steps_subtitle: "Three simple steps to start your tech career",
      scholarships_title: "Scholarships & Financial Aid",
      scholarships_subtitle: "We're committed to making education accessible",
      faq_title: "Frequently Asked Questions",
      faq_subtitle: "Find answers to common questions about our admissions",
    },
    scholarship1: {
      title: "Merit Scholarships",
      description: "Available for outstanding academic achievers, covering up to 30% of tuition fees.",
    },
    scholarship2: {
      title: "Installment Plans",
      description: "Flexible payment options available to help manage your educational investment.",
    },
    scholarship3: {
      title: "Pay Upfront & Save",
      description: "Pay your full tuition before the program starts and receive an exclusive early-bird discount on your fees.",
    },
    faq: {
      faq1_q: "What are the entry requirements?",
      faq1_a: "Requirements vary by program. Generally, you need a high school diploma or equivalent. Some advanced programs may require prior experience or coursework in related fields.",
      faq2_q: "How long do the programs take?",
      faq2_a: "Program duration ranges from 4 weeks for short courses to several months for comprehensive certifications. Each program page lists the specific duration.",
      faq3_q: "Are classes online or in-person?",
      faq3_a: "We offer both online and in-person training options. Our online programs are delivered through our eLearning platform (skilla.africa) with live sessions, while in-person sessions are held at our Kigali campus.",
      faq4_q: "What payment methods are accepted?",
      faq4_a: "We accept MoMo Pay, bank transfers, and online payments through our payment portal. Installment plans are available for most programs.",
      faq5_q: "Do you offer certificates upon completion?",
      faq5_a: "Yes! All graduates receive a certificate of completion. Our programs accredited by RTB Rwanda and NCC Education UK carry internationally recognized certifications.",
      faq6_q: "Can I apply for multiple programs?",
      faq6_a: "Yes, you can apply for multiple programs. However, we recommend focusing on one program at a time to maximize your learning experience.",
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
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
    },
    donation: {
      donation_url: "https://flutterwave.com/pay/8atwd1q3u556",
    },
    mission: {
      title: "Support Our Mission",
      description: "Help us provide education to underrepresented groups including females, young mothers, and people with disabilities. Your contribution directly impacts lives and creates lasting change in communities across Africa.",
      impact_title: "Your Impact",
      impact_items: "Fund scholarships for deserving students, Support educational resources and equipment, Enable impactful mentorship programs, Create opportunities for vulnerable communities, Provide access to modern technology and tools, Empower women and youth through digital skills",
    },
    donation_card: {
      title: "Make a Donation",
      subtitle: "Choose an amount or enter a custom value below.",
    },
  },
  footer: {
    contact: {
      address: "Kigali, Rwanda — Norrsken House",
      email: "info@globalnexus.africa",
      phone1: "+250 787 406 140",
      phone2: "+254 707 825 181",
      whatsapp: "250787406140",
    },
    highlights: {
      item1: "Master key tech skills",
      item2: "Connect with tech leaders",
      item3: "Soft skills & job readiness",
    },
    seal: {
      seal_image: "https://www.globalnexus.africa/images/seal.png",
      seal_link: "https://certification.dbi.rw/public?name=Global Nexus Institute Ltd",
    },
    newsletter: {
      heading: "Stay Updated",
      description: "Subscribe to receive updates and opportunities.",
      button_text: "Subscribe",
      placeholder: "Enter your email",
    },
  },
  whyus: {
    hero: {
      title: "Why Choose Us",
      subtitle: "What sets Global Nexus Institute apart as your partner in tech education.",
    },
    stats: {
      stat1_value: "200+", stat1_label: "Students Trained",
      stat2_value: "95%", stat2_label: "Completion Rate",
      stat3_value: "10+", stat3_label: "Expert Mentors",
      stat4_value: "5+", stat4_label: "Programs Offered",
    },
    sections: {
      reasons_title: "Why Global Nexus?",
      reasons_subtitle: "Six compelling reasons to start your journey with us",
      track_title: "Our Track Record",
      track_desc: "With a 95% success rate and over 200 students trained, Global Nexus Institute has established itself as a trusted partner for individuals and organizations seeking quality tech education in Africa.",
    },
  },
  career: {
    hero: {
      title: "Career Pathways",
      subtitle: "Launch or advance your tech career with guidance from Global Nexus Institute.",
    },
    sections: {
      paths_title: "Career Paths We Prepare You For",
      paths_subtitle: "Our programs are designed to lead directly into high-demand tech roles",
      openings_title: "Current Openings",
      openings_subtitle: "Join our team and make a difference in tech education",
      cta_title: "Don't See a Fit?",
      cta_desc: "We're always looking for passionate people. Send us your CV and we'll keep you in mind for future opportunities.",
    },
  },
  corporate: {
    hero: {
      title: "Corporate Solutions",
      subtitle: "Empowering organizations with data-driven talent and skills.",
    },
    sections: {
      offerings_title: "What We Offer",
      offerings_subtitle: "Comprehensive solutions for your organization's growth",
      partner_title: "Why Partner With Us?",
      proposal_title: "Get a Custom Proposal",
      proposal_desc: "Tell us about your team's needs and we'll design a tailored program with clear outcomes and competitive pricing.",
    },
  },
  collaborate: {
    hero: {
      title: "Collaborate With Us",
      subtitle: "Together we can transform tech education and create lasting impact across Africa.",
    },
    sections: {
      partners_title: "Partnership Opportunities",
      partners_subtitle: "Multiple ways to partner and make a difference",
      cta_title: "Let's Build Together",
      cta_desc: "Whether you're a university, business, NGO, or government agency — we'd love to explore how we can create value together. Reach out to start a conversation.",
    },
  },
  faqs_page: {
    hero: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our programs, admissions, and more.",
    },
    sections: {
      cta_title: "Still Have Questions?",
      cta_desc: "Can't find what you're looking for? Reach out to our team and we'll be happy to help.",
    },
  },
  donate: {
    hero: {
      title: "Support Our Mission",
      subtitle: "Your contribution directly impacts lives and creates lasting change in communities across Africa.",
    },
    sections: {
      impact_title: "Where Your Donation Goes",
      impact_subtitle: "Every contribution creates real, measurable impact",
      your_impact_title: "Your Impact",
      card_title: "Make a Donation",
      card_subtitle: "Choose an amount or enter a custom value below.",
    },
  },
  elearning: {
    settings: {
      iframe_url: "https://skilla.africa/",
      back_label: "Portal",
    },
  },
};

const pages: PageConfig[] = [
  {
    key: "home", label: "Home Page", icon: Home,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "badge", label: "Badge Text", type: "text" },
        { key: "title_line1", label: "Title Line 1", type: "text" },
        { key: "title_line2", label: "Title Line 2", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "text" },
        { key: "hero_image", label: "Hero Background Image URL", type: "url" },
        { key: "explore_text", label: "Explore Button Text", type: "text" },
        { key: "elearning_text", label: "eLearning Button Text", type: "text" },
        { key: "elearning_url", label: "eLearning URL", type: "url" },
        { key: "instructor_text", label: "Instructor Button Text", type: "text" },
        { key: "instructor_url", label: "Instructor URL", type: "url" },
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
        { key: "momopay", label: "MoMo Pay Code", type: "text" },
        { key: "whatsapp", label: "WhatsApp Number (no +)", type: "text" },
      ]},
      { key: "vision_mission", label: "Vision & Mission", fields: [
        { key: "section_title", label: "Section Title", type: "text" },
        { key: "section_subtitle", label: "Section Subtitle", type: "text" },
        { key: "vision", label: "Vision Text", type: "textarea" },
        { key: "mission", label: "Mission Text", type: "textarea" },
      ]},
      { key: "gallery", label: "Gallery Section", fields: [
        { key: "section_title", label: "Section Title", type: "text" },
        { key: "section_subtitle", label: "Section Subtitle", type: "text" },
      ]},
      { key: "quick_links", label: "Quick Links", fields: [
        { key: "link1_title", label: "Link 1 Title", type: "text" },
        { key: "link1_desc", label: "Link 1 Description", type: "text" },
        { key: "link2_title", label: "Link 2 Title", type: "text" },
        { key: "link2_desc", label: "Link 2 Description", type: "text" },
        { key: "link3_title", label: "Link 3 Title", type: "text" },
        { key: "link3_desc", label: "Link 3 Description", type: "text" },
        { key: "link4_title", label: "Link 4 Title", type: "text" },
        { key: "link4_desc", label: "Link 4 Description", type: "text" },
      ]},
    ],
  },
  { key: "home-gallery", label: "Home Gallery", icon: ImageIcon, sections: [] },
  {
    key: "about", label: "About Page", icon: Info,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "story", label: "Our Story", fields: [
        { key: "paragraph1", label: "Who We Are", type: "textarea" },
        { key: "paragraph2", label: "How We Teach", type: "textarea" },
      ]},
      { key: "values", label: "Value Cards", fields: [
        { key: "purpose_title", label: "Card 1 Title", type: "text" },
        { key: "purpose_text", label: "Card 1 Text", type: "text" },
        { key: "approach_title", label: "Card 2 Title", type: "text" },
        { key: "approach_text", label: "Card 2 Text", type: "text" },
        { key: "edge_title", label: "Card 3 Title", type: "text" },
        { key: "edge_text", label: "Card 3 Text", type: "text" },
      ]},
      { key: "sections", label: "Section Titles", fields: [
        { key: "partners_title", label: "Partners Section Title", type: "text" },
        { key: "partners_subtitle", label: "Partners Section Subtitle", type: "text" },
        { key: "team_title", label: "Team Section Title", type: "text" },
        { key: "team_subtitle", label: "Team Section Subtitle", type: "text" },
      ]},
    ],
  },
  { key: "about-team", label: "Team Members", icon: Users, sections: [] },
  { key: "about-partners", label: "Partners", icon: Users, sections: [] },
  {
    key: "programs", label: "Programs", icon: BookOpen,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
    ],
  },
  {
    key: "services", label: "Services Page", icon: Briefcase,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "cta", label: "CTA Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
    ],
  },
  { key: "services-list", label: "Services List", icon: Briefcase, sections: [] },
  {
    key: "research", label: "Research Page", icon: FlaskConical,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "sections", label: "Section Titles", fields: [
        { key: "focus_title", label: "Focus Section Title", type: "text" },
        { key: "focus_subtitle", label: "Focus Section Subtitle", type: "text" },
      ]},
      { key: "cta", label: "CTA Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
        { key: "button_text", label: "Button Text", type: "text" },
      ]},
    ],
  },
  { key: "research-areas", label: "Research Areas", icon: FlaskConical, sections: [] },
  {
    key: "news", label: "News Page", icon: Newspaper,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "sections", label: "Section Titles", fields: [
        { key: "news_title", label: "News Section Title", type: "text" },
        { key: "news_subtitle", label: "News Section Subtitle", type: "text" },
        { key: "stories_title", label: "Stories Section Title", type: "text" },
        { key: "stories_subtitle", label: "Stories Section Subtitle", type: "text" },
      ]},
    ],
  },
  { key: "news-items", label: "News Items", icon: Newspaper, sections: [] },
  { key: "testimonials", label: "Testimonials", icon: Mail, sections: [] },
  {
    key: "admissions", label: "Admissions", icon: GraduationCap,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "apply", label: "Apply Section", fields: [
        { key: "apply_url", label: "Application Form URL", type: "url" },
      ]},
      { key: "sections", label: "Section Titles", fields: [
        { key: "steps_title", label: "Steps Section Title", type: "text" },
        { key: "steps_subtitle", label: "Steps Section Subtitle", type: "text" },
        { key: "scholarships_title", label: "Scholarships Section Title", type: "text" },
        { key: "scholarships_subtitle", label: "Scholarships Section Subtitle", type: "text" },
        { key: "faq_title", label: "FAQ Section Title", type: "text" },
        { key: "faq_subtitle", label: "FAQ Section Subtitle", type: "text" },
      ]},
      { key: "scholarship1", label: "Scholarship Card 1", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
      ]},
      { key: "scholarship2", label: "Scholarship Card 2", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
      ]},
      { key: "scholarship3", label: "Scholarship Card 3", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
      ]},
      { key: "faq", label: "FAQ Content", fields: [
        { key: "faq1_q", label: "FAQ 1 Question", type: "text" },
        { key: "faq1_a", label: "FAQ 1 Answer", type: "textarea" },
        { key: "faq2_q", label: "FAQ 2 Question", type: "text" },
        { key: "faq2_a", label: "FAQ 2 Answer", type: "textarea" },
        { key: "faq3_q", label: "FAQ 3 Question", type: "text" },
        { key: "faq3_a", label: "FAQ 3 Answer", type: "textarea" },
        { key: "faq4_q", label: "FAQ 4 Question", type: "text" },
        { key: "faq4_a", label: "FAQ 4 Answer", type: "textarea" },
        { key: "faq5_q", label: "FAQ 5 Question", type: "text" },
        { key: "faq5_a", label: "FAQ 5 Answer", type: "textarea" },
        { key: "faq6_q", label: "FAQ 6 Question", type: "text" },
        { key: "faq6_a", label: "FAQ 6 Answer", type: "textarea" },
      ]},
    ],
  },
  { key: "admissions-steps", label: "Admission Steps", icon: GraduationCap, sections: [] },
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
        { key: "twitter", label: "Twitter/X URL", type: "url" },
        { key: "instagram", label: "Instagram URL", type: "url" },
      ]},
      { key: "donation", label: "Donation Settings", fields: [
        { key: "donation_url", label: "Donation Payment URL", type: "url" },
      ]},
      { key: "mission", label: "Support Our Mission", fields: [
        { key: "title", label: "Section Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "impact_title", label: "Impact Card Title", type: "text" },
        { key: "impact_items", label: "Impact Items (comma-separated)", type: "textarea" },
      ]},
      { key: "donation_card", label: "Donation Card", fields: [
        { key: "title", label: "Card Title", type: "text" },
        { key: "subtitle", label: "Card Subtitle", type: "text" },
      ]},
    ],
  },
  {
    key: "footer", label: "Footer", icon: Phone,
    sections: [
      { key: "contact", label: "Footer Contact Info", fields: [
        { key: "address", label: "Address", type: "text" },
        { key: "email", label: "Email", type: "text" },
        { key: "phone1", label: "Phone 1 (WhatsApp)", type: "text" },
        { key: "phone2", label: "Phone 2", type: "text" },
        { key: "whatsapp", label: "WhatsApp Number (no +)", type: "text" },
      ]},
      { key: "highlights", label: "Footer Highlights", fields: [
        { key: "item1", label: "Highlight 1", type: "text" },
        { key: "item2", label: "Highlight 2", type: "text" },
        { key: "item3", label: "Highlight 3", type: "text" },
      ]},
      { key: "seal", label: "Certification Seal", fields: [
        { key: "seal_image", label: "Seal Image URL", type: "url" },
        { key: "seal_link", label: "Seal Link URL", type: "url" },
      ]},
      { key: "newsletter", label: "Newsletter Section", fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "description", label: "Description", type: "text" },
        { key: "button_text", label: "Button Text", type: "text" },
        { key: "placeholder", label: "Input Placeholder", type: "text" },
      ]},
    ],
  },
  { key: "footer-links", label: "Footer Links", icon: Phone, sections: [] },
  {
    key: "whyus", label: "Why Us", icon: Star,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "stats", label: "Statistics", fields: [
        { key: "stat1_value", label: "Stat 1 Value", type: "text" },
        { key: "stat1_label", label: "Stat 1 Label", type: "text" },
        { key: "stat2_value", label: "Stat 2 Value", type: "text" },
        { key: "stat2_label", label: "Stat 2 Label", type: "text" },
        { key: "stat3_value", label: "Stat 3 Value", type: "text" },
        { key: "stat3_label", label: "Stat 3 Label", type: "text" },
        { key: "stat4_value", label: "Stat 4 Value", type: "text" },
        { key: "stat4_label", label: "Stat 4 Label", type: "text" },
      ]},
      { key: "sections", label: "Section Titles", fields: [
        { key: "reasons_title", label: "Reasons Section Title", type: "text" },
        { key: "reasons_subtitle", label: "Reasons Section Subtitle", type: "text" },
        { key: "track_title", label: "Track Record Title", type: "text" },
        { key: "track_desc", label: "Track Record Description", type: "textarea" },
      ]},
    ],
  },
  { key: "whyus-reasons", label: "Why Us Reasons", icon: Star, sections: [] },
  {
    key: "career", label: "Career", icon: Briefcase,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "sections", label: "Section Titles", fields: [
        { key: "paths_title", label: "Career Paths Title", type: "text" },
        { key: "paths_subtitle", label: "Career Paths Subtitle", type: "text" },
        { key: "openings_title", label: "Openings Title", type: "text" },
        { key: "openings_subtitle", label: "Openings Subtitle", type: "text" },
        { key: "cta_title", label: "CTA Title", type: "text" },
        { key: "cta_desc", label: "CTA Description", type: "textarea" },
      ]},
    ],
  },
  { key: "career-paths", label: "Career Paths", icon: Briefcase, sections: [] },
  { key: "career-openings", label: "Job Openings", icon: Briefcase, sections: [] },
  {
    key: "corporate", label: "Corporate", icon: Building2,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "sections", label: "Section Titles", fields: [
        { key: "offerings_title", label: "Offerings Title", type: "text" },
        { key: "offerings_subtitle", label: "Offerings Subtitle", type: "text" },
        { key: "partner_title", label: "Partner Section Title", type: "text" },
        { key: "proposal_title", label: "Proposal Card Title", type: "text" },
        { key: "proposal_desc", label: "Proposal Card Description", type: "textarea" },
      ]},
    ],
  },
  { key: "corporate-offerings", label: "Corporate Offerings", icon: Building2, sections: [] },
  { key: "corporate-benefits", label: "Corporate Benefits", icon: Building2, sections: [] },
  {
    key: "collaborate", label: "Collaborate", icon: Handshake,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "sections", label: "Section Titles", fields: [
        { key: "partners_title", label: "Partners Title", type: "text" },
        { key: "partners_subtitle", label: "Partners Subtitle", type: "text" },
        { key: "cta_title", label: "CTA Title", type: "text" },
        { key: "cta_desc", label: "CTA Description", type: "textarea" },
      ]},
    ],
  },
  { key: "collaborate-types", label: "Partner Types", icon: Handshake, sections: [] },
  {
    key: "faqs_page", label: "FAQs Page", icon: HelpCircle,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "sections", label: "Section Titles", fields: [
        { key: "cta_title", label: "CTA Title", type: "text" },
        { key: "cta_desc", label: "CTA Description", type: "textarea" },
      ]},
    ],
  },
  { key: "faqs-categories", label: "FAQ Categories", icon: HelpCircle, sections: [] },
  {
    key: "donate", label: "Donate", icon: Heart,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "sections", label: "Section Titles", fields: [
        { key: "impact_title", label: "Impact Section Title", type: "text" },
        { key: "impact_subtitle", label: "Impact Section Subtitle", type: "text" },
        { key: "your_impact_title", label: "Your Impact Title", type: "text" },
        { key: "card_title", label: "Donation Card Title", type: "text" },
        { key: "card_subtitle", label: "Donation Card Subtitle", type: "text" },
      ]},
    ],
  },
  { key: "donate-areas", label: "Donation Impact Areas", icon: Heart, sections: [] },
  { key: "donate-items", label: "Impact Items", icon: Heart, sections: [] },
  {
    key: "elearning", label: "eLearning Portal", icon: Monitor,
    sections: [
      { key: "settings", label: "Portal Settings", fields: [
        { key: "iframe_url", label: "eLearning Platform URL", type: "url" },
        { key: "back_label", label: "Back Button Label", type: "text" },
      ]},
    ],
  },
  { key: "applications", label: "Applications", icon: Users, sections: [] },
  { key: "messages", label: "Messages", icon: Mail, sections: [] },
  { key: "subscribers", label: "Subscribers", icon: UserCheck, sections: [] },
  { key: "form-questions", label: "Form Questions", icon: FileQuestion, sections: [] },
  { key: "images", label: "Images", icon: ImageIcon, sections: [] },
  { key: "send-message", label: "Send Message", icon: Send, sections: [] },
];

// Default data for list editors
const IMG_BASE = "https://www.globalnexus.africa/images";

const defaultTeam = [
  { name: "Theoneste NDAYISENGA", role: "Founder, CEO & Project Lead", desc: "Educator, Data Scientist, and Analyst", img: `${IMG_BASE}/theoneste.jpeg` },
  { name: "Francis KIPKOGEI YEGO", role: "Board Member & Data Scientist", desc: "AI, Actuarial Scientist, Statistician", img: `${IMG_BASE}/francis.png` },
  { name: "Ass Prof. Innocent NGARUYE", role: "Board Member & Senior Researcher", desc: "Data Scientist, and Researcher", img: `${IMG_BASE}/innocent.png` },
  { name: "Didier NGAMIJE", role: "Data Analytics Instructor", desc: "Data Analyst, and Developer", img: `${IMG_BASE}/didier.png` },
  { name: "Dieudonne UWASE", role: "Board Member & Coach", desc: "Educational Technology, Business Coach", img: `${IMG_BASE}/Uwase.jpg` },
  { name: "Eugene MUTUYIMANA", role: "Software Developer & Facilitator", desc: "Software development, Data Analysis", img: `${IMG_BASE}/eugene.jpg` },
  { name: "Francis Muhirwa", role: "Web & Graphic Designer", desc: "Project management, Content Creation", img: `${IMG_BASE}/muhirwa.png` },
  { name: "Joie Sophia UMUHOZA", role: "Marketing & Project Manager", desc: "Marketing, Project Experience", img: "/images/sophia.jpeg" },
  { name: "Geredi NIYIBIGIRA", role: "AI & Data Science Instructor", desc: "Artificial Intelligence, Machine Learning", img: `${IMG_BASE}/geredi.png` },
];

const defaultPartners = [
  { name: "RTB Rwanda", desc: "Accredited by Rwanda TVET Board for quality technical and vocational education.", img: "/images/rtb.jpg" },
  { name: "NCC Education UK", desc: "Certified programs ensuring international recognition of qualifications.", img: `${IMG_BASE}/ncc.png` },
  { name: "WorldQuant University", desc: "Partnership coming soon — global online university for data science and quantitative finance.", img: "/images/wqu.png" },
  { name: "RMI-Rwanda", desc: "Strategic partnership for professional development and industry-aligned training.", img: `${IMG_BASE}/rmi.png` },
  { name: "SOLVIT AFRICA", desc: "Collaborations for internships, mentorship, and employment opportunities.", img: `${IMG_BASE}/solvit.png` },
  { name: "ICT Chamber-Rwanda", desc: "Leading tech companies partnerships for mentorship and employment.", img: `${IMG_BASE}/ict.png` },
];

const defaultNews = [
  { title: "New Partnership with ASSA (University of Rwanda)", date: "March 15, 2024", desc: "Global Nexus announces strategic partnerships with University of Rwanda Students to enhance student opportunities...", image: `${IMG_BASE}/team.jpeg`, link: "https://www.linkedin.com/pulse/global-nexus-institute-updates-global-nexus-institute-nunyf/" },
  { title: "Data Analytics & Data Science in-person Training", date: "September 15, 2024", desc: "Global Nexus Institute we don't keep all of our training online, we do meet in-person, cheer and discuss more.", image: `${IMG_BASE}/team1.jpeg`, link: "https://www.linkedin.com/feed/update/urn:li:activity:7289945115026989056/" },
  { title: "Student at Tech Innovation GIZ learning facilities", date: "August 21, 2024", desc: "Our students secured top positions at the Innovation Challenge, highlighting that learning and collaboration are key to success.", image: `${IMG_BASE}/learning.jpeg`, link: "#" },
  { title: "Student Success at Tech Innovation Challenge", date: "June 10, 2024", desc: "Our students secured a meeting with the Business Manager at the National Computing Center (UK).", image: `${IMG_BASE}/studing.jpeg`, link: "#" },
];

const defaultTestimonials = [
  { name: "Didier NGAMIJE", role: "Data Analyst at Ganza Africa", quote: "The Data Science course completely transformed my career. Within 3 months of graduation, I landed my first job at Ganza Africa.", img: `${IMG_BASE}/didier.png` },
  { name: "Samuelson MUKIZA", role: "Student at University of Rwanda", quote: "I am excited to have completed the Python for Data Science course at GNI, gaining invaluable skills. I highly recommend this course.", img: `${IMG_BASE}/samuelson.jpg` },
  { name: "Samuel KIPKOGEI", role: "Data Analyst Intern", quote: "Thanks to the Data Analytics program, I transitioned from statistics to a data analytics career successfully.", img: `${IMG_BASE}/samuel.png` },
];

const defaultResearchAreas = [
  { title: "Artificial Intelligence & Machine Learning", desc: "Exploring AI applications in healthcare, agriculture, and education across East Africa.", icon: "Lightbulb" },
  { title: "Data Science & Analytics", desc: "Leveraging data-driven insights to solve real-world challenges in the region.", icon: "FileText" },
  { title: "Educational Technology", desc: "Researching innovative approaches to digital learning and skills development.", icon: "BookOpen" },
  { title: "Community & Development", desc: "Studying the impact of technology training on socioeconomic growth in Rwanda and beyond.", icon: "Users" },
];

const researchAreaFields: FieldDef[] = [
  { key: "title", label: "Area Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "icon", label: "Icon Name (e.g. Lightbulb, FileText, BookOpen, Users)", type: "text" },
];

const defaultServices = [
  { title: "Training Enumerators", desc: "Comprehensive training covering survey methodologies, data quality protocols, and ethical guidelines with hands-on practice.", icon: "ClipboardList", color: "from-red-500 to-rose-400" },
  { title: "Data Collection", desc: "Cutting-edge digital tools and methodologies with rigorous quality control across various sectors.", icon: "Database", color: "from-blue-500 to-cyan-400" },
  { title: "Data Processing", desc: "Advanced cleaning algorithms, statistical validation, and quality assurance for meaningful insights.", icon: "Cog", color: "from-purple-500 to-violet-400" },
  { title: "Report Writing", desc: "Complex data transformed into clear, actionable insights with visual representations and recommendations.", icon: "FileText", color: "from-orange-500 to-amber-400" },
  { title: "Internship", desc: "Academic and professional internships in Data Analytics, Data Science, and Software Development.", icon: "GraduationCap", color: "from-green-500 to-emerald-400" },
  { title: "Interns to Companies", desc: "Connecting companies with skilled interns proficient in data analytics, ML, and software development.", icon: "Users", color: "from-pink-500 to-rose-400" },
];

const defaultGallery = [
  { title: "Team Photo 1", image: "/images/gallery-1.jpg" },
  { title: "Team Photo 2", image: "/images/gallery-2.jpg" },
  { title: "Team Photo 3", image: "/images/gallery-3.jpg" },
  { title: "Team Photo 4", image: "/images/gallery-4.jpg" },
];

const defaultSteps = [
  { title: "Submit Application", desc: "Complete the online application form with your personal and academic information.", color: "from-red-500 to-orange-400" },
  { title: "Document Review", desc: "Our admissions team will review your application and supporting documents.", color: "from-blue-500 to-cyan-400" },
  { title: "Interview", desc: "Selected candidates will be invited for an interview with faculty members.", color: "from-green-500 to-emerald-400" },
];

// Field definitions for list editors
const teamFields: FieldDef[] = [
  { key: "name", label: "Full Name", type: "text" },
  { key: "role", label: "Role / Title", type: "text" },
  { key: "desc", label: "Description", type: "text" },
  { key: "img", label: "Photo", type: "image" },
];

const partnerFields: FieldDef[] = [
  { key: "name", label: "Partner Name", type: "text" },
  { key: "desc", label: "Description", type: "text" },
  { key: "img", label: "Logo", type: "image" },
];

const newsFields: FieldDef[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "date", label: "Date", type: "text", placeholder: "e.g. March 15, 2024" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "image", label: "Image", type: "image" },
  { key: "link", label: "Read More Link", type: "url" },
];

const testimonialFields: FieldDef[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "role", label: "Role / Position", type: "text" },
  { key: "quote", label: "Testimonial Quote", type: "textarea" },
  { key: "img", label: "Photo", type: "image" },
];

const serviceFields: FieldDef[] = [
  { key: "title", label: "Service Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "color", label: "Gradient Color (e.g. from-red-500 to-rose-400)", type: "text" },
];

const galleryFields: FieldDef[] = [
  { key: "title", label: "Caption / Alt Text", type: "text" },
  { key: "image", label: "Image", type: "image" },
];

const stepsFields: FieldDef[] = [
  { key: "title", label: "Step Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "color", label: "Gradient Color", type: "text" },
];

const footerLinkFields: FieldDef[] = [
  { key: "label", label: "Link Text", type: "text" },
  { key: "url", label: "URL", type: "url" },
  { key: "external", label: "External? (yes/no)", type: "text", placeholder: "yes or no" },
];

const defaultFooterLinks = [
  { label: "Privacy Policy", url: "https://www.globalnexus.africa/images/Privacy-Policy.pdf", external: "yes" },
  { label: "Refund Policy", url: "https://www.globalnexus.africa/images/Refund-Policy.pdf", external: "yes" },
  { label: "Terms and Conditions", url: "https://www.globalnexus.africa/images/Terms-and-Conditions.pdf", external: "yes" },
  { label: "Research", url: "/research", external: "no" },
];

// Why Us
const defaultWhyUsReasons = [
  { title: "Accredited Programs", desc: "Our programs are accredited by RTB Rwanda and NCC Education UK, ensuring internationally recognized certifications.", color: "from-red-500 to-orange-400" },
  { title: "Expert Mentors", desc: "Learn from 10+ industry professionals with real-world experience in data science, AI, and software development.", color: "from-blue-500 to-cyan-400" },
  { title: "Global Opportunities", desc: "We bridge local needs with global opportunities, connecting graduates to international career pathways.", color: "from-green-500 to-emerald-400" },
  { title: "Practical Curriculum", desc: "Hands-on, project-based learning using industry-standard tools like Python, SQL, Power BI, and more.", color: "from-purple-500 to-violet-400" },
  { title: "Innovation-Driven", desc: "We stay at the forefront of technology trends, continuously updating our programs to match industry demands.", color: "from-orange-500 to-amber-400" },
  { title: "Inclusive Education", desc: "Committed to accessible education for underrepresented groups including women, youth, and people with disabilities.", color: "from-pink-500 to-rose-400" },
];
const whyUsReasonFields: FieldDef[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "color", label: "Gradient Color", type: "text" },
];

// Career
const defaultCareerPaths = [
  { title: "Data Analyst", desc: "Analyze and interpret complex datasets to help organizations make data-driven decisions.", skills: "Python, SQL, Power BI, Excel", color: "from-blue-500 to-cyan-400" },
  { title: "Data Scientist", desc: "Build predictive models and machine learning solutions to solve complex business problems.", skills: "Python, TensorFlow, R, Statistics", color: "from-purple-500 to-violet-400" },
  { title: "Software Developer", desc: "Design and build web applications and software solutions for businesses across Africa.", skills: "JavaScript, React, Node.js, APIs", color: "from-green-500 to-emerald-400" },
  { title: "Database Administrator", desc: "Manage, secure, and optimize database systems for reliable data storage and retrieval.", skills: "SQL, PostgreSQL, MongoDB, Cloud", color: "from-orange-500 to-amber-400" },
];
const careerPathFields: FieldDef[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "skills", label: "Skills", type: "text" },
  { key: "color", label: "Gradient Color", type: "text" },
];

const defaultCareerOpenings = [
  { title: "Instructor — Data Analytics", type: "Full-time", location: "Kigali / Remote", desc: "Join our teaching team to deliver hands-on data analytics training to the next generation of African tech talent." },
  { title: "Instructor — Python & AI", type: "Part-time", location: "Remote", desc: "Teach Python programming and AI fundamentals through our online eLearning platform (skilla.africa)." },
  { title: "Student Intern — Web Development", type: "Internship", location: "Kigali", desc: "Gain real-world experience in web development while contributing to meaningful projects." },
];
const careerOpeningFields: FieldDef[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "type", label: "Type (Full-time, Part-time, Internship)", type: "text" },
  { key: "location", label: "Location", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
];

// Corporate
const defaultCorporateOfferings = [
  { title: "Corporate Training", desc: "Customized training programs for your team in data analytics, AI, Python, and digital skills tailored to your business needs.", color: "from-blue-500 to-cyan-400" },
  { title: "Talent Pipeline", desc: "Access our pool of skilled graduates for recruitment — data analysts, developers, and AI specialists ready to contribute.", color: "from-green-500 to-emerald-400" },
  { title: "Data Consulting", desc: "End-to-end data solutions including collection, processing, analysis, and reporting for your organization's projects.", color: "from-purple-500 to-violet-400" },
  { title: "Upskilling Programs", desc: "Help your existing workforce stay competitive with continuous learning in emerging technologies and methodologies.", color: "from-orange-500 to-amber-400" },
];
const corporateOfferingFields: FieldDef[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "color", label: "Gradient Color", type: "text" },
];

const defaultCorporateBenefits = [
  { text: "Tailored programs aligned to your business objectives" },
  { text: "Flexible delivery — on-site, online, or hybrid" },
  { text: "Internationally accredited certifications for participants" },
  { text: "Measurable learning outcomes and ROI tracking" },
  { text: "Post-training support and mentorship" },
  { text: "Access to industry-standard tools and platforms" },
];
const corporateBenefitFields: FieldDef[] = [
  { key: "text", label: "Benefit Text", type: "text" },
];

// Collaborate
const defaultCollaborateTypes = [
  { title: "Academic Partners", desc: "Co-develop curricula, exchange knowledge, and create joint certification programs with universities and institutions.", color: "from-blue-500 to-cyan-400" },
  { title: "Industry Partners", desc: "Provide internships, mentorship, and real-world projects that prepare students for the workforce.", color: "from-green-500 to-emerald-400" },
  { title: "Research Partners", desc: "Collaborate on applied research in AI, data science, educational technology, and community development.", color: "from-purple-500 to-violet-400" },
  { title: "NGO & Development Partners", desc: "Partner on capacity-building initiatives, digital literacy programs, and community empowerment projects.", color: "from-pink-500 to-rose-400" },
  { title: "International Organizations", desc: "Work together on cross-border education programs and technology transfer initiatives.", color: "from-orange-500 to-amber-400" },
  { title: "Community Organizations", desc: "Support grassroots digital skills training and youth empowerment in underserved communities.", color: "from-red-500 to-rose-400" },
];
const collaborateTypeFields: FieldDef[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "color", label: "Gradient Color", type: "text" },
];

// FAQs
const defaultFaqCategories = [
  { category: "Programs & Courses", faqs: "What programs does Global Nexus Institute offer?|We offer professional certifications in Data Analytics, Data Science, AI & Machine Learning, Software Development, and Cybersecurity.||Are courses available online?|Yes! We offer both online and in-person training through our eLearning platform (skilla.africa)." },
  { category: "Admissions & Requirements", faqs: "What are the entry requirements?|Requirements vary by program. Generally, you need a high school diploma or equivalent.||How do I apply?|Visit our Admissions page and click 'Apply Now' to fill out the online application form." },
  { category: "Fees & Payments", faqs: "What payment methods are accepted?|We accept MoMo Pay, bank transfers, and online payments. Installment plans are available.||Are scholarships available?|Yes! We offer merit-based scholarships covering up to 30% of tuition fees." },
  { category: "Certification & Career", faqs: "Do I get a certificate upon completion?|Yes! All graduates receive a certificate of completion. Programs accredited by RTB Rwanda and NCC Education UK carry internationally recognized certifications.||Does Global Nexus help with job placement?|We provide career guidance, CV reviews, and connect graduates with our industry partners." },
];
const faqCategoryFields: FieldDef[] = [
  { key: "category", label: "Category Name", type: "text" },
  { key: "faqs", label: "FAQs (Q|A separated by || between pairs)", type: "textarea" },
];

// Donate
const defaultDonateAreas = [
  { title: "Scholarships", desc: "Fund tuition for students who can't afford quality tech education.", color: "from-blue-500 to-cyan-400" },
  { title: "Women in Tech", desc: "Support programs empowering women and young mothers in technology careers.", color: "from-pink-500 to-rose-400" },
  { title: "Community Programs", desc: "Bring digital literacy and tech skills to underserved communities across Africa.", color: "from-green-500 to-emerald-400" },
];
const donateAreaFields: FieldDef[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "color", label: "Gradient Color", type: "text" },
];

const defaultDonateItems = [
  { text: "Fund scholarships for deserving students" },
  { text: "Support educational resources and equipment" },
  { text: "Enable impactful mentorship programs" },
  { text: "Create opportunities for vulnerable communities" },
  { text: "Provide access to modern technology and tools" },
  { text: "Empower women and youth through digital skills" },
];
const donateItemFields: FieldDef[] = [
  { key: "text", label: "Impact Item", type: "text" },
];

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading, userId, signOut } = useAdmin();
  const [activePage, setActivePage] = useState("home");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, Record<string, Record<string, string>>>>({});
  const [saving, setSaving] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const merged: Record<string, Record<string, Record<string, string>>> = JSON.parse(JSON.stringify(defaults));
      const { data } = await supabase.from("site_content").select("*");
      if (data) {
        data.forEach((row) => {
          if (!merged[row.page]) merged[row.page] = {};
          merged[row.page][row.section_key] = {
            ...(merged[row.page][row.section_key] || {}),
            ...(row.content as Record<string, string>),
          };
        });
      }
      setFormData(merged);
      setLoadingContent(false);
    };
    loadContent();
  }, []);

  const currentPage = pages.find((p) => p.key === activePage);

  const getValue = (page: string, section: string, field: string) => {
    return formData[page]?.[section]?.[field] || "";
  };

  const setValue = (page: string, section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: {
          ...prev[page]?.[section],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = async (sectionKey: string) => {
    if (!userId) return;
    setSaving(true);
    const pageKey = activePage;
    const sectionData = formData[pageKey]?.[sectionKey] || {};
    const { error } = await saveSiteContent(pageKey, sectionKey, sectionData, userId);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Content updated successfully." });
    }
    setSaving(false);
  };

  if (authLoading || loadingContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const renderListEditor = () => {
    if (!userId) return null;

    switch (activePage) {
      case "about-team":
        return <AdminListEditor title="Team Members" description="Edit your team members shown on the About page." page="about" sectionKey="team" fields={teamFields} defaultItems={defaultTeam} userId={userId} />;
      case "about-partners":
        return <AdminListEditor title="Partners & Accreditations" description="Edit partners shown on the About page." page="about" sectionKey="partners" fields={partnerFields} defaultItems={defaultPartners} userId={userId} />;
      case "news-items":
        return <AdminListEditor title="News Articles" description="Edit news items shown on the News page." page="news" sectionKey="items" fields={newsFields} defaultItems={defaultNews} userId={userId} />;
      case "testimonials":
        return <AdminListEditor title="Testimonials" description="Edit success stories shown on the News page." page="news" sectionKey="testimonials" fields={testimonialFields} defaultItems={defaultTestimonials} userId={userId} />;
      case "services-list":
        return <AdminListEditor title="Services" description="Edit services shown on the Services page." page="services" sectionKey="services_list" fields={serviceFields} defaultItems={defaultServices} userId={userId} />;
      case "home-gallery":
        return <AdminListEditor title="Gallery Images" description="Edit gallery images on the Home page." page="home" sectionKey="gallery" fields={galleryFields} defaultItems={defaultGallery} userId={userId} />;
      case "admissions-steps":
        return <AdminListEditor title="Admission Steps" description="Edit the steps shown on the Admissions page." page="admissions" sectionKey="steps" fields={stepsFields} defaultItems={defaultSteps} userId={userId} />;
      case "footer-links":
        return <AdminListEditor title="Footer Quick Links" description="Edit the quick access links in the footer." page="footer" sectionKey="links" fields={footerLinkFields} defaultItems={defaultFooterLinks} userId={userId} />;
      case "research-areas":
        return <AdminListEditor title="Research Areas" description="Edit research focus areas shown on the Research page." page="research" sectionKey="areas" fields={researchAreaFields} defaultItems={defaultResearchAreas} userId={userId} />;
      case "whyus-reasons":
        return <AdminListEditor title="Why Us Reasons" description="Edit reasons shown on the Why Us page." page="whyus" sectionKey="reasons" fields={whyUsReasonFields} defaultItems={defaultWhyUsReasons} userId={userId} />;
      case "career-paths":
        return <AdminListEditor title="Career Paths" description="Edit career paths shown on the Career page." page="career" sectionKey="paths" fields={careerPathFields} defaultItems={defaultCareerPaths} userId={userId} />;
      case "career-openings":
        return <AdminListEditor title="Job Openings" description="Edit job openings shown on the Career page." page="career" sectionKey="openings" fields={careerOpeningFields} defaultItems={defaultCareerOpenings} userId={userId} />;
      case "corporate-offerings":
        return <AdminListEditor title="Corporate Offerings" description="Edit offerings shown on the Corporate page." page="corporate" sectionKey="offerings" fields={corporateOfferingFields} defaultItems={defaultCorporateOfferings} userId={userId} />;
      case "corporate-benefits":
        return <AdminListEditor title="Corporate Benefits" description="Edit benefits shown on the Corporate page." page="corporate" sectionKey="benefits" fields={corporateBenefitFields} defaultItems={defaultCorporateBenefits} userId={userId} />;
      case "collaborate-types":
        return <AdminListEditor title="Partner Types" description="Edit partnership types on the Collaborate page." page="collaborate" sectionKey="types" fields={collaborateTypeFields} defaultItems={defaultCollaborateTypes} userId={userId} />;
      case "faqs-categories":
        return <AdminListEditor title="FAQ Categories" description="Edit FAQ categories and questions." page="faqs_page" sectionKey="categories" fields={faqCategoryFields} defaultItems={defaultFaqCategories} userId={userId} />;
      case "donate-areas":
        return <AdminListEditor title="Impact Areas" description="Edit donation impact areas on the Donate page." page="donate" sectionKey="areas" fields={donateAreaFields} defaultItems={defaultDonateAreas} userId={userId} />;
      case "donate-items":
        return <AdminListEditor title="Impact Items" description="Edit impact items on the Donate page." page="donate" sectionKey="items" fields={donateItemFields} defaultItems={defaultDonateItems} userId={userId} />;
      default:
        return null;
    }
  };

  const isListEditor = [
    "about-team", "about-partners", "news-items", "testimonials", "services-list",
    "home-gallery", "admissions-steps", "footer-links", "research-areas",
    "whyus-reasons", "career-paths", "career-openings", "corporate-offerings",
    "corporate-benefits", "collaborate-types", "faqs-categories", "donate-areas", "donate-items"
  ].includes(activePage);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-xl bg-card border border-border shadow-md md:hidden"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static z-40 w-64 bg-card border-r border-border flex flex-col shrink-0 h-screen transition-transform duration-200`}>
        <div className="p-5 border-b border-border">
          <h2 className="font-bold text-foreground text-lg">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Global Nexus Institute</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {pages.map((page) => (
            <button
              key={page.key}
              onClick={() => { setActivePage(page.key); setActiveSection(null); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activePage === page.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <page.icon className="h-4 w-4" />
              {page.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto md:ml-0 mt-14 md:mt-0">
        <div className="w-full">
          {activePage === "programs" ? (
            <AdminProgramManager />
          ) : activePage === "applications" ? (
            <AdminApplications />
          ) : activePage === "messages" ? (
            <AdminMessages />
          ) : activePage === "subscribers" ? (
            <AdminSubscribers />
          ) : activePage === "form-questions" ? (
            <AdminFormQuestions />
          ) : activePage === "images" ? (
            <AdminImageManager />
          ) : activePage === "send-message" ? (
            <AdminSendMessage />
          ) : isListEditor ? (
            renderListEditor()
          ) : (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-1">{currentPage?.label}</h1>
              <p className="text-sm text-muted-foreground mb-8">
                Edit the content for this page. Changes are saved per section.
              </p>

              <div className="space-y-6">
                {currentPage?.sections.map((section) => {
                  const isOpen = activeSection === section.key;
                  return (
                    <div key={section.key} className="bg-card border border-border rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setActiveSection(isOpen ? null : section.key)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition"
                      >
                        <span className="font-semibold text-foreground">{section.label}</span>
                        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`} />
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">
                          {section.fields.map((field) => (
                            <div key={field.key}>
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                {field.label}
                              </label>
                              {field.type === "textarea" ? (
                                <textarea
                                  value={getValue(activePage, section.key, field.key)}
                                  onChange={(e) => setValue(activePage, section.key, field.key, e.target.value)}
                                  rows={4}
                                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                                />
                              ) : (
                                <input
                                  type={field.type}
                                  value={getValue(activePage, section.key, field.key)}
                                  onChange={(e) => setValue(activePage, section.key, field.key, e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                                />
                              )}
                            </div>
                          ))}
                          <button
                            onClick={() => handleSave(section.key)}
                            disabled={saving}
                            className="btn-primary flex items-center gap-2 text-sm !px-5 !py-2.5 disabled:opacity-50"
                          >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Save Section
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
