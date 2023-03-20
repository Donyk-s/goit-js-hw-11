export async function handleLoadMore() {
  refs.loadMoreBtn.disabled = true;
  await handleSearch(new Event('submit'));
  refs.loadMoreBtn.disabled = false;
}
const html = images
  .map(
    image => `
      <a href="${image.largeImageURL}" class="gallery__item">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="image-info">
          <p class="info-item"><i class="fas fa-heart"></i> ${image.likes}</p>
          <p class="info-item"><i class="fas fa-download"></i> ${image.downloads}</p>
          <p class="info-item"><i class="fas fa-eye"></i> ${image.views}</p>
          <p class="info-item"><i class="fas fa-comment"></i> ${image.comments}</p>
        </div>
      </a>
    `
  )
  .join('');
