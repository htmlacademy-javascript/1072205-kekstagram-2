import { createPhoto, PhotosQuantity } from './create-photo.js';

const photos = Array.from({length: PhotosQuantity.MAX}, createPhoto);

console.log(photos);
