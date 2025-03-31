import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { View, Text, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { getCMdetailsRequest } from "../requests/GetCMdetailsRequest";
import { useAppSelector } from "../store/hooks";
import { contactCMRequest } from "../requests/ContactCMRequest";
import Button from "./ui/button";
import { Mail, Phone } from "lucide-react-native";
const ContactCareMangerCard = () => {
    const [CMDetails, setCMdetails] = useState<any>(null);
    const {username} = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            // Call the function
          const CMdata = await getCMdetailsRequest(username);
          setCMdetails(CMdata);

        } catch (error: any) {
          console.log(error);
        }
      };
  
      fetchUserDetails();  // Run the function on mount
    }, []);

    const handleContact = async () => {
        setLoading(true);
        const message = await contactCMRequest(username);
        setLoading(false);
      }

    return (
        <View>
            <Card>
                <CardHeader>
                    <CardTitle>Support</CardTitle>
                </CardHeader>
                <CardContent>
                    <View style={{marginBottom: 16}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Mail size="20" color="grey"/>
                            <Text style={{color: "#374151"}}>{CMDetails?.care_manager?.email}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Phone size ="20" color="grey"/>
                            <Text style={{color: "#374151"}}>{CMDetails?.care_manager?.phone_number}</Text>
                        </View>
                    </View>
                    <Button onPress={handleContact} disabled={!CMDetails?.care_manager?.email || !CMDetails?.care_manager?.phone_number}>
                        {loading ?  (
                            <ActivityIndicator size="small" color="white" />
                        ): (
                            <Text style={{color:"white"}}>Contact Care Manager</Text>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </View>
    )
}

export default ContactCareMangerCard;