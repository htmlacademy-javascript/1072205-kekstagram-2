import { createThumbnails } from './create-thumbnails.js';
import { openFullSizePhotoModal } from './full-size-photo-modal.js';
import { openPhotoEditModal, configureFormSubmit } from './photo-edit-modal.js';
import { getData } from './api.js';
import { showLoadErrorMessage } from './utils.js';

const initializeApp = async () => {
  try {
    const photos = await getData();
    createThumbnails(photos);
    openFullSizePhotoModal(photos);
    openPhotoEditModal();
    configureFormSubmit();
  } catch (error) {
    showLoadErrorMessage();
  }
};

initializeApp();

