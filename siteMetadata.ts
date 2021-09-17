const siteMetadata = {
  title: "Next.js Blog Sample",
  titleTemplate: "%s | Next.js Blog Sample",
  author: "Max Kowalevski",
  description: "My blog",
  keywords: [],
  language: "en-us",
  siteDomain: 'yourdomain',
  siteUrl: process.env.SITE_URL || 'http://localhost',
  siteRepo: "https://github.com/kowalevski/nextjs-blog-sample",
  siteLogo: "/static/img/logo.png",
  defaultImage: "/static/images/avatar.png",
  avatar: "/static/img/avatar.jpeg",
  favicon: "/img/avatar.jpeg",
  email: "me@kowalevski.com",
  githubUsername: "kowalevski",
  twitterUsername: "mkowalevski",
  locale: "en-US",
  analytics: {
    plausibleDataDomain: "",
  },
  copyrightText: "@ Max Kowalevski 2021",
  headerMenu: [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/blog",
      name: "Blog",
    },
    {
      path: "/notes",
      name: "Notes",
    },
    {
      path: "/about",
      name: "About",
    },
  ],
  footerMenu: [
    {
      path: "/blog",
      name: "Blog",
    },
    {
      path: "/notes",
      name: "Notes",
    },
    {
      path: "https://twitter.com/mkowalevski",
      name: "Twitter",
    },
    {
      path: "https://github.com/kowalevski",
      name: "GitHub",
    },
  ],
  notesHomePageContentFile: "site-notes-index.md",
  aboutPageContentFile: "site-about.md",
  aboutBlockContentFile: "site-about-block.md",
  blurbContentFile: "site-blurb.md",
  comment: {
    utterancesConfig: {
      repo: process.env.UTTERANCES_REPO || '',
      issueTerm: 'pathname',
      label: 'comment',
      // github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
      theme: 'dark-blue',
      darkTheme: '',
    },
  },
};

export default siteMetadata;
