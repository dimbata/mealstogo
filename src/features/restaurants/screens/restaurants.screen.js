import React from "react";
import { View, SafeAreaView, StatusBar, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utilities/safe-area.component";
import styled from "styled-components/native";

const SearchContainer = styled(View)`
    padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
    contentContainerStyle: {
        padding: 16,
    },
})``;

export const RestaurantsScreen = () => (
    <SafeArea>
        <SearchContainer>
            <Searchbar />
        </SearchContainer>
        <RestaurantList
            data={[{ name: "2" }, { name: "asdas" }, { name: "123" }]}
            renderItem={() => <RestaurantInfoCard />}
            keyExtractor={(item) => item.name}
        />
    </SafeArea>
);
