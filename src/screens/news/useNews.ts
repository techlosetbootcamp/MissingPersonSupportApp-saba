import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

type Report = {
  id: string;
  name: string;
  reporter: string;
  location: string;
  description?: string;
  photoUrl: string;
};

const useFetchReports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('News')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const reportList = querySnapshot.docs.map((documentSnapshot) => {
            const data = documentSnapshot.data();
            return {
              id: documentSnapshot.id,
              name: data.fullName,
              reporter: data.reportedBy,
              location: data.currentLocation,
              description: data.description,
              photoUrl: data.photo,
            };
          });
          setReports(reportList);
        },
        (error) => {
          console.error('Error fetching reports: ', error);
        }
      );

    return () => unsubscribe();
  }, []);

  return reports;
};

export default useFetchReports;
