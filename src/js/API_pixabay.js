import axios from 'axios';

async function getImages(value, page) {
    const URL = "https://pixabay.com/api/";
    const KEY = "36598390-cbdb1c2a048b1a21985e72a4d";
    const options = `?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

    return await axios.get(`${URL}${options}`)
    .then(({data}) => data) 
    .catch(err => {
        console.error(err)
    })    
};
    
export {getImages};
  

   