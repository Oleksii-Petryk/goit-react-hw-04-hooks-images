export function API(queryImages, page) {
  const KEY = '23249426-cbed7229a7b2fc460ade288c0';
  return fetch(
    `https://pixabay.com/api/?q=${queryImages}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`There is no images with name "${queryImages}"`),
    );
  });
}
