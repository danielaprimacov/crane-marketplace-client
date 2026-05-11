export const COOKIE_STORAGE_KEY = "kranhub_cookie_preferences";

export const DEFAULT_COOKIE_OPTIONS = {
  required: true,
  statistics: false,
  career: false,
  googleMaps: false,
};

export const COOKIE_CATEGORIES = [
  {
    key: "required",
    title: "Required Cookies",
    description:
      "Necessary for basic website functions such as security, page navigation, forms, and session handling.",
    required: true,
  },
  {
    key: "statistics",
    title: "Statistics",
    description:
      "Helps us understand how visitors use the website so we can improve performance and usability.",
  },
  {
    key: "career",
    title: "Career & Recruiting",
    description:
      "Allows career-related integrations or tools to work correctly when they are used on the website.",
  },
  {
    key: "googleMaps",
    title: "Google Maps",
    description:
      "Allows embedded map content and location-related features to be loaded.",
  },
];
