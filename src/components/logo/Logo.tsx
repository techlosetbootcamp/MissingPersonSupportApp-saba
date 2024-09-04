import React from 'react';
import {Text} from 'react-native';
import {styles} from './LogoStyles';
import {LogoProps} from '../../types/types';

export const Logo: React.FC<LogoProps> = ({color, size}) => {
  return (
    <>
      <Text
        style={[styles.logo, {color, fontSize: size ? parseInt(size) : 45}]}>
        Findr
      </Text>
      <Text style={[styles.subtitle, {color}]}>Search for hope</Text>
    </>
  );
};
