import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { List, Avatar } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utilities/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const SettingsItem = styled(List.Item)`
    padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
    align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
    const [photo, setPhoto] = useState(null);

    const { onLogout, user } = useContext(AuthenticationContext);

    const getProfilePicture = async (currentUser) => {
        const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
        setPhoto(photoUri);
    };

    useFocusEffect(() => {
        getProfilePicture(user);
    });

    return (
        <SafeArea>
            <AvatarContainer>
                <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
                    {!photo ? (
                        <Avatar.Icon
                            size={180}
                            icon="human"
                            backgroundColor="#2182BD"
                        />
                    ) : (
                        <Avatar.Image
                            size={180}
                            source={{ uri: photo }}
                            backgroundColor="#2182BD"
                        />
                    )}
                </TouchableOpacity>
                <Spacer size="large">
                    <Text variant="label">{user.email}</Text>
                </Spacer>
            </AvatarContainer>

            <List.Section>
                <SettingsItem
                    title="Favourites"
                    description="View your favourites"
                    left={(props) => {
                        return (
                            <List.Icon {...props} color="black" icon="heart" />
                        );
                    }}
                    onPress={() => navigation.navigate("Favourites")}
                />
                <SettingsItem
                    title="Logout"
                    left={(props) => (
                        <List.Icon {...props} color="black" icon="door" />
                    )}
                    onPress={onLogout}
                />
            </List.Section>
        </SafeArea>
    );
};
