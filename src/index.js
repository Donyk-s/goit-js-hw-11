// import Notiflix from 'notiflix';
// import axios, { Axios } from 'axios';
// // import { fetchImg } from './fetchImg.js';

// const API_URL = 'https://pixabay.com/api/';
// const YOUR_API_KEY = '34476830 - b52e87f2018fae84058c602d8';

import Notiflix from 'notiflix';
import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';

const refs = {
  searching: document.querySelector('[name="searchQuery"]'),
  form: document.querySelector('.search-form'),
  query: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  const query = refs.query.value.trim();
  refs.query.value.trim();
  if (query === '') {
    Notiflix.Notify.warning('Please enter a search query.');
    return;
  }

  const apiKey = '34476830-b52e87f2018fae84058c602d8';

  const url = `${API_URL}?key=${apiKey}&q=${refs.query.value}&image_type=photo&orientation=horizontal&safesearch=true`;

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
      <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${image.likes}</p>
          <p class="info-item"><b>Views:</b> ${image.views}</p>
          <p class="info-item"><b>Comments:</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </div>
    `
      )
      .join('');
    refs.gallery.insertAdjacentHTML('beforeend', html);
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}
