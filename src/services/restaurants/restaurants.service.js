import { mocks } from "./mock";
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

const camelizeResult = (result) => {
    return camelize(result);
};

export const restaurantsRequest = async (
    location = "37.7749295,-122.4194155",
    callback
) => {
    const result = await mocks[location];
    if (!result) {
        throw new Error("BRUH");
    }
    callback(result);
};

restaurantsRequest("37.7749295,-122.4194155", (response) => {
    console.log(camelizeResult(response));
});
