import { createPhotos } from './create-photos.js';
import { createThumbnails } from './create-thumbnails.js';

const photos = createPhotos();

createThumbnails(photos);
