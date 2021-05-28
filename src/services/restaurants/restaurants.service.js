import camelize from "camelize";
import { host, isMock } from "../../utils/env";

// export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
//     return new Promise((resolve, reject) => {
//         const mock = mocks[location];
//         if (!mock) {
//             reject("not found");
//         }
//         resolve(mock);
//     });
// };

// restaurantsRequest()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

export const restaurantsTransform = ({ results = [] }) => {
    const mappedResults = results.map((restaurant) => {
        return {
            ...restaurant,
            address: restaurant.vicinity,
            isClosedTemporarily:
                restaurant.business_status === "CLOSED_TEMPORARILY",
            isOpenNow:
                restaurant.opening_hours && restaurant.opening_hours.open_now,
        };
    });
    const camelizedMappedResults = camelize(mappedResults);
    return camelizedMappedResults;
};

export const restaurantsRequest = async (location) => {
    console.log(location);
    return fetch(
        `https://us-central1-mealstogo-3aa0d.cloudfunctions.net/placesNearby?location=${location}&mock=${isMock}`
    ).then((res) => {
        //const response = res.json();
        //console.log(response);
        return res.json();
    });
};
