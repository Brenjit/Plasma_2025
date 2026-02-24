
export interface Speaker {
  id: string;
  name: string;
  role: string; // e.g. "Keynote Speaker", "Invited Speaker"
  affiliation: string;
  image: string;
  talkTitle?: string;
  bio?: string;
  socials?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface Talk {
  id: string;
  title: string;
  speakerId: string; // references Speaker.id
  speakerName?: string; // denormalized for easier display
  session: string; // e.g. "Plenary Session 1", "Technical Session 3"
  date: string;
  time?: string;
  type: "Plenary" | "Invited" | "Oral" | "Poster";
  tags: string[];
  abstract?: string;
  resources: {
    slides?: string; // URL to PDF
    video?: string; // URL to video
    abstract?: string; // URL to PDF
    paper?: string; // URL to PDF/DOI
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Inauguration" | "Technical" | "Cultural" | "Group" | "Other";
  date?: string;
  coverImage: string; // main image
  images: string[]; // array of image URLs
  description?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  year: string;
  venue: string;
  dates: string;
  links: {
    home: string;
    proceedings: string;
    gallery: string;
    contact: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socials: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}
