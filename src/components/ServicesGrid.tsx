import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { newConciergeService } from "../requests/NewConciergeServiceRequest";
import Button from "./ui/button";
import { Pill, Car, ShoppingBag, Phone, LucideIcon} from "lucide-react-native";
type ServiceState = {
    [key: string]: boolean;
  };
  type LoadingState = {
    [key: string]: boolean;
  };
  
  const ServicesGrid = () => {
    const [selectedServices, setSelectedServices] = useState<ServiceState>({});
    const [loadingServices, setLoadingServices] = useState<LoadingState>({});
    const [isBooking, setIsBooking] = useState<{ [key: string]: boolean }>({}); // Track if a service is ready to book
    const { username } = useAppSelector((state) => state.auth);

    const handleServiceRequest = async (service: string) => {
        // Set loading state for this specific service
        setLoadingServices((prev) => ({ ...prev, [service]: true }));

        try {
            const response = await newConciergeService(username, service);
            console.log(`${service} request completed`);
        } catch (error) {
            console.error(`Error in ${service} request`, error);
        } finally {
            setLoadingServices((prev) => ({ ...prev, [service]: false }));
            setIsBooking((prev) => ({ ...prev, [service]: false })); // Reset booking state after request
        }
    };

    const handleBookNow = (service: string) => {
        // If the user clicked "Book Now", proceed with the service request
        if (isBooking[service]) {
            handleServiceRequest(service);
        } else {
            // Otherwise, mark the service as ready to be booked
            setIsBooking((prev) => ({ ...prev, [service]: true }));
        }
    };

    const renderServiceButton = (service: string, Icon: LucideIcon) => {
        const isLoading = loadingServices[service];
        const isReadyToBook = isBooking[service];

        return (
            <Button
                style={{ flexBasis: "48%", alignItems: "center", minHeight: 80, justifyContent: "center" }}
                onPress={() => handleBookNow(service)}
                variant="outline"
                disabled={isLoading}
            >
                <View style={styles.buttonContent}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#000000" />
                    ) : isReadyToBook ? (
                        <Text style={styles.buttonText}>Book Now</Text> // Show "Book Now" when ready
                    ) : (
                        <>
                            <Icon color="black" size={24} />
                            <View style={styles.buttonTextContainer}>
                                <Text style={styles.buttonText}>{service}</Text>
                            </View>
                        </>
                    )}
                </View>
            </Button>
        );
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle style={{fontWeight: 600, fontSize: 20}}>Concierge Services</CardTitle>
            </CardHeader>
            <CardContent style={styles.gridContainer}>
                {renderServiceButton("Medicine Delivery", Pill)}
                {renderServiceButton("Cab Booking", Car)}
                {renderServiceButton("Grocery Shopping", ShoppingBag)}
                {renderServiceButton("Other Assistance", Phone)}
            </CardContent>
        
        </Card>
    );

}

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 8,
    },
    button: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16, // Equivalent to py-4
        borderRadius: 8,
        width: "100%",
      },
      outlineButton: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "transparent",
      },
      buttonContent: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    buttonTextContainer: {
        marginTop: 8, // Add some space between icon and text
    },
    buttonText: {
        textAlign: "center",
    },
      iconContainer: {
        marginBottom: 8, // Equivalent to gap-2
        color: "black"
      },
});

export default ServicesGrid;