import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Import the image asset
const profileLogo = require("../../assets/CS_logo_cropped_final.png");

export const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={profileLogo}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Add gap between items (if needed)
  },
  logo: {
    height: 56, // Adjust height as needed
    width: 64, // Adjust width as needed
    transform: [{ scale: 2.5 }], // Scale the logo
  },
});