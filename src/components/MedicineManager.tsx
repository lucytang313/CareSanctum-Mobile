import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { Input } from "./ui/input";
import Button from "./ui/button";
import useMedications from "../hooks/use-medications";
import { useAppSelector } from "../store/hooks";
import { uploadmedicationRequest } from "../requests/UploadMedicationRequest";
import DateTimePicker from '@react-native-community/datetimepicker';
const MedicineManager = () => {
    const {username} = useAppSelector((state) => state.auth);
    const [medicineName, setmedicineName] = useState('');
    const [dosage, setdosage] = useState('');
    const [prescribedBy, setprescribedBy] = useState('');
    const [expDate, setexpDate] = useState<Date>(new Date());
    const [timing, settiming] = useState('');
    const [stock, setstock] = useState('');
    const Medications = useMedications();
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const onDateChange = (event: any, selectedDate?: Date): void => {
      setShowDatePicker(false);
      if (selectedDate) {
        setexpDate( selectedDate);
      }
     };

    const handleMedUpload = async () => {
      const formData = new FormData();
  
      formData.append("medicine_name", medicineName);
      formData.append("username", username);
      formData.append("dosage", dosage);
      formData.append("timing", timing);
      formData.append("prescribed_by",prescribedBy);
      formData.append("exp_date",expDate.toISOString().split('T')[0]);
      formData.append("stock", stock);
  
      //Sending via Axios
      await uploadmedicationRequest(formData);
      setmedicineName('');
      setdosage('');
      settiming('');
      setprescribedBy('');
      setexpDate(new Date());
      setstock('');
    };

    return (<ScrollView style={[styles.scrollView]}>
    <View style={{marginTop: 16}}></View>
    <Text style={styles.header}>Current Medicines</Text>
    <View style={styles.listContainer}>
      {Medications.map((Medication, index) => (
        <View key={index} style={styles.prescriptionItem}>
          <View>
            <Text style={styles.boldText}>{`${Medication.medicineName}`}</Text>
            <Text style={styles.lightText}>{`${Medication.dosage }`}</Text>
            <Text style={styles.lightText}>{`${Medication.timing}`}</Text>
            <Text style={styles.lightText}>{`${Medication.prescribedBy}`}</Text>
            <Text style={styles.lightText}>{`${Medication.expiry}`}</Text>
            <Text style={styles.lightText}>{`${Medication.stock}`}</Text>
          </View>
        </View>
      ))}
    </View>
    <View style={{ borderTopWidth: 0.5, paddingTop: 16}}>
      <Text style={styles.header}>Upload New Medications</Text>
      <View style={{ marginTop:8 }}>
        <Text style={styles.labelText}>Medicine Name</Text>
        <Input  placeholder="Enter Medicine name" value={medicineName} onChangeText={setmedicineName} />  
      </View>
      <View style={{ marginTop:8 }}>
        <Text style={styles.labelText}>Dosage</Text>
        <Input  placeholder="Enter Dosage" value={dosage} onChangeText={setdosage} />
      </View>
      <View style={{ marginTop:8 }}>
        <Text style={styles.labelText}>Prescribed By</Text>
        <Input  placeholder="Enter Doctor's Name" value={prescribedBy} onChangeText={setprescribedBy} />
      </View>
      <View style={{ marginTop:8 }}>
        <Text style={styles.labelText}>Timing</Text>
        <Input  placeholder="Enter Timing" value={timing} onChangeText={settiming} />
      </View>
      <View style={{ marginTop:8 }}>
        <Text style={styles.labelText}>Expiry Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={ expDate ? expDate.toLocaleDateString() : ''}
            editable={false}
            placeholderTextColor={"#0000000"}
            placeholder="mm/dd/yyyy"
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop:8 }}>
        <Text style={styles.labelText}>Stock Left</Text>
        <Input  placeholder="Enter Remaining Stock" value={stock} onChangeText={setstock} />
      </View>
      <View style={{ marginTop:8 }}>
        <Button  onPress={handleMedUpload} disabled={!medicineName || !dosage || !timing || !prescribedBy || !expDate || !stock}>Upload Medicine</Button >
      </View>
    </View>
    {showDatePicker && (
        <DateTimePicker
          value={expDate}
          mode="date"
          onChange={onDateChange}
        />
      )}
  </ScrollView>);

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
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
       },
})
export default MedicineManager