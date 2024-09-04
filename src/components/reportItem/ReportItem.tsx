import React from 'react';
import {styles} from './ReportItemStyles';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {sendEmail} from '../../utils/email';
import {ReportItemProps} from '../../types/types';

const ReportItem = ({item}: ReportItemProps) => (
  <View style={styles.reportCard}>
    <Image source={{uri: item?.photoUrl}} style={styles.reportImage} />
    <View style={styles.reportDetails}>
      <Text style={styles.reportName}>Name: {item?.name}</Text>
      <Text style={styles.reportReporter}>Reported by: {item?.reporter}</Text>
      <Text style={styles.reportLocation}>Location: {item?.location}</Text>
      {item?.description && (
        <Text style={styles.reportDescription}>
          Description: {item?.description}
        </Text>
      )}
      <TouchableOpacity
        style={styles.contactButton}
        onPress={() =>
          sendEmail(
            'Contact Regarding Missing Person',
            `Details about ${item?.name}`,
          )
        }>
        <Text style={styles.contactButtonText}>Contact Person</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ReportItem;
