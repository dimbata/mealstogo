const { mocks, addMockImage } = require("./mock");
const url = require("url");
const functions = require("firebase-functions");

const addGoogleImage = (restaurant) => {
    //console.log(restaurant.photos[0].photo_reference);

    // if (restaurant.photos !== null) {
    //     const ref = restaurant.photos[0].photo_reference;
    //     restaurant.photos = [
    //         `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
    //             functions.config().google.key
    //         }`,
    //     ];
    //     return restaurant;
    // } else {
    //     restaurant.photos = [
    //         "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg",
    //     ];
    //     return restaurant;
    // }

    try {
        const ref = restaurant.photos[0].photo_reference;

        restaurant.photos = [
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
                functions.config().google.key
            }`,
        ];
        return restaurant;
    } catch (err) {
        restaurant.photos = [
            "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg",
        ];
        return restaurant;
    }

    //console.log(ref);
    // if (!ref) {
    //     restaurant.photos = [
    //         "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg",
    //     ];
    //     return restaurant;
    // } else {
    //     restaurant.photos = [
    //         `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
    //             functions.config().google.key
    //         }`,
    //     ];
    //     return restaurant;
    // }
};

module.exports.placesRequest = (request, response, client) => {
    const { location, mock } = url.parse(request.url, true).query;
    if (mock === "true") {
        const data = mocks[location];
        if (data) {
            data.results = data.results.map(addMockImage);
        }
        return response.send(data);
    }

    client
        .placesNearby({
            params: {
                location: location,
                radius: 500,
                type: "restaurant",
                key: functions.config().google.key,
            },
            timeout: 1000,
        })
        .then((res) => {
            res.data.results = res.data.results.map(addGoogleImage);
            return response.json(res.data);
        })
        .catch((err) => {
            console.log(err);
            response.status(400);
            return response.send(err.response.data.error_message);
        });
};
