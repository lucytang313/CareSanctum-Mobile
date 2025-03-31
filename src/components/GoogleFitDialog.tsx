import { Dialog, Icon } from "@rneui/themed";
import Button from "./ui/button";
import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import GoogleLogo from "./ui/GoogleIcon";

interface GoogleFitDialogProps {
    isGoogleFitDialogOpen: boolean;
    setIsGoogleFitDialogOpen: (open: boolean) => void;
    isGoogleFitConnected: boolean;
    handleConnectGoogleFit: () => void;
  }
  const GoogleFitDialog: React.FC<GoogleFitDialogProps> = ({
    isGoogleFitDialogOpen,
    setIsGoogleFitDialogOpen,
    isGoogleFitConnected,
    handleConnectGoogleFit,
  }) => {
    return (
      <Dialog
        isVisible={isGoogleFitDialogOpen}
        onBackdropPress={() => setIsGoogleFitDialogOpen(false)}
      >
        <Dialog.Title title={isGoogleFitConnected ? "Connected to Google Fit" : "Connect Google Fit"} />
        <Text style={{ marginBottom: 10 }}>
          Access your health data from Google Fit to get more insights.
        </Text>
  
        {isGoogleFitConnected ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#ECFDF5",
              borderWidth: 1,
              borderColor: "#A7F3D0",
              borderRadius: 8,
            }}
          >
            <Icon name="check-circle" type="feather" color="#059669" />
            <Text style={{ marginLeft: 8, color: "#059669", fontWeight: "600" }}>
              Your Google Fit account is connected
            </Text>
          </View>
        ) : (
          <Button
            onPress={handleConnectGoogleFit}
            style={{ marginTop: 10 }}
          >
            <GoogleLogo />
            <Text style={{color:"white"}}>Conect with Google</Text>
        </Button>
        )}
  
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontWeight: "600", marginBottom: 5 }}>How to connect your wearable device:</Text>
          <Text>1.Install Google Fit app on your phone</Text>
          <Text>2.Connect your wearable device to Google Fit</Text>
          <Text>3.Allow health data access permissions</Text>
          <Text>4.Sync your device with Google Fit</Text>
        </View>
  
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#EFF6FF",
            borderWidth: 1,
            borderColor: "#BFDBFE",
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <Icon name="info" type="feather" color="#1E40AF" />
          <Text style={{ marginLeft: 8, color: "#1E40AF", fontSize: 12 }}>
            Need help setting up your device? Contact your Care Manager at support@caresanctum.com
          </Text>
        </View>
  
        <Dialog.Actions>
          <Button  variant="outline" onPress={() => setIsGoogleFitDialogOpen(false)} >Close</Button>
        </Dialog.Actions>
      </Dialog>
    );
  };
  
  export default GoogleFitDialog;
  