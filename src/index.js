import './styles.css';
import galleryItemMarkup from './templates/gallery-template.hbs';
import apiService from './services/apiService';

const refs = {
  searchForm: document.querySelector('#search-form'),
  ulGallery: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('button[data-action="load-more"]'),
  buttonUpward: document.querySelector('.button-upward'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreButton.addEventListener('click', loadMoreButtonHandle);

function searchFormSubmitHandler(e) {
  e.preventDefault();
  const input = e.currentTarget.elements.query;

  clearListItems();
  apiService.resetPage();
  apiService.searchQuery = input.value;
  apiService.queryArticles().then(insertListItems);
  input.value = '';
}

function loadMoreButtonHandle() {
  apiService.queryArticles().then(insertListItems);
}

function insertListItems(resultItemCard) {
  const markup = galleryItemMarkup(resultItemCard);
  refs.ulGallery.insertAdjacentHTML('beforeend', markup);
  if (apiService.page > 2) {
    window.scrollBy({
      top: document.documentElement.clientHeight - refs.searchForm.offsetHeight,
      behavior: 'smooth',
    });
  }

  if (markup) {
    refs.loadMoreButton.classList.add('visible');
  }
}

function clearListItems() {
  refs.ulGallery.innerHTML = '';
}
refs.buttonUpward.addEventListener('click', () =>
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  }),
);
