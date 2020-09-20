export interface HomePage {
  hero: HeroContent[];
  sections: Section[];
  whyMedigyTitle: string;
  whyMedigyDescription: string;
  whyMedigyButton: string;
}

export interface HeroContent {
  captionStatic: string;
  imageURL: string;
  subCaptionStatic: string;
  buttonLeft: string;
  buttonRigt: string;
  captionDynamic: CaptionDynamic[];
}

export interface CaptionDynamic {
  scroll: string;
  fadeIn: string;
}

export interface Section {
  title: string;
  imageURL: string;
  button: string;
  content: SectionContent[];
}

export interface SectionContent {
  bullet: string;
}

const content: HomePage = {
  "hero": [
    {
      "captionStatic": "Discover peer reviewed innovations that",
      "imageURL": "/images/landing-top-banner-1.jpg",
      "subCaptionStatic":
        "Surfacing the world’s most useful peer-reviewed digital health solutions and medical devices",
      "buttonLeft": "Find Software",
      "buttonRigt": "Listen to Introductory Podcast",
      "captionDynamic": [
        {
          "scroll": "impact the total cost of care",
          "fadeIn":
            "Find health IT software and medical devices that reduce the total cost of care (TCC)",
        },
        {
          "scroll": "enable value based care",
          "fadeIn":
            "Find or share digital health tools that enable transition from fee for service to value based care",
        },
        {
          "scroll": "drive evidence based outcomes",
          "fadeIn":
            "Find or share medical devices and health IT software that improves outcomes",
        },
        {
          "scroll": "improve the quality of care",
          "fadeIn":
            "Find digital health tools and device that improve the quality of care",
        },
        {
          "scroll": "enhance the patient experience",
          "fadeIn":
            "Find or share digital health tools that improve patient experience",
        },
        {
          "scroll": "increase clinician productivity",
          "fadeIn":
            "Find or share tools that make doctors and nurses more productive",
        },
        {
          "scroll": "transform care delivery",
          "fadeIn":
            "Find or share tools that use new techniques to change how care delivered",
        },
      ],
    },
  ],
  "sections": [
    {
      "title":
        "The world’s most innovative medical devices, software, and services in one place",
      "imageURL": "/images/home-graphic-list.png",
      "button": "See recent submissions",
      "content": [
        {
          "bullet":
            "Find products and services, what we call  offerings, faster by discovering what your peers are using",
        },
        {
          "bullet":
            "Share what you find with your peers, make a name for yourself, and become a recognized thought leader",
        },
        {
          "bullet":
            "Search by topics and multiple taxonomies such as outcomes, financial models, diagnoses, or therapies",
        },
      ],
    },
    {
      "title":
        "Accelerate innovation diffusion by putting all stakeholders and decision makers on a common platform",
      "imageURL": "/images/home-graphic-2.png",
      "button": "See an example",
      "content": [
        {
          "bullet":
            "Executive decision makers can rely on a transparent and disciplined evaluation process",
        },
        {
          "bullet":
            "Innovation leadership teams can find solutions and ask their internal or external stakeholders for their opinions in a structured manner",
        },
        {
          "bullet":
            "Users can suggest products they’d like innovation teams to review and provide their own opinions in a disciplined manner",
        },
        {
          "bullet":
            "Procurement specialists and buyers can initiate and run disciplined RFP programs",
        },
      ],
    },
    {
      "title":
        "State of the art collaborative evaluations which rewards vendor authenticity",
      "imageURL": "/images/home-graphic-3-2.png",
      "button": "Learn more about",
      "content": [
        {
          "bullet":
            "Submit reviews, experiences, or evaluations anonymously or fully identified",
        },
        {
          "bullet":
            "Innovation teams can create private internal-only sandboxes and catalog",
        },
        {
          "bullet":
            "Personalized views allow tracking and sharing a list of useful offerings",
        },
      ],
    },
    {
      "title": "Qualitative experiences and reactions",
      "imageURL": "/images/home-graphic-4-2.png",
      "button": "See an example",
      "content": [
        {
          "bullet":
            "See which of your peers are using the solutions you’re interested in",
        },
        {
          "bullet":
            "Upvotes, stars, and watchers, pros & cons, proven integration, and decisions show real-world experience with products and services",
        },
        {
          "bullet":
            "Invite your peers to share their experiences and reactions",
        },
      ],
    },
    {
      "title": "Quantitative evaluations and structured evidence",
      "imageURL": "/images/home-graphic-5.png",
      "button": "See an example",
      "content": [
        {
          "bullet":
            "See intended use, indications for use, and OKRs across offerings",
        },
        {
          "bullet":
            "Evaluate UX, cybersecurity, data monetization, and generate apples to apples comparisons across vendors",
        },
        {
          "bullet":
            "Invite your peers or analysts to share their quantitative evaluations and evidence",
        },
      ],
    },
    {
      "title":
        "Researching the best medical software shouldn’t be a popularity contest",
      "imageURL": "/images/home-graphic-6.png",
      "button": "See an example",
      "content": [
        {
          "bullet": "Search by topics",
        },
        {
          "bullet": "Search",
        },
      ],
    },
    {
      "title": "See what analysts think about offerings",
      "imageURL": "/images/home-graphic-7-2.png",
      "button": "See an example",
      "content": [
        {
          "bullet":
            "Analysts can showcase their knowledge by demonstrating structured knowledge",
        },
      ],
    },
    {
      "title": "Innovators, vendors, and suppliers can be more authentic",
      "imageURL": "/images/home-graphic-8.png",
      "button": "See an example",
      "content": [
        {
          "bullet":
            "The most innovative companies are more transparent, which makes them more authentic",
        },
        {
          "bullet":
            "Innovators, vendors, and suppliers can register their own offerings and be candid about customer feedback",
        },
        {
          "bullet":
            "Vendors and innovators can invite their own customers to privately evaluate their solutions and publicly share findings",
        },
      ],
    },
    {
      "title": "Social and external ratings when popularity matters",
      "imageURL": "/images/home-graphic-9.png",
      "button": "See what’s new",
      "content": [
        {
          "bullet":
            "See what your peers think about specific offerings across Twitter",
        },
        {
          "bullet":
            "See GitHub ratings for open source solutions alongside each other",
        },
      ],
    },
  ],
  "whyMedigyTitle": "Medigy Is A Multi-Functional Platform",
  "whyMedigyDescription":
    "Medigy is crowd-sourced and peer network-based. Buyers get access to rich content about the digital health products they’re looking for. Influencers have a new place to build and engage with a community around their areas of expertise.",
  "whyMedigyButton": "Why Medigy?",
};

export default content;
