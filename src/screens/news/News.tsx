import React from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import useFetchReports from './useNews';
import {styles} from './NewsStyles';
import {colors} from '../../constants/colors';
import Header from '../../components/header/Header';
import ReportItem from '../../components/reportItem/ReportItem';
import {useAppNavigation} from '../../utils/AppNavigation';
const ReportScreen = () => {
  const navigation = useAppNavigation();
  const {reports, isLoading} = useFetchReports();

  return (
    <View style={styles.container}>
      <Header title="Reports" onBackPress={() => navigation.goBack()} />

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.skyBlue}
          style={styles.loader}
        />
      ) : reports.length === 0 ? (
        <Text style={styles.noDataText}>No data found</Text>
      ) : (
        <FlatList
          data={reports}
          renderItem={({item}) => <ReportItem item={item} />}
          keyExtractor={item => item?.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default ReportScreen;
