import React, { useContext, useState } from "react";
import { View, Pressable } from "react-native";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utilities/safe-area.component";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

import { Search } from "../components/search.component";

import { RestaurantList } from "../components/restaurant-list.styles";
import { FadeInView } from "../../../components/animations/fade.animation";

const Loading = styled(ActivityIndicator)`
    margin-left: -25px;
`;

const LoadingContainer = styled(View)`
    position: absolute;
    top: 50%;
    left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
    const { restaurants, isLoading, isError } = useContext(RestaurantsContext);
    const { favourites } = useContext(FavouritesContext);
    const [isToggled, setIsToggled] = useState(false);

    return (
        <SafeArea>
            <Search
                isFavouritesToggled={isToggled}
                onFavouritesToggle={() => {
                    setIsToggled(!isToggled);
                }}
            />
            {isToggled && (
                <FavouritesBar
                    favourites={favourites}
                    onNavigate={navigation.navigate}
                />
            )}
            {isLoading ? (
                <LoadingContainer>
                    <Loading size={50} color={Colors.blue600} />
                </LoadingContainer>
            ) : (
                <RestaurantList
                    data={restaurants}
                    renderItem={({ item }) => {
                        return (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("RestaurantDetail", {
                                        restaurant: item,
                                    })
                                }
                            >
                                <RestaurantInfoCard restaurant={item} />
                            </Pressable>
                        );
                    }}
                    keyExtractor={(item) => item.name}
                />
            )}
        </SafeArea>
    );
};
