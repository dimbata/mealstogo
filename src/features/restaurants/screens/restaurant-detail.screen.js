import React, { useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

import { SafeArea } from "../../../components/utilities/safe-area.component";

export const RestaurantDetailScreen = ({ route }) => {
    const [breakfastExpanded, setBreakfastExpanded] = useState(false);
    const [lunchExpanded, setLunchExpanded] = useState(false);
    const [dinnerExpanded, setDinnerExpanded] = useState(false);
    const [drinksExpanded, setDrinksExpanded] = useState(false);
    const { restaurant } = route.params;
    return (
        <SafeArea>
            <RestaurantInfoCard restaurant={restaurant} />
            <ScrollView>
                <List.Accordion
                    title="Breakfast"
                    expanded={breakfastExpanded}
                    left={(props) => (
                        <List.Icon {...props} icon="bread-slice" />
                    )}
                    onPress={() => setBreakfastExpanded(!breakfastExpanded)}
                >
                    <List.Item title="Eggs Benedict" />
                    <List.Item title="Classic Breakfast" />
                </List.Accordion>
                <List.Accordion
                    title="Lunch"
                    expanded={lunchExpanded}
                    left={(props) => <List.Icon {...props} icon="hamburger" />}
                    onPress={() => setLunchExpanded(!lunchExpanded)}
                >
                    <List.Item title="Burger" />
                    <List.Item title="Soup" />
                </List.Accordion>
                <List.Accordion
                    title="Dinner"
                    expanded={dinnerExpanded}
                    left={(props) => (
                        <List.Icon {...props} icon="food-variant" />
                    )}
                    onPress={() => setDinnerExpanded(!dinnerExpanded)}
                >
                    <List.Item title="Steak" />
                    <List.Item title="Musaka" />
                </List.Accordion>
                <List.Accordion
                    title="Drinks"
                    expanded={drinksExpanded}
                    left={(props) => <List.Icon {...props} icon="cup" />}
                    onPress={() => setDrinksExpanded(!drinksExpanded)}
                >
                    <List.Item title="Fanta" />
                    <List.Item title="Coke" />
                </List.Accordion>
            </ScrollView>
        </SafeArea>
    );
};
