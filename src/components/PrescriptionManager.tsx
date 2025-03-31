import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { Input } from "./ui/input";
import Button from "./ui/button";
import usePrescriptions from "../hooks/use-prescriptions";
import * as DocumentPicker from "expo-document-picker";
import { useAppSelector } from "../store/hooks";
import { sendfileRequest } from "../requests/SendfileRequest";
import DateTimePicker from '@react-native-community/datetimepicker';
const PrescriptionManager = () => {
    const prescriptions = usePrescriptions();

    const [doctorName, setDoctorName] = useState('');
    const [visitDate, setVisitDate] = useState<Date>(new Date());
    const [Prescfile, setPrescfile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const {username} = useAppSelector((state) => state.auth);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const onDateChange = (event: any, selectedDate?: Date): void => {
      setShowDatePicker(false);
      if (selectedDate) {
        setVisitDate( selectedDate);
      }
     };
  
    const pickPrescDocument = async (): Promise<void> => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
         type: "*/*",
         multiple: false,
        });
   
        if (!result.canceled) {
        // Typeguard: Check if the result is a success and contains the 'uri'
        setPrescfile(result.assets[0]);
       }
      } catch (err) {
         console.error("Error picking document:", err);
      }
   };

   const handlePrescUpload = async () => {
    if (!Prescfile) {
      alert("Please select a file first.");
      return;
    }
  
    // Create a FormData object
    if ('uri' in Prescfile) {
      const sanitizedFileName = Prescfile.name.replace(/\s+/g, "_");
      const formData = new FormData();
  
      // Append fields to formData
      formData.append("name", "Presc_file");
      formData.append("user_name", username);
      formData.append("doctor_name", doctorName);
      formData.append("prescribed_date", visitDate.toISOString().split('T')[0]);
      
      // Append file with URI, type, and name
      formData.append("file", {
        uri: Prescfile.uri,
        type: Prescfile.mimeType || "application/octet-stream", // added fallback for mimeType
        name: sanitizedFileName,
      } as any);
  
    //Sending via Axios
    await sendfileRequest(formData);
    setDoctorName('');
    setVisitDate(new Date());
    setPrescfile(null);
    }
   };
    return (
        <ScrollView style={[styles.scrollView]}>
        <View style={{marginTop: 16}}></View>
        <Text style={styles.header}>Recent Prescriptions</Text>
        <View style={styles.listContainer}>
          {prescriptions.map((prescription, index) => (
            <View key={index} style={styles.prescriptionItem}>
              <View>
                <Text style={styles.boldText}>{`Dr. ${prescription.doctorName || "Unknown Doctor"}`}</Text>
                <Text style={styles.lightText}>{`Visit Date: ${prescription.prescribedDate || "Not Available"}`}</Text>
              </View>
              {/* <TouchableOpacity style={styles.button} onPress={() => console.log("Open PDF", prescription.url)}>
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity> */}
            </View>
          ))}
        </View>
        <View style={{ borderTopWidth: 0.5, paddingTop: 16}}>
          <Text style={styles.header}>Upload New Prescription</Text>
          <View style={{ marginTop:8 }}>
            <Text style={styles.labelText}> Doctor Name</Text>
            <Input  placeholder="Enter doctor's name" value={doctorName} onChangeText={setDoctorName} />  
          </View>
          <View style={{ marginTop:8 }}>
            <Text style={styles.labelText}> Visit Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                value={ visitDate ? visitDate.toLocaleDateString() : ''}
                editable={false}
                placeholderTextColor={"#0000000"}
                placeholder="mm/dd/yyyy"
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop:8 }}>
            <Text style={styles.labelText}>Upload Prescription File</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickPrescDocument}>
              <Text style={styles.uploadButtonText}>
                {Prescfile ? Prescfile.name : 'Choose File '}
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "#64748b", fontSize: 12 }}>Supported Formats: PDF, JPG, PNG</Text>
            <Button  onPress={handlePrescUpload} disabled={!doctorName || !visitDate}>Upload Prescription </Button >
          </View>
        </View>
        {showDatePicker && (
        <DateTimePicker
          value={visitDate}
          mode="date"
          onChange={onDateChange}
        />
      )}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        height: 300,
        flex: 1,
        width: "100%",
      },
      indicator: {
        backgroundColor: "#000",
        height: 2,
      },
      tabText: {
        color: "#888",
        fontSize: 14,
      },
      tabItem: {
        flex: 1, // Ensures equal spacing
        alignItems: "center", // Centers text
        justifyContent: "center",
        paddingHorizontal: 0, // Prevents text wrapping
      },
      activeText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "bold",
      },
      tabContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      },
      header: {
        fontSize: 18,
        fontWeight: 500,
      },
      listContainer: {
        maxHeight: 200,
        overflow: "hidden",
        borderWidth: 0.4,
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
      },
      prescriptionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
      },
      boldText: {
        fontWeight: "bold",
      },
      lightText: {
        color: "gray",
      },
      labelText: {
        fontWeight: 500,
        marginBottom: 8,
      },
      button: {
        backgroundColor: "#007bff",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: "#fff",
      },
      uploadButton: {
        width: "100%",
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
       },
       uploadButtonText: {
        color: '#666',
       },
       input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
       },
})

export default PrescriptionManager;