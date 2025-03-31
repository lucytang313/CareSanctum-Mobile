import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';

// Define button variants and sizes
const buttonVariants = {
  default: {
    backgroundColor: '#0A1647', // primary color
    color: '#FFFFFF', // primary-foreground
  },
  destructive: {
    backgroundColor: '#EF4444', // destructive color
    color: '#FFFFFF', // destructive-foreground
  },
  outline: {
    borderWidth: 1,
    borderColor: '#E2E8F0', // input border color
    backgroundColor: 'transparent',
    color: '#0A1647', // primary color
  },
  secondary: {
    backgroundColor: '#6B0F8B', // secondary color
    color: '#FFFFFF', // secondary-foreground
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#0A1647', // primary color
  },
  link: {
    backgroundColor: 'transparent',
    color: '#0A1647', // primary color
    textDecorationLine: 'underline',
  },
};

const buttonSizes: Record<string, ViewStyle> = {
  default: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    height: 40,
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 36,
  },
  lg: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    height: 44,
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center' as const, // Explicitly type as 'center'
    alignItems: 'center' as const, // Explicitly type as 'center'
  },
};

// Define types for Button props
interface ButtonProps extends TouchableOpacityProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  children: React.ReactNode; // Explicitly type the `children` prop
}

// Button Component
const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  children,
  style,
  onPress,
  disabled,
  ...props
}) => {
  const variantStyles = buttonVariants[variant] || buttonVariants.default;
  const sizeStyles = buttonSizes[size] || buttonSizes.default;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles,
        sizeStyles,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, { color: variantStyles.color }]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
});

export default Button;