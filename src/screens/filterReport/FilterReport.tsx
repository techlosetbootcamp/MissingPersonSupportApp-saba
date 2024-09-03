import React from 'react';
import {View, Text, FlatList, StyleSheet,ActivityIndicator} from 'react-native';
import {useCombinedHook} from '../../hooks/useReportManager';
import MissingPersonModal from '../../components/profileModal/ProfileModal';
import Header from '../../components/header/Header';
import SearchBar from '../../components/searchBar/SearchBar';
import FilterOptions from '../../components/filterOptions/FilterOptions';
import {useAppNavigation} from '../../utils/AppNavigation';
import ProfileCard from '../../components/profileCard/ProfileCard';
import {styles} from "./FilterReportStyles"
const AllMissingPersonsScreen = () => {
  const navigation = useAppNavigation();
  const {
    modalVisible,
    selectedProfile,
    openModal,
    closeModal,
    filteredProfiles,
    searchQuery,
    handleSearchQueryChange,
    handleGenderChange,
  loading,
  } = useCombinedHook();

  let error: undefined;

  const filterOptions = ['Male', 'Female', 'Trans', 'All'];

  return (
    <View style={styles.container}>
      <Header
        title="All Missing Persons"
        onBackPress={() => navigation.goBack()}
      />
      <SearchBar value={searchQuery} onChange={handleSearchQueryChange} />
      <FilterOptions options={filterOptions} onSelect={handleGenderChange} />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : filteredProfiles.length === 0 ? (
        <Text style={styles.noDataText}>No data found</Text>
      ) : (
        <FlatList
          data={filteredProfiles}
          renderItem={({item}) => (
            <ProfileCard profile={item} onPress={() => openModal(item)} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      <MissingPersonModal
        visible={modalVisible}
        onClose={closeModal}
        profile={selectedProfile}
      />
    </View>
  );
};

export default AllMissingPersonsScreen;
