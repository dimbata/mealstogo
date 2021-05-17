import React, { createContext, useState, useEffect } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [keyword, setKeyword] = useState("San Francisco");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearch = (searchKeyword) => {
        setIsLoading(true);

        if (!searchKeyword.length) {
            return;
        }
        setKeyword(searchKeyword);
        locationRequest(searchKeyword.toLowerCase())
            .then(locationTransform)
            .then((result) => {
                setIsLoading(false);
                setLocation(result);
                console.log(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.log(err);
            });
    };

    return (
        <LocationContext.Provider
            value={{ isLoading, error, location, keyword, search: onSearch }}
        >
            {children}
        </LocationContext.Provider>
    );
};
