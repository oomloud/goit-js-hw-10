// TODO: BONUS: temperament as a cloud of tags

// API_KEY: live_vv5ZKm1GdOokc2yztlg2j52uDIoAzEkmcAO90I7rHHe7heJ4n2CIKG2m6vreIEqS

import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';



const elements = {
    selector: document.querySelector(".breed-select"),
    info: document.querySelector(".cat-info"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".loader")
}

elements.selector.addEventListener('change', selectHandler);

// launching placeholder animation for list of breeds loading
Loading.circle("Loading...");

// adding placeholder element of the list
elements.selector.innerHTML = `<option disabled selected>Select a breed...</option>`

// getting the list of breeds 
fetchBreeds()
    .then(data => {
        const breedList = data.map(breed => {
            return { name: breed.name, id: breed.id }
        })
        return breedList
    })
    .then(breedList => {
        elements.selector.insertAdjacentHTML("beforeend", selectMarkup(breedList).join(""));
        // new Choices(elements.selector, {
        //     allowHTML: true,
        // });
    })
    .catch(err => {
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
        console.log(err);
    })
    .finally(data => {
        elements.selector.style.display = 'block';
        Loading.remove();
    })

// working on getting info about selected breed
function selectHandler(evt) {
    Loading.circle("Loading");
    fetchCatByBreed(evt.currentTarget.value)
        .then(data => {
            Loading.circle("Loading");
            console.dir(elements.info);
            elements.info.innerHTML = infoMarkup(data);
        })
        .catch(err => {
            Notify.failure('Oops! Something went wrong! Try reloading the page!')
            console.log(err);
        })
        .finally(data => Loading.remove())
}

// populating the Select input with names of the breeds
function selectMarkup(arr) {
    return arr.map(({ name, id }) => `<option value="${id}">${name}</option>`)
}

// populating the selected breed contents
function infoMarkup(breed) {
    const { name, description, temperament } = breed[0].breeds[0];
    const imgUrl = breed[0].url
    const markup =
        `<div class="cat-info-img">
            <img src="${imgUrl}" alt="${name}" width="100%" preload="lazy">
        </div>
        <div class="cat-info-content">      
            <h1>${name}</h1>
            <h2>${temperament}</h2>
            <p>${description}</p>
        </div>`
    return markup;
}

Notify.init({
    position: 'right-top',
    width: '360px',
    fontSize: '16px',
    useIcon: true,
})

