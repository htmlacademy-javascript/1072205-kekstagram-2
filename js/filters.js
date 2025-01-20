import { getRandomUniqueNumbers, debounce } from "./utils.js";
import { createThumbnails } from "./create-thumbnails.js";

const filtersElement = document.querySelector('.img-filters');
const filterButtonsElement = filtersElement.querySelectorAll('.img-filters__button');
const filterDefaultButton = filtersElement.querySelector('#filter-default');
const filterRandomElement = filtersElement.querySelector('#filter-random');
const filterDiscussedElement = filtersElement.querySelector('#filter-discussed');

const RANDOM_PHOTOS_COUNT = 10;

const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => thumbnail.remove());
};

const applyFilter = (photos, filter) => {
  clearThumbnails();
  let filteredPhotos = photos.slice();

  if (filter === 'default') {
    filteredPhotos.sort((a, b) => a.id - b.id);
  }

  if (filter === 'random') {
    const randomIds = getRandomUniqueNumbers(0, photos.length - 1, RANDOM_PHOTOS_COUNT);
    filteredPhotos = randomIds.map((index) => photos[index]);
  }

  if (filter === 'discussed') {
    filteredPhotos.sort((a, b) => b.comments.length - a.comments.length);
  }

  createThumbnails(filteredPhotos);
};

const showFilters = (photos) => {
  filtersElement.classList.remove('img-filters--inactive');

  const debouncedApplyFilter = debounce((filter) => applyFilter(photos, filter), 500);

  filterButtonsElement.forEach((button) => {
    button.addEventListener('click', () => {
      const activeElement = filtersElement.querySelector('.img-filters__button--active');
      activeElement.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');

      if (button === filterDefaultButton) {
        debouncedApplyFilter('default');
      }

      if (button === filterRandomElement) {
        debouncedApplyFilter('random');
      }

      if (button === filterDiscussedElement) {
        debouncedApplyFilter('discussed');
      }
    });
  });
};

export { showFilters };

