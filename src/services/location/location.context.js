import React, { createContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [keyword, setKeyword] = useState("San Francisco");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearch = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword);
    };

    useEffect(() => {
        if (!keyword.length) {
            return;
        }
        locationRequest(keyword.toLowerCase())
            .then(locationTransform)
            .then((result) => {
                setIsLoading(false);
                setLocation(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.log(err);
            });
    }, [keyword]);

    return (
        <LocationContext.Provider
            value={{ isLoading, error, location, keyword, search: onSearch }}
        >
            {children}
        </LocationContext.Provider>
    );
};
