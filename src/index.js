import Notiflix from 'notiflix';
import axios, { Axios } from 'axios';
// import { fetchImg } from './fetchImg.js';

const API_URL = 'https://pixabay.com/api/';
// const YOUR_API_KEY = '34476830 - b52e87f2018fae84058c602d8';

const refs = {
  searching: document.querySelector('[name="searchQuery"]'),
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};
console.log(refs.searching);
console.log(refs.form);
console.log(refs.gallery);
refs.searching.addEventListener('submit', handleSearch);
async function handleSearch(event) {
  event.preventDefault();

  refs.searching.value.trim();
  if (query === '') {
    Notiflix.Notify.warning('Please enter a search query.');
    return;
  }

  const apiKey = '34476830 - b52e87f2018fae84058c602d8';
  const url = `${API_URL}?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

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

    // Відобразити знайдені зображення
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}
