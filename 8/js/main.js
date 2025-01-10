import { createPhotos } from './create-photos.js';
import { createThumbnails } from './create-thumbnails.js';
import { openModal } from './full-size-photo-modal.js';

const photos = createPhotos();

createThumbnails(photos);

openModal(photos);
