import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Define CardProps interface
interface CardProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

// Card Component
const Card: React.FC<CardProps> = ({ style, children }) => (
  <View style={[styles.card, style]}>{children}</View>
);

// CardHeader Component
const CardHeader: React.FC<CardProps> = ({ style, children }) => (
  <View style={[styles.cardHeader, style]}>{children}</View>
);

// CardTitle Component
interface CardTitleProps {
  style?: TextStyle;
  children?: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ style, children }) => (
  <Text style={[styles.cardTitle, style]}>{children}</Text>
);

// CardDescription Component
interface CardDescriptionProps {
  style?: TextStyle;
  children?: React.ReactNode;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ style, children }) => (
  <Text style={[styles.cardDescription, style]}>{children}</Text>
);

// CardContent Component
const CardContent: React.FC<CardProps> = ({ style, children }) => (
  <View style={[styles.cardContent, style]}>{children}</View>
);

// CardFooter Component
const CardFooter: React.FC<CardProps> = ({ style, children }) => (
  <View style={[styles.cardFooter, style]}>{children}</View>
);

// Styles
const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0', // Light gray border
    backgroundColor: '#ffffff', // White background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  cardHeader: {
    padding: 24,
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a202c', // Dark gray text
  },
  cardDescription: {
    fontSize: 14,
    color: '#718096', // Light gray text
  },
  cardContent: {
    padding: 24,
    paddingTop: 0,
  },
  cardFooter: {
    padding: 24,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };