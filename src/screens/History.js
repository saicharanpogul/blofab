import React, { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { backgroundStyle } from '../components/Styles'
import { connect } from 'react-redux'
import { getAllDonations } from '../actions'

const History = ({ navigation, getAllDonations, fetchAllDonations }) => {
  useEffect(() => {
    getAllDonations()
  }, [])

  const KeyValue = ({ title, value }) => {
    return (
      <View style={styles.keyValue}>
        <Text style={styles.key}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    )
  }

  const renderNoHistory = () => {
    return (
      <View style={styles.item}>
        <Text style={styles.noHistory}>No Donation History!</Text>
      </View>
    )
  }

  const renderDonationItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('HistoryDetails', { item, index })}>
        <KeyValue title="Donation ID:" value={item.donationId} />
        <KeyValue title="Blood Group 🩸:" value={item.bloodGroup} />
        <KeyValue
          title="Created At:"
          value={
            item.createdAt
              ? new Date(item.createdAt.toDate()).toDateString()
              : null
          }
        />
      </TouchableOpacity>
    )
  }

  const renderHeader = () => {
    return (
      <View>
        <Text style={styles.title}>History</Text>
        {fetchAllDonations.length === 0 ? renderNoHistory() : null}
      </View>
    )
  }
  return (
    <View style={styles.backgroundStyle}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={fetchAllDonations}
          renderItem={renderDonationItems}
          keyExtractor={item => item.donationId}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
        />
      </View>
    </View>
  )
}

const mapStateToProps = ({ fetchAllDonations }) => {
  return { fetchAllDonations }
}

export default connect(mapStateToProps, { getAllDonations })(History)

const styles = StyleSheet.create({
  backgroundStyle: {
    ...backgroundStyle,
    padding: 24
  },
  title: {
    color: '#EEE',
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: 16
  },
  noHistory: {
    color: '#EEE',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16
  },
  bloodGroup: {
    color: '#EEE',
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },
  donationId: {
    color: '#EEE',
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },
  createdAt: {
    color: '#EEE',
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#15171C'
  },
  keyValue: {
    flexDirection: 'row',
    padding: 4
  },
  key: {
    color: '#EEE',
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },
  value: {
    color: '#FF2052',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginStart: 10
  }
})
