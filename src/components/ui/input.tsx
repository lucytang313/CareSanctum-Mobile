import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

// Define validation rules type
interface ValidationRules {
  pattern?: string; // Regex pattern
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

interface InputProps extends TextInputProps {
  validationRules?: ValidationRules; // Validation rules object
  confirmPassword?: string; // For password confirmation
  containerStyle?: StyleProp<ViewStyle>; // Custom container style
  inputStyle?: StyleProp<TextStyle>; // Custom input style
  type?: "text" | "password" | "email" | "tel";
  required?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ type = "text", validationRules, confirmPassword, onChangeText, containerStyle, inputStyle, required, ...props }, ref) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const keyboardType: KeyboardTypeOptions =
      type === "email" ? "email-address" : type === "tel" ? "phone-pad" : "default";

    const secureTextEntry = type === "password" && !showPassword;

    const handleValidation = (text: string) => {
      let message = "";

      if (required && !text) {
        message = "This field is required.";
      } else if (validationRules?.minLength && text.length < validationRules.minLength) {
        message = `Must be at least ${validationRules.minLength} characters.`;
      } else if (validationRules?.pattern) {
        const regex = new RegExp(validationRules.pattern);
        if (!regex.test(text)) {
          message = type === "password" ? "Password must contain at least one number." : "Invalid format.";
        }
      } else if (type === "tel" && text.length !== 10) {
        message = "Number must be exactly 10 digits.";
      } else if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        message = "Please enter a valid email address.";
      } else if (type === "password" && confirmPassword !== undefined && text !== confirmPassword) {
        message = "Passwords do not match.";
      }

      setErrorMessage(message);
      if (onChangeText) onChangeText(text);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, errorMessage ? styles.inputError : null]}>
          <TextInput
            style={[styles.input, inputStyle]}
            ref={ref}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onChangeText={handleValidation}
            {...props}
          />
          {type === "password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
              {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
            </TouchableOpacity>
          )}
        </View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: "red",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
  },
  iconContainer: {
    padding: 8,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
});

export { Input };
