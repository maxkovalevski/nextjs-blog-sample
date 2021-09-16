// import { createFileNodeFromBuffer } from `gatsby-source-filesystem`;
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { createCanvas, Image, registerFont } from 'canvas';
import format from 'date-fns/format';

import siteMetadata from '../siteMetadata';

const { siteDomain } = siteMetadata;

import { PostFrontMatter } from '../types';
import { fillTextOnCanvas } from './fillTextOnCanvas';
import { formatSlug } from './formatSlug';

const root = process.cwd();

export const createSocialCard = ({ title = '', slug, tags, date }: PostFrontMatter, logo: Image) => {
    const fileName = `${formatSlug(slug)}.png`;
    const thumbnailsDir = '/img/thumbnails';
    const thumbnailFilePath = `${root}/public${thumbnailsDir}/${fileName}`;

    if (existsSync(thumbnailFilePath)) {
      return `${thumbnailsDir}/${fileName}`;
    }

    if (!existsSync(`${root}/public${thumbnailsDir}`)) {
      mkdirSync(`${root}/public${thumbnailsDir}`);
    }

    const fontPath = path.join(root, '/static/fonts/FiraCode-Bold.ttf');
    registerFont(fontPath, { family: 'FiraCode' });

    const canvas = createCanvas(1200, 600);
    const context = canvas.getContext('2d');
    const formattedDate = date ? format(new Date(date), 'MMM d, yyyy') : null;

    // creating background and rectangle
    context.fillStyle = '#2B2A2D';
    context.fillRect(0, 0, 1200, 600);
    context.fillStyle = '#1F2232';
    context.strokeStyle = '#387CC8';
    context.fillRect(40, 40, 1120, 520);
    context.strokeRect(40, 40, 1120, 520);

    // text
    context.font = 'bold 45pt FiraCode';
    context.textAlign = 'left';
    context.fillStyle = '#E2E2E2';
    fillTextOnCanvas(context, title, 80, 120, 1040, 60);

    // site address
    context.font = 'bold 30pt FiraCode';
    context.textAlign = 'left';
    context.fillStyle = '#aaa9b5';
    context.fillText(siteDomain, 80, 525);

    // tags
    if (tags && tags.length > 0) {
        context.font = 'bold 22pt FiraCode';
        context.textAlign = 'left';
        context.fillStyle = '#d89d15';
        const tagsText = tags.map(tag => `#${tag}`).join(' ');
        fillTextOnCanvas(context, tagsText, 80, 380, 900, 45);
    }

    // date
    if (formattedDate) {
        context.font = 'bold 20pt FiraCode';
        context.textAlign = 'left';
        context.fillStyle = '#E2E2E2';
        context.fillText(formattedDate, 500, 522);           
    }

    // draw image (logo-avatar)
    context.drawImage(logo, 950, 345, 200, 200);

    const buffer = canvas.toBuffer('image/png');

    writeFileSync(thumbnailFilePath, buffer);

    return `/img/${fileName}`;
}

