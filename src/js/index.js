/*import axios from 'axios';*/
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {getImages} from "./API_pixabay";
import {createGallery} from "./create-gallery";

const ref = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery')
}

ref.form.addEventListener('submit', onSearchClick);

async function onSearchClick(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const query = form.elements.searchQuery.value.trim();

    const results = await getImages(query);

    if(results.totalHits === 0) {
        ref.gallery.innerHTML = "";
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }     
    createGallery(results.hits);          
};





 

  












