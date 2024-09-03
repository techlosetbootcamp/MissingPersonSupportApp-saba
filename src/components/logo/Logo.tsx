import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {styles} from "./LogoStyles"
interface LogoProps {
  color?: string;
  size?: string; // Expecting size as a string
}

export const Logo: React.FC<LogoProps> = ({ color, size }) => {
  return (
    <>
      <Text style={[styles.logo, { color, fontSize: size ? parseInt(size) : 45 }]}>
        Findr
      </Text>
      <Text style={[styles.subtitle, { color }]}>Search for hope</Text>
    </>
  );
};


