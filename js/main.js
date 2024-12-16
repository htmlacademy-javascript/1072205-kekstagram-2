import { createPhoto } from './create-photo.js';

const photos = Array.from({length: createPhoto().PhotosQuantity.MAX}, createPhoto());

console.log(photos);
