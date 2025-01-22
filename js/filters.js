import { getRandomUniqueNumbers, debounce } from './utils.js';
import { createThumbnails } from './create-thumbnails.js';

const filtersElement = document.querySelector('.img-filters');
const filterButtonsElement = filtersElement.querySelectorAll('.img-filters__button');
const filterDefaultButton = filtersElement.querySelector('#filter-default');
const filterRandomElement = filtersElement.querySelector('#filter-random');
const filterDiscussedElement = filtersElement.querySelector('#filter-discussed');

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUCE_TIME = 500;

// Объект с названиями фильтров
const FilterTypes = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

// Очистка списка миниатюр
const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => thumbnail.remove());
};

// Применение сортировки
const applyFilter = (photos, filter) => {
  clearThumbnails();
  let filteredPhotos = photos.slice();

  if (filter === FilterTypes.DEFAULT) {
    filteredPhotos.sort((a, b) => a.id - b.id);
  }

  if (filter === FilterTypes.RANDOM) {
    const randomIds = getRandomUniqueNumbers(0, photos.length - 1, RANDOM_PHOTOS_COUNT);
    filteredPhotos = randomIds.map((index) => photos[index]);
  }

  if (filter === FilterTypes.DISCUSSED) {
    filteredPhotos.sort((a, b) => b.comments.length - a.comments.length);
  }

  createThumbnails(filteredPhotos);
};

// Отображение сортировки
const showFilters = (photos) => {
  filtersElement.classList.remove('img-filters--inactive');

  const debouncedApplyFilter = debounce((filter) => applyFilter(photos, filter), DEBOUCE_TIME);

  filterButtonsElement.forEach((button) => {
    button.addEventListener('click', () => {
      const activeElement = filtersElement.querySelector('.img-filters__button--active');
      activeElement.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');

      if (button === filterDefaultButton) {
        debouncedApplyFilter(FilterTypes.DEFAULT);
      }

      if (button === filterRandomElement) {
        debouncedApplyFilter(FilterTypes.RANDOM);
      }

      if (button === filterDiscussedElement) {
        debouncedApplyFilter(FilterTypes.DISCUSSED);
      }
    });
  });
};

export { showFilters, FilterTypes };
