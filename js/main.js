import { createThumbnails } from './create-thumbnails.js';
import { openFullSizePhotoModal } from './full-size-photo-modal.js';
import { openPhotoEditModal, configureFormSubmit } from './photo-edit-modal.js';
import { getData } from './api.js';
import { showLoadErrorMessage } from './utils.js';

getData()
  .then((photos) => {
    createThumbnails(photos);
    openFullSizePhotoModal(photos);
    openPhotoEditModal();
    configureFormSubmit();
  })
  .catch(() => {
    showLoadErrorMessage();
  });

