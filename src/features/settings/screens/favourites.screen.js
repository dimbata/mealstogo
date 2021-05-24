import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utilities/safe-area.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";

import { Spacer } from "../../../components/spacer/spacer.component";

import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

const NoFavouritesArea = styled(SafeArea)`
    align-items: center;
    justify-content: center;
`;

export const FavouritesScreen = ({ navigation }) => {
    const { favourites } = useContext(FavouritesContext);

    if (favourites.length) {
        return (
            <SafeArea>
                <RestaurantList
                    data={favourites}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("RestaurantDetail", {
                                        restaurant: item,
                                    })
                                }
                            >
                                <Spacer position="bottom" size="large">
                                    <RestaurantInfoCard restaurant={item} />
                                </Spacer>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.name}
                />
            </SafeArea>
        );
    } else {
        return (
            <NoFavouritesArea>
                <Text>No favourites yet</Text>
            </NoFavouritesArea>
        );
    }
};
