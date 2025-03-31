import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { Input } from "./ui/input";
import Button from "./ui/button";
import { LabReport } from "../hooks/use-labreports";
import useLabReports from "../hooks/use-labreports";
import * as DocumentPicker from "expo-document-picker";
import { useAppSelector } from "../store/hooks";
import { sendfileRequest } from "../requests/SendfileRequest";
import DateTimePicker from '@react-native-community/datetimepicker';

const LabReportManager = () => {
	const LabReports:LabReport[] = useLabReports();
	const {username} = useAppSelector((state) => state.auth);
	const [testName, setTestName] = useState('');
	const [testDate, setTestDate] = useState<Date>(new Date());
	const [LRfile, setLRfile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

	const onDateChange = (event: any, selectedDate?: Date): void => {
		setShowDatePicker(false);
		if (selectedDate) {
		  setTestDate( selectedDate);
		}
	 };

	const pickLRDocument = async (): Promise<void> => {
		try {
		  const result = await DocumentPicker.getDocumentAsync({
			 type: "*/*",
			 multiple: false,
		  });
	 
		  if (!result.canceled) {
			// Typeguard: Check if the result is a success and contains the 'uri'
			setLRfile(result.assets[0]);
		 }
		} catch (err) {
			 console.error("Error picking document:", err);
		}
	 };

	 const handleLRUpload = async () => {
		if (!LRfile) {
		  alert("Please select a file first.");
		  return;
		}
  
		// Create a FormData object
		if ('uri' in LRfile) {
			const sanitizedFileName = LRfile.name.replace(/\s+/g, "_");
			const formData = new FormData();
	
			// Append fields to formData
			formData.append("name", "LR_file");
			formData.append("user_name", username);
			formData.append("test_name", testName);
			formData.append("test_date", testDate.toISOString().split('T')[0]);
			
			// Append file with URI, type, and name
			formData.append("file", {
			  uri: LRfile.uri,
			  type: LRfile.mimeType || "application/octet-stream", // added fallback for mimeType
			  name: sanitizedFileName,
			} as any);
  
    //Sending via Axios
    await sendfileRequest(formData);
    setTestName('');
    setTestDate(new Date());
    setLRfile(null);
    }
   };

    return (
        <ScrollView style={[styles.scrollView]}>
            <View style={{marginTop: 16}}></View>
                <Text style={styles.header}>Recent Lab Reports</Text>
                    <View style={styles.listContainer}>
                        {LabReports.map((LR, index) => (
                              <View key={index} style={styles.prescriptionItem}>
                                <View>
                                  <Text style={styles.boldText}>{`Dr. ${LR.testName || "Unknown Doctor"}`}</Text>
                                  <Text style={styles.lightText}>{`Visit Date: ${LR.testDate || "Not Available"}`}</Text>
                                </View>
                                {/* <TouchableOpacity style={styles.button} onPress={() => console.log("Open PDF", prescription.url)}>
                                  <Text style={styles.buttonText}>View</Text>
                                </TouchableOpacity> */}
                              </View>
                            ))}
                          </View>
                          <View style={{ borderTopWidth: 0.2, paddingTop: 16}}>
                            <Text style={styles.header}>Upload New Lab Report</Text>
                            <View style={{ marginTop:8 }}>
                              <Text style={styles.labelText}> Test Name</Text>
                              <Input  placeholder="Enter Test name" value={testName} onChangeText={setTestName} />  
                            </View>
                            <View style={{ marginTop:8 }}>
                              <Text style={styles.labelText}> Test Date</Text>
										          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <TextInput
                                  style={styles.input}
                                	value={ testDate ? testDate.toLocaleDateString() : ''}
                                  editable={false}
                                  placeholderTextColor={"#0000000"}
                                  placeholder="mm/dd/yyyy"
                                />
        								      </TouchableOpacity>
                            </View>
                            <View style={{ marginTop:8 }}>
                              <Text style={styles.labelText}>Upload Lab Report File</Text>
                              <TouchableOpacity style={styles.uploadButton} onPress={pickLRDocument}>
                              	<Text style={styles.uploadButtonText}>
                              		{LRfile ? LRfile.name : 'Choose File '}
                              	</Text>
        								      </TouchableOpacity>
                              <Text style={{ color: "#64748b", fontSize: 12 }}>Supported Formats: PDF, JPG, PNG</Text>
                              <Button  onPress={handleLRUpload} disabled={!testName || !testDate}>Upload Prescription </Button >
                            </View>
                          </View>
								  {showDatePicker && (
        <DateTimePicker
          value={testDate}
          mode="date"
          onChange={onDateChange}
        />
      )}
         </ScrollView>
    );
}

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
});

export default LabReportManager;