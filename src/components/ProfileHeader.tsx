import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from "./ui/button";
import { useNavigation } from "@react-navigation/native";

const ProfileHeader = () => {
    const navigation = useNavigation<any>();
    const handleBackPress = () => {
        navigation.goBack();  // This will take the user to the previous screen
      };
    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            <View style={styles.headerContainer}>
                <View style={styles.innerContainer}>
                    <Button variant="outline" onPress={handleBackPress}>
                        Back
                    </Button>
                    <Button variant="outline" onPress={() => navigation.navigate('Main' , { screen : 'Onboarding'})}>
                        Edit Profile
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        zIndex: 10,
    },
    headerContainer: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.81,
        elevation: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        zIndex: 20,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    avatarContainer: {
        padding: 4,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: -1000, // Extended to cover screen
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 25,
    },
    menuContainer: {
        position: 'absolute',
        right: 16,
        top: 50,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 12, // Rounded corners
        padding: 10,
        zIndex: 30,
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    menuItem: {
        marginLeft: 8,
        fontSize: 16,
    }
});
export default ProfileHeader;