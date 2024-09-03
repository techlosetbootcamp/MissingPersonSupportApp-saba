// ReportItem.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { sendEmail } from '../../utils/email';
type Report = {
  id: string;
  name: string;
  reporter: string;
  location: string;
  description?: string;
  photoUrl: string;
 
};

type ReportItemProps = {
  item: Report;
 

};

const ReportItem = ({ item }: ReportItemProps) => (
  <View style={styles.reportCard}>
    <Image source={{ uri: item.photoUrl }} style={styles.reportImage} />
    <View style={styles.reportDetails}>
      <Text style={styles.reportName}>Name: {item.name}</Text>
      <Text style={styles.reportReporter}>Reported by: {item.reporter}</Text>
      <Text style={styles.reportLocation}>Location: {item.location}</Text>
      {item.description && <Text style={styles.reportDescription}>Description: {item.description}</Text>}
      <TouchableOpacity style={styles.contactButton}
                  onPress={() => sendEmail('Contact Regarding Missing Person', `Details about ${item.name}`)}>
        <Text style={styles.contactButtonText}>Contact Person</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
    reportCard: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        padding: 16,
      },
      reportImage: {
        width: 115,
        height: 154,
        borderRadius: 10,
        marginRight: 16,
      },
      reportDetails: {
        flex: 1,
      },
      reportName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
      },
      reportReporter: {
        fontSize: 16,
        marginTop: 4,
        fontWeight: 'bold',
        color: '#000000',
      },
      reportLocation: {
        fontSize: 16,
        marginTop: 4,
        fontWeight: 'bold',
        color: '#000000',
      },
      reportDescription: {
        fontSize: 16,
        marginTop: 4,
        fontWeight: 'bold',
        color: '#000000',
      },
      contactButton: {
        width: 101,
        marginTop: 17,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#5B59FE',
        borderRadius: 5,
      },
      contactButtonText: {
        color: '#fff',
        fontSize: 11,
        textAlign: 'center',
      },
});

export default ReportItem;
