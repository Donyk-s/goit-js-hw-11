import Notiflix from 'notiflix';
import axios, { Axios } from 'axios';
// import { fetchImg } from './fetchImg.js';

const DEBOUNCE_DELAY = 300;
const API_URL = 'https://pixabay.com/api/';
const myKey = '34476830 - b52e87f2018fae84058c602d8';
const myUrl = '${BASE_URL}?${myKey}q=yellow+flowers&image_type=photo';
console.log(myUrl);
const refs = {
  searching: document.querySelector('[name="searchQuery"]'),
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};
console.log(refs.searching);
console.log(refs.form);
console.log(refs.gallery);
axios.get(API_URL ? 34476830 - b52e87f2018fae84058c602d8 & q=cat & image_type=photo & orientation=horizontal & safesearch=true & page=$1 & per_page=20)
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
// refs.searching.addEventListener(
//   'input',
//   debounce(Event => {
//     const trimValue = refs.searching.value.trim();
//     cleanHtml();

//     if (trimValue !== '') {
//       fetchCountries(trimValue).then(response => {
//         if (response.length > 10) {
//           Notiflix.Notify.info(
//             'Too many matches found. Please enter a more specific name.'
//           );
//         } else if (response.length === 0) {
//           Notiflix.Notify.failure('Oops, there is no country with that name');
//         } else if (response.length >= 2 && response.length <= 10) {
//           renderCountryList(response);
//         } else if (response.length === 1) {
//           renderOneCountry(response);
//         }
//       });
//     }
//   }, DEBOUNCE_DELAY)
// );
// function cleanHtml() {
//   refs.countryList.innerHTML = '';
//   refs.countryInfo.innerHTML = '';
// }

// function renderCountryList(countries) {
//   const markup = countries
//     .map(el => {
//       return `<li>
//       <img src="${el.flags.svg}" alt="Flag of ${el.name.official}" width="30" hight="20">
//          <p>${el.name.official}</p>
//                 </li>`;
//     })
//     .join('');

//   refs.countryList.innerHTML = markup;
// }

// function renderOneCountry(countries) {
//   const markup = countries
//     .map(el => {
//       return `<li>
//       <img src="${el.flags.svg}" alt="Flag of ${
//         el.name.official
//       }" width="30" hight="20">
//          <p>${el.name.official}</p>
//             <p><b>Capital</b>: ${el.capital}</p>
//             <p><b>Population</b>: ${el.population}</p>
//             <p><b>Languages</b>: ${Object.values(el.languages)} </p>
//                 </li>`;
//     })
//     .join('');

//   refs.countryList.innerHTML = markup;
// }
