import React from 'react';
import { TouchableOpacity, Text,TouchableOpacityProps } from 'react-native';
import {styles} from "./ButtonStyles"
interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;


