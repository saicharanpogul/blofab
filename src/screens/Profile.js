import React, { useEffect, useState, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native'
import { backgroundStyle } from '../components/Styles'
import {
  ProfileBackground,
  DefaultProfile,
  DefaultProfileBackground
} from '../assets/images'
import {
  EditIcon,
  MaleIcon,
  FemaleIcon,
  OtherIcon,
  CareOfIcon,
  DonationIcon,
  CalendarIcon,
  WeightIcon,
  MaritalStatusIcon,
  IdIcon,
  EducationIcon,
  OccupationIcon,
  PhoneIcon,
  LocationIcon,
  AgeIcon
} from '../assets/icons'
import { Chip } from '../components/common'
import { connect } from 'react-redux'
import { userGet } from '../actions'

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const Profile = ({
  navigation,
  userGet,
  userID,
  username,
  bloodGroup,
  firstName,
  lastName,
  careOf,
  address,
  dateOfBirth,
  age,
  contactNumber,
  gender,
  weight,
  education,
  occupation,
  maritalStatus,
  profileImageUrl,
  isNewUser
}) => {
  const [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    userGet()
  }, [refreshing, userGet])
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])
  const renderGenderIcon = () => {
    if (gender === 'male') {
      return MaleIcon
    } else if (gender === 'female') {
      return FemaleIcon
    } else {
      return OtherIcon
    }
  }
  const renderAccountName = () => {
    if (!firstName && !lastName) {
      return (
        <View style={styles.accountName}>
          <Text style={styles.name}>{username}</Text>
        </View>
      )
    }
    return (
      <View style={styles.accountName}>
        <Text style={styles.name}>{firstName ? firstName : ''}</Text>
        <Text style={styles.name}>{` ${lastName ? lastName : ''}`}</Text>
      </View>
    )
  }
  const renderChips = () => {
    if (!firstName && !lastName) {
      return (
        <View style={styles.noData}>
          <Chip style={styles.idChip} title={userID} icon={IdIcon} />
          <Text style={styles.no}>Please update your profile!</Text>
        </View>
      )
    }
    return (
      <View style={styles.chips}>
        <Chip title={userID} icon={IdIcon} />
        <Chip title={bloodGroup} icon={DonationIcon} />
        <Chip title={careOf} icon={CareOfIcon} />
        <Chip title={contactNumber} icon={PhoneIcon} />
        <Chip title={gender} icon={renderGenderIcon()} />
        <Chip title={weight} icon={WeightIcon} />
        <Chip title={dateOfBirth} icon={CalendarIcon} />
        <Chip title={age} icon={AgeIcon} />
        <Chip title={maritalStatus} icon={MaritalStatusIcon} />
        <Chip title={education} icon={EducationIcon} />
        <Chip title={occupation} icon={OccupationIcon} />
        <Chip title={address} icon={LocationIcon} />
      </View>
    )
  }
  return (
    <ScrollView
      style={styles.backgroundStyle}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <Image style={styles.profileBackground} source={ProfileBackground} />
        <TouchableOpacity
          style={styles.edit}
          onPress={() =>
            navigation.navigate('UserDetails', {
              bloodGroup,
              firstName,
              lastName,
              careOf,
              address,
              dateOfBirth,
              age,
              contactNumber,
              gender,
              weight,
              education,
              occupation,
              maritalStatus,
              profileImageUrl,
              isNewUser
            })
          }>
          <Image style={styles.editIcon} source={EditIcon} />
        </TouchableOpacity>
        <View style={styles.profile}>
          <Image
            style={styles.defaultProfileBackground}
            source={DefaultProfileBackground}
          />
          <Image
            style={styles.defaultProfile}
            source={profileImageUrl ? { uri: profileImageUrl } : DefaultProfile}
          />
        </View>
      </View>
      {renderAccountName()}
      {renderChips()}
    </ScrollView>
  )
}

const mapStateToProps = ({ userData }) => {
  const {
    userID,
    username,
    bloodGroup,
    firstName,
    lastName,
    careOf,
    address,
    dateOfBirth,
    age,
    contactNumber,
    gender,
    weight,
    education,
    occupation,
    maritalStatus,
    profileImageUrl,
    isNewUser
  } = userData
  return {
    userID,
    username,
    bloodGroup,
    firstName,
    lastName,
    careOf,
    address,
    dateOfBirth,
    age,
    contactNumber,
    gender,
    weight,
    education,
    occupation,
    maritalStatus,
    profileImageUrl,
    isNewUser
  }
}

export default connect(mapStateToProps, { userGet })(Profile)

const styles = StyleSheet.create({
  backgroundStyle: { ...backgroundStyle },
  profileBackground: {
    width: 352,
    height: 195,
    alignSelf: 'center',
    marginTop: 24
  },
  edit: {
    position: 'absolute',
    left: 320,
    top: 35
  },
  editIcon: {
    width: 40,
    height: 40
  },
  profile: {
    position: 'absolute',
    left: 157,
    top: 170
  },
  defaultProfileBackground: {
    width: 100,
    height: 100,
    position: 'absolute'
  },
  defaultProfile: {
    width: 80,
    height: 80,
    position: 'absolute',
    left: 10,
    top: 10,
    borderRadius: 120
  },
  accountName: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 64
  },
  name: {
    color: '#EEE',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold'
  },
  chips: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'auto',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 16
  },
  noData: {
    flex: 1,
    alignSelf: 'center'
  },
  idChip: {
    alignSelf: 'center'
  },
  no: {
    color: '#C4C4C4',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginTop: 48
  }
})
