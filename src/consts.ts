import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "raunac",
  EMAIL: "raun.ac27@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 0,
  NUM_WORKS_ON_HOMEPAGE: 0,
  NUM_PROJECTS_ON_HOMEPAGE: 0,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "This is my place on the internet where i share my projects, ideas, books, and everything i am learning as a computer science student",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const BOOKS: Metadata = {
  TITLE: "Books",
  DESCRIPTION: "A collection of books i read.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "twitter-x",
    HREF: "https://x.com/raun_ac",
  },
  { 
    NAME: "github",
    HREF: "https://github.com/raun-ac"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/raunac27/",
  }
];
