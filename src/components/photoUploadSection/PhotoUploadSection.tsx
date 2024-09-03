import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {IMAGES} from '../../constants/constants';
import {styles} from "./PhotoUploadSectionStyles"
export interface PhotoUploadSectionProps {
    photo: string | null;  // Updated to allow null
    selectPhoto: () => void;
  }
  

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ photo, selectPhoto }) => {
  return (
    <>
      <Text style={styles.title}>Upload Photographs</Text>
      <TouchableOpacity style={styles.photoUpload} onPress={selectPhoto}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.uploadedImage} />
        ) : (
          <View style={styles.uploadContent}>
            <Image
              source={IMAGES.uploadIcon}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadText}>
              Drag & drop files or <Text style={styles.browseText}>Browse</Text>
            </Text>
            <Text style={styles.format}>
              Supported formats: JPEG, PNG, JPG
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};



export default PhotoUploadSection;
