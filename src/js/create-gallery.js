const galleryEl = document.querySelector('.gallery');

function createGallery(images) {
  const markup = images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return `<div class="photo-card">
              <a href="${largeImageURL}">
                <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
              </a>
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                  ${likes}
                </p>
                <p class="info-item">
                  <b>Views</b>
                  ${views}
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  ${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  ${downloads}
                </p>
              </div>
          </div>`
    }).join(''); 
    galleryEl.insertAdjacentHTML('beforeend', markup);
};

export {createGallery, galleryEl};