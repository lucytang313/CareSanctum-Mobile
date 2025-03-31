import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Siren, FileHeart, Calendar, HandHelping, Home, UsersRound } from "lucide-react-native";

const BottomNav = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const isActive = (screenName: string) => route.name === screenName;

    return (
      <View style={styles.bottomNav}>
        <TouchableOpacity 
            style={[styles.navButton, isActive('Home') && styles.activeButton]}
            onPress={() => navigation.navigate('Main', { screen: 'Home' })}
            disabled={isActive('Home')}
        >
            <Home size={23} color="black" />
            <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.navButton, isActive('Scheduler') && styles.activeButton]}
            onPress={() => navigation.navigate('Main', { screen: 'Scheduler' })}
            disabled={isActive('Scheduler')}
        >
            <Calendar size={23} color="black" />
            <Text style={styles.navText}>Visits</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.navButton, {backgroundColor: "red", borderRadius: 20}]}
        >
            <Siren size={32} color="white" />
            <Text style={[styles.navText, {color: "white"}]}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.navButton, isActive('Concierge-Services') && styles.activeButton]}
            onPress={() => navigation.navigate('Main', { screen: 'Concierge-Services' })}
            disabled={isActive('Concierge-Services')}
        >
            <HandHelping size={23} color="black" />
            <Text style={styles.navText}>Concierge</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.navButton, isActive('Community-Events') && styles.activeButton]}
            onPress={() => navigation.navigate('Main', { screen: 'Community-Events' })}
            disabled={isActive('Community-Events')}
        >
            <UsersRound size={23} color="black" />
            <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        paddingVertical: 3,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navButton: {
        alignItems: 'center',  // Ensure the icon and text are centered
        justifyContent: 'center',
        padding: 0,
    },
    activeButton: {
        backgroundColor: '#e0e0e0', // Highlight the active button with a background color
        borderRadius: 10,
    },
    navText: {
        fontSize: 12,
        color: '#000',
        marginTop: 4,  // Space between the icon and text
        textAlign: 'center',
        width: 60,  // Prevent text wrapping and ensure it's one line
        overflow: 'hidden',  // Hide any overflow text
    }
});

export default BottomNav;
