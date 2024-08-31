// hooks/useAppNavigation.ts
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/Navigation';

export const useAppNavigation = () => {
  return useNavigation<NativeStackNavigationProp<RootStackParams>>();
};
