import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_vv5ZKm1GdOokc2yztlg2j52uDIoAzEkmcAO90I7rHHe7heJ4n2CIKG2m6vreIEqS";

const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY = "live_vv5ZKm1GdOokc2yztlg2j52uDIoAzEkmcAO90I7rHHe7heJ4n2CIKG2m6vreIEqS";

const options = {
    method: 'GET',
    headers: { 'x-api-key': API_KEY }
}

export function fetchBreeds() {
    const END_POINT = "/breeds";
    return fetch(`${BASE_URL}${END_POINT}`, options)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
}

export function fetchCatByBreed(breedId) {
    const END_POINT = "/images/search";
    return fetch(`${BASE_URL}${END_POINT}?breed_ids=${breedId}`, options)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })

}