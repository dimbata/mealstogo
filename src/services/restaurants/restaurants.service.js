import { mockImages, mocks } from "./mock";
import camelize from "camelize";

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
        restaurant.photos = restaurant.photos.map((photo) => {
            return mockImages[Math.ceil(Math.random() * mockImages.length - 1)];
        });

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
    const result = await mocks[location];

    if (!result) {
        throw new Error("BRUH");
    }
    return result;
};

restaurantsRequest("37.7749295,-122.4194155", (response) => {
    //console.log(restaurantsTransform(response));
});
