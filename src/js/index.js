import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {getImages} from "./API_pixabay";
import {createGallery, galleryEl} from "./create-gallery";

const formEl = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const endGallery = document.querySelector('.text-end-gallery');

let query = null;
let currentPage = null;
let currentHits = null;
let results = "";

formEl.addEventListener('submit', onSearchBtnClick);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onSearchBtnClick(e) {
    e.preventDefault();

    const form = e.currentTarget;
    query = form.elements.searchQuery.value.trim();
    currentPage = 1;
    results = await getImages(query, currentPage);
    currentHits = results.hits.length;        

    if(query === "") {
        galleryEl.innerHTML = "";
        Notify.failure('Please, write what you want to find...');
        return;
    } else if(results.totalHits === 0) {
        galleryEl.innerHTML = "";
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    } else if(results.totalHits < 40) {
        resultsLoad();
        endGallery.classList.remove('hidden');
    } else { 
        resultsLoad(); 
        loadMoreBtn.classList.remove('hidden');
        endGallery.classList.add('hidden');

    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * -10,
            behavior: "smooth",
        });
    }                
};

function resultsLoad () {
        galleryEl.innerHTML = "";        
        createGallery(results.hits);
        lightbox.refresh();
        Notify.success(`Hooray! We found ${results.totalHits} images.`);
}

async function onLoadMoreBtnClick (e) {
    currentPage += 1;
    results = await getImages(query, currentPage);
    createGallery(results.hits);
    lightbox.refresh(); 
    currentHits += results.hits.length;    
    
    if(currentHits === results.totalHits || currentHits > results.totalHits) {
        loadMoreBtn.classList.add('hidden');
        endGallery.classList.remove('hidden');
    } 
};

let lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });












 

  












