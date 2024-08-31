// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import firestore from '@react-native-firebase/firestore';


// type Report = {
//   id: string;
//   name: string;
//   reporter: string;
//   location: string;
//   description?: string;
//   photoUrl: string;
// };

// const ReportScreen = ({ navigation }: any) => {
//   const [reports, setReports] = useState<Report[]>([]);

//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('News')
//       .orderBy('timestamp', 'desc')
//       .onSnapshot(
//         (querySnapshot) => {
//           const reportList = querySnapshot.docs.map((documentSnapshot) => {
//             const data = documentSnapshot.data();
//             return {
//               id: documentSnapshot.id,
//               name: data.fullName,
//               reporter: data.reportedBy,
//               location: data.currentLocation,
//               description: data.description,
//               photoUrl: data.photo,
//             };
//           });
//           setReports(reportList);
//         },
//         (error) => {
//           console.error('Error fetching reports: ', error);
//         }
//       );

//     return () => unsubscribe();
//   }, []);

//   const renderReportItem = ({ item }: { item: Report }) => {
//     return (
//       <View style={styles.reportCard}>
//         <Image source={{ uri: item.photoUrl }} style={styles.reportImage} />
//         <View style={styles.reportDetails}>
//           <Text style={styles.reportName}>Name: {item.name}</Text>
//           <Text style={styles.reportReporter}>Reported by: {item.reporter}</Text>
//           <Text style={styles.reportLocation}>Location: {item.location}</Text>
//           {item.description && <Text style={styles.reportDescription}>Description: {item.description}</Text>}
//           <TouchableOpacity style={styles.contactButton}>
//             <Text style={styles.contactButtonText}>Contact Person</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={require('../../assets/Backspace.png')} />
//         </TouchableOpacity>
//         <Text style={styles.header}>Reports</Text>
//       </View>
//       <FlatList
//         data={reports}
//         renderItem={renderReportItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import useFetchReports from './useNews';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/Navigation';



// Adjust the import path as needed
type Report = {
  id: string;
  name: string;
  reporter: string;
  location: string;
  description?: string;
  photoUrl: string;
};
const ReportScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  
  const reports = useFetchReports();

  const renderReportItem = ({ item }: { item: Report }) => (
    <View style={styles.reportCard}>
      <Image source={{ uri: item.photoUrl }} style={styles.reportImage} />
      <View style={styles.reportDetails}>
        <Text style={styles.reportName}>Name: {item.name}</Text>
        <Text style={styles.reportReporter}>Reported by: {item.reporter}</Text>
        <Text style={styles.reportLocation}>Location: {item.location}</Text>
        {item.description && <Text style={styles.reportDescription}>Description: {item.description}</Text>}
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Person</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/Backspace.png')} />
        </TouchableOpacity>
        <Text style={styles.header}>Reports</Text>
      </View>
      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5, // 5px gap between the icon and text
  },
  listContainer: {
    paddingBottom: 20,
  },
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


