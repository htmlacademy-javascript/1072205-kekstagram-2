import { createPhotos } from './create-photos.js';
import { createThumbnails } from './create-thumbnails.js';
import { openFullSizePhotoModal } from './full-size-photo-modal.js';
import { openPhotoEditModal } from './photo-edit-modal.js';
import { validatePhotoEditForm } from './photo-edit-form-validation.js';

const photos = createPhotos();

createThumbnails(photos);

openFullSizePhotoModal(photos);

openPhotoEditModal();
validatePhotoEditForm();


