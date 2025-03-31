import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet,GestureResponderEvent } from 'react-native'
import { Camera } from 'lucide-react-native'
import { Avatar as RNEAvatar } from 'react-native-elements'
import { launchImageLibrary } from 'react-native-image-picker'



const Avatar = ({ source, size = 35 }: { source: string, size?: number }) => (
  <RNEAvatar
    rounded
    size={size}
    source={{ uri: source }}
    containerStyle={{ margin: 5 }}
  />
)

interface AvatarWithCameraProps {
  source: string;
  handleUpload: () => void;
  size?: number;
}

const AvatarWithCamera = ({ 
  source, 
  handleUpload, 
  size = 35 
}: AvatarWithCameraProps) => {

  return (
    <View style={{ position: 'relative' }}>
      <RNEAvatar
        rounded
        size={size}
        source={{ uri: source }}
        containerStyle={{ margin: 5 }}
      />
      <TouchableOpacity
        onPress={(event: GestureResponderEvent) => handleUpload()}
        style={styles.cameraButton}
      >
        <Camera size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const AvatarFallback = () => (
  <View style={styles.fallbackContainer}>
    <Text style={styles.fallbackText}>No Image</Text>
  </View>
)

const styles = StyleSheet.create({
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 50,
  },
  fallbackContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4E4E4',
    borderRadius: 50,
  },
  fallbackText: {
    color: 'gray',
  }
})

export { Avatar, AvatarWithCamera, AvatarFallback }
