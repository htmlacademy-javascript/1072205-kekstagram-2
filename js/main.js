import { getPhotoSettings } from './photo-settings.js';
import { createPhoto } from './create-photo.js';

const photos = Array.from({length: getPhotoSettings().PhotosQuantity.MAX}, createPhoto);
