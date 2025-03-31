import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from "./ui/avatar";
import { useNavigation } from "@react-navigation/native";
import { LogOut, Gift, CreditCard, UserCircle, FileHeart } from "lucide-react-native";
import * as SecureStore from 'expo-secure-store';
import { useAppSelector } from "../store/hooks";
import { viewRequest } from "../requests/ViewRequest";

const Header = () => {
    const navigation = useNavigation<any>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [profile_url, setprofile_url] = useState("https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010");
    const {username} = useAppSelector((state) => state.auth);
  
    const fetchprofilePicture = async () => {
      try {
        const data = await viewRequest(username);  // Call the function
        setprofile_url(data?.patient?.profile_picture_url || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010");
      } catch (error: any) {
        console.log(error);
      }
    };
      useEffect(() => {
        fetchprofilePicture();  // Run the function on mount
      }, [username]);
  
    const handleMenuItemPress = (action: string) => {
        console.log(`${action} pressed`);
        setMenuVisible(false);
    };

    const signout = async () => {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('username');
        navigation.navigate('Auth', { screen: 'Login' });
    }

    // Function to handle the "Health Records" navigation
    const handleHealthRecordsNavigation = () => {
        setMenuVisible(false); // Hide the menu first
        setTimeout(() => {
            navigation.navigate('Main', { screen: 'Health-Records' });
        }, 300); // Delay navigation by 300ms to allow the state update to complete
    };
    const handleProfileNavigation = () => {
        setMenuVisible(false); // Hide the menu first
        setTimeout(() => {
            navigation.navigate('Main', { screen: 'Profile' });
        }, 300); // Delay navigation by 300ms to allow the state update to complete     
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            <View style={styles.headerContainer}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity
                        style={styles.avatarContainer}
                        onPress={() => setMenuVisible(!menuVisible)}
                    >
                        <Avatar source={profile_url} />
                    </TouchableOpacity>
                </View>

                {menuVisible && (
                    <>
                        <TouchableOpacity
                            style={styles.backdrop}
                            activeOpacity={0.3}
                            onPress={() => setMenuVisible(false)}
                        />
                        <View style={styles.menuContainer}>
                            <TouchableOpacity
                                style={styles.menuItemContainer}
                                onPress={handleProfileNavigation}
                            >
                                <UserCircle size={20} color="black" />
                                <Text style={styles.menuItem}>Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.menuItemContainer}
                                onPress={() => handleMenuItemPress("Subscription")}
                            >
                                <CreditCard size={20} color="black" />
                                <Text style={styles.menuItem}>Subscription</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.menuItemContainer}
                                onPress={() => handleMenuItemPress("Referrals")}
                            >
                                <Gift size={20} color="black" />
                                <Text style={styles.menuItem}>Referrals</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.menuItemContainer}
                                onPress={handleHealthRecordsNavigation} // Use the updated function
                            >
                                <FileHeart size={20} color="black" />
                                <Text style={styles.menuItem}>Health Records</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.menuItemContainer, {backgroundColor: '#EF4444', borderRadius: 8,}]}
                                onPress={signout}
                            >
                                <LogOut size={20} color="white" />
                                <Text style={[styles.menuItem, {color: "white"}]}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

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
        justifyContent: 'flex-end',
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

export default Header;
