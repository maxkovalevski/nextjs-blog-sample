const siteMetadata = {
  title: "Next.js Blog Sample",
  titleTemplate: "%s | Next.js Blog Sample",
  author: "Max Kowalevski",
  description: "My blog",
  keywords: [],
  language: "en-us",
  siteDomain: 'yourdomain',
  siteUrl: 'http://localhost:3000',
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
  comment: {
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: "giscus", // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: "pathname", // supported options: pathname, url, title
      reactions: "1", // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: "0",
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: "light",
      // theme when dark mode
      darkTheme: "transparent_dark",
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: "",
    },
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
