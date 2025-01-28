import { addUserPhoto } from './add-user-photo.js';
import { getData } from './api.js';
import { createThumbnails } from './create-thumbnails.js';
import { showFilters } from './filters.js';
import { openFullSizePhotoModal } from './full-size-photo-modal.js';
import { configureFormSubmit, openPhotoEditModal } from './photo-edit-modal.js';
import { showLoadErrorMessage } from './utils.js';

openPhotoEditModal();
configureFormSubmit();
addUserPhoto();

getData()
  .then((photos) => {
    createThumbnails(photos);
    openFullSizePhotoModal(photos);
    showFilters(photos);
  })
  .catch(() => {
    showLoadErrorMessage();
  });

