import camelize from "camelize";
import { host, isMock } from "../../utils/env";

export const locationRequest = (searchTerm) => {
    return fetch(
        `https://us-central1-mealstogo-3aa0d.cloudfunctions.net/geocode?city=${searchTerm}&mock=${isMock}`
    ).then((res) => {
        return res.json();
    });
};

// fetch(
//     `http://localhost:5001/mealstogo-3aa0d/us-central1/geocode?city=${searchTerm}`
// )
//     .then((res) => {
//         return res.json();
//     })
//
// return fetch("https://www.google.com/")
//     .then((res) => {
//         if (res && res.length) {
//             console.log(res);
//             return res.json();
//         }
//     })
//     .catch((err) => console.log(err));

export const locationTransform = (result) => {
    const formattedResponse = camelize(result);
    const { geometry = {} } = formattedResponse.results[0];
    const { lat, lng } = geometry.location;

    return { lat, lng, viewport: geometry.viewport };
};
