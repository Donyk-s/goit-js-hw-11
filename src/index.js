import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '34476830-b52e87f2018fae84058c602d8';
const PER_PAGE = 40;

const refs = {
  searching: document.querySelector('[name="searchQuery"]'),
  form: document.querySelector('.search-form'),
  query: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;
let currentQuery = '';
refs.loadMoreBtn.style.display = 'none';

refs.form.addEventListener('submit', handleSearch);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const query = refs.query.value.trim();

  if (query === '') {
    Notiflix.Notify.warning('Please enter a search query.');
    return;
  }

  if (query !== currentQuery) {
    page = 1;
    refs.gallery.innerHTML = '';
  }

  currentQuery = query;
  refs.loadMoreBtn.classList.add('is-hidden');

  const url = `${API_URL}?key=${API_KEY}&q=${currentQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`;

  try {
    const response = await axios.get(url);

    if (response.data.hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    const images = response.data.hits.map(hit => ({
      webformatURL: hit.webformatURL,
      largeImageURL: hit.largeImageURL,
      tags: hit.tags,
      likes: hit.likes,
      views: hit.views,
      comments: hit.comments,
      downloads: hit.downloads,
    }));

    const html = images
      .map(
        image => `
          <a href="${image.largeImageURL}" class="gallery__item">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">Likes: ${image.likes}</p>
              <p class="info-item">Views: ${image.views}</p>
              <p class="info-item">Comments: ${image.comments}</p>
              <p class="info-item">Downloads: ${image.downloads}</p>
            </div>
          </a>
        `
      )
      .join('');

    refs.gallery.insertAdjacentHTML('beforeend', html);

    if (response.data.totalHits <= page * PER_PAGE) {
      refs.loadMoreBtn.style.display = 'none';
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      refs.loadMoreBtn.classList.remove('is-hidden');
      refs.loadMoreBtn.style.display = 'block';
    }

    page++;

    // Ініціалізація SimpleLightbox після додавання нових картинок
    const lightbox = new SimpleLightbox('.gallery a', {});
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}
async function handleLoadMore() {
  refs.loadMoreBtn.disabled = true;
  await handleSearch(new Event('submit'));
  refs.loadMoreBtn.disabled = false;
}
