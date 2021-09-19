import { escape } from './htmlEscaper';

import siteMetadata from '../siteMetadata';
import { PostFrontMatter } from '../types';
import { getResourceUrlPrefix } from './getResourceUrlPrefix';

const generateRssItem = (post: PostFrontMatter) => `
  <item>
    <guid>${siteMetadata.siteUrl}/${getResourceUrlPrefix(post)}/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${siteMetadata.siteUrl}/${getResourceUrlPrefix(post)}/${post.slug}</link>
    ${post.excerpt && `<description>${escape(post.excerpt)}</description>`}
    ${post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ''}
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`;

export const generateRss = (posts: PostFrontMatter[], page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${escape(siteMetadata.description)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      ${posts[0].date ? `<lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>` : ''}
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`;

