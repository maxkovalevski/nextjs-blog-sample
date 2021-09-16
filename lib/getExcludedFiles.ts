import siteMetadata from '../siteMetadata';
import { CONTENT_DIR } from './constants';

const {
  notesHomePageContentFile,
  blurbContentFile,
  aboutPageContentFile,
  aboutBlockContentFile,
} = siteMetadata;

const root = process.cwd();

export const getExcludedFiles = () => {
  return [
    notesHomePageContentFile,
    blurbContentFile,
    aboutPageContentFile,
    aboutBlockContentFile,
  ].map((fileName) => `${root}/${CONTENT_DIR}/${fileName}`);
}

