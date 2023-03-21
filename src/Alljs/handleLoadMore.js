export async function handleLoadMore() {
  refs.loadMoreBtn.disabled = true;
  await handleSearch(new Event('submit'));
  refs.loadMoreBtn.disabled = false;
}
