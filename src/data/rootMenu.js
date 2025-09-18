export default [
  {
    title: "About Us",
    link: "https://addverb.com/about-us/",
  },
  {
    title: "Industry",
    lazy: () => import("./industries"),   // lazy load file
  },
  {
    title: "Solutions",
    lazy: () => import("./solutions"),   // lazy load file
  },
  {
    title: "News Room",
    lazy: () => import("./newsroom"),    // lazy load file
  },
  {
    title: "Service",
    link: "https://addverb.com/after-sales-service-support/",
  },
  { title: "Enquire", link: "https://addverb.com/contact-us/" },
  { title: "Support", link: "https://support.addverb.com/" },
  { title: "Careers" },
];
