import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native'
import { backgroundStyle } from '../components/Styles'
import { Input, Button } from '../components/common'
import ModalSelector from 'react-native-modal-selector'
import { launchImageLibrary } from 'react-native-image-picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { DefaultProfile, DefaultProfileBackground } from '../assets/images'
import {
  isFirstNameSet,
  isLastNameSet,
  isCareOfSet,
  isContactNumberSet,
  isBloodGroupSet,
  isGenderSet,
  isDOBSet,
  isWeightSet,
  isMaritalStatusSet,
  isEducationSet,
  isOccupationSet,
  isAddressSet
} from '../components/FormValidation'
import { AgeFromDateString } from 'age-calculator'
import { connect } from 'react-redux'
import { userUpdate, userCreate } from '../actions'

const bloodGroupsOptions = [
  {
    key: '1',
    label: 'A+',
    value: 'A+'
  },
  {
    key: '2',
    label: 'A-',
    value: 'A-'
  },
  {
    key: '3',
    label: 'B+',
    value: 'B+'
  },
  {
    key: '4',
    label: 'B-',
    value: 'B-'
  },
  {
    key: '5',
    label: 'O+',
    value: 'O+'
  },
  {
    key: '6',
    label: 'O-',
    value: 'O-'
  },
  {
    key: '7',
    label: 'AB+',
    value: 'AB+'
  },
  {
    key: '8',
    label: 'AB-',
    value: 'AB-'
  }
]

const genderOptions = [
  {
    key: '1',
    label: 'Male',
    value: 'Male'
  },
  {
    key: '2',
    label: 'Female',
    value: 'Female'
  },
  {
    key: '3',
    label: 'Other',
    value: 'Other'
  }
]

const maritalStatusOptions = [
  {
    key: '1',
    label: 'Single',
    value: 'Single'
  },
  {
    key: '2',
    label: 'Engaged',
    value: 'Engaged'
  },
  {
    key: '3',
    label: 'Married',
    value: 'Married'
  },
  {
    key: '4',
    label: 'Widowed',
    value: 'Widowed'
  },
  {
    key: '5',
    label: 'Divorced',
    value: 'Divorced'
  }
]

const calculateAge = dob => {
  const ageFromString = new AgeFromDateString(dob).age
  return ageFromString
}

const UserDetails = ({
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
  profileImage,
  userUpdate,
  userCreate,
  route
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [dob, setDob] = useState(false)
  const [profile, setProfile] = useState(
    route.params.profileImageUrl ? route.params.profileImageUrl : null
  )

  useEffect(() => {})

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = date => {
    setDob(new Date(date).toLocaleDateString())
    const dateString = new Date(date).toLocaleDateString()
    const age = calculateAge(date)
    userUpdate({
      prop: 'dateOfBirth',
      value: dateString
    })
    userUpdate({ prop: 'age', value: age })
    hideDatePicker()
  }
  const handleImagePicker = () => {
    const options = {}
    launchImageLibrary(options, response => {
      setProfile(response.uri)
      userUpdate({ prop: 'profileImage', value: response })
    })
  }
  const onButtonPress = () => {
    if (
      isFirstNameSet(firstName || route.params.firstName) &&
      isLastNameSet(lastName || route.params.lastName) &&
      isCareOfSet(careOf || route.params.careOf) &&
      isContactNumberSet(contactNumber || route.params.contactNumber) &&
      isBloodGroupSet(bloodGroup || route.params.bloodGroup) &&
      isGenderSet(gender || route.params.gender) &&
      isDOBSet(dateOfBirth || route.params.dateOfBirth) &&
      isWeightSet(weight || route.params.weight) &&
      isMaritalStatusSet(maritalStatus || route.params.maritalStatus) &&
      isEducationSet(education || route.params.education) &&
      isOccupationSet(occupation || route.params.occupation) &&
      isAddressSet(address || route.params.address)
    ) {
      userCreate({
        bloodGroup: bloodGroup.value || route.params.bloodGroup,
        firstName: firstName || route.params.firstName,
        lastName: lastName || route.params.lastName,
        careOf: careOf || route.params.careOf,
        address: address || route.params.address,
        dateOfBirth: dateOfBirth || route.params.dateOfBirth,
        age: age || route.params.age,
        contactNumber: contactNumber || route.params.contactNumber,
        gender: gender.value || route.params.gender,
        weight: weight || route.params.weight,
        education: education || route.params.education,
        occupation: occupation || route.params.occupation,
        maritalStatus: maritalStatus.value || route.params.maritalStatus,
        profileImage: route.params.profileImageUrl ? null : profileImage,
        isNewUser: route.params.isNewUser || 'true'
      })
    }
  }
  return (
    <ScrollView
      style={styles.backgroundStyle}
      keyboardShouldPersistTaps="always">
      <Text style={styles.title}>Edit Profile</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
        <View style={styles.profile}>
          <Image
            style={styles.defaultProfileBackground}
            source={DefaultProfileBackground}
          />
          <Image
            style={styles.defaultProfile}
            source={profile ? { uri: profile } : DefaultProfile}
          />
        </View>
      </TouchableOpacity>
      <View>
        <Input
          placeholderText="First Name"
          inputValue={firstName}
          onChangeText={value => userUpdate({ prop: 'firstName', value })}
          defaultValue={route.params.firstName}
          label="First Name"
        />
        <Input
          placeholderText="Last Name"
          inputValue={lastName}
          onChangeText={value => userUpdate({ prop: 'lastName', value })}
          defaultValue={route.params.lastName}
          label="Last Name"
        />
        <Input
          placeholderText="C/O"
          inputValue={careOf}
          onChangeText={value => userUpdate({ prop: 'careOf', value })}
          autoCapitalize="words"
          defaultValue={route.params.careOf}
          label="Care Of"
        />
        <Input
          placeholderText="Contact Number"
          keyboardType="numeric"
          inputValue={contactNumber}
          onChangeText={value => userUpdate({ prop: 'contactNumber', value })}
          defaultValue={route.params.contactNumber}
          label="Contact Number"
        />
        <ModalSelector
          data={bloodGroupsOptions}
          initValue={
            route.params.bloodGroup ? route.params.bloodGroup : 'Blood Group'
          }
          selectTextStyle={styles.selectText}
          selectStyle={styles.modelSelector}
          value={bloodGroup ? bloodGroup : route.params.bloodGroup}
          onChange={value => userUpdate({ prop: 'bloodGroup', value })}
        />
        <ModalSelector
          data={genderOptions}
          initValue={route.params.gender ? route.params.gender : 'Gender'}
          selectTextStyle={styles.selectText}
          selectStyle={styles.modelSelector}
          value={gender ? gender : route.params.gender}
          onChange={value => userUpdate({ prop: 'gender', value })}
        />
        <TouchableOpacity style={styles.date} onPress={showDatePicker}>
          <Text style={styles.dateText}>
            {dob
              ? dob
              : route.params.dateOfBirth
              ? route.params.dateOfBirth
              : 'Date of Birth'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          initValue={
            route.params.dateOfBirth
              ? route.params.dateOfBirth
              : 'Date of Birth'
          }
        />
        <Input
          placeholderText="Weight (in kgs)"
          keyboardType="numeric"
          inputValue={weight}
          onChangeText={value => userUpdate({ prop: 'weight', value })}
          defaultValue={route.params.weight}
          label="Weight"
        />
        <ModalSelector
          data={maritalStatusOptions}
          initValue={
            route.params.maritalStatus
              ? route.params.maritalStatus
              : 'Marital Status'
          }
          selectTextStyle={styles.selectText}
          selectStyle={styles.modelSelector}
          value={maritalStatus ? maritalStatus : route.params.maritalStatus}
          onChange={value =>
            userUpdate({ prop: 'maritalStatus', value: value })
          }
        />
        <Input
          placeholderText="Education"
          inputValue={education}
          onChangeText={value => userUpdate({ prop: 'education', value })}
          defaultValue={route.params.education}
          label="Education"
        />
        <Input
          placeholderText="Occupation"
          inputValue={occupation}
          onChangeText={value => userUpdate({ prop: 'occupation', value })}
          defaultValue={route.params.occupation}
          label="Occupation"
        />
        <Input
          placeholderText="Address"
          inputValue={address}
          onChangeText={value => userUpdate({ prop: 'address', value })}
          autoCapitalize="sentences"
          multiline
          defaultValue={route.params.address}
          label="Address"
        />
        <Button
          style={styles.button}
          title="Submit"
          onButtonPress={onButtonPress}
        />
      </View>
    </ScrollView>
  )
}

const mapStateToProps = ({ user }) => {
  const {
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
    profileImage
  } = user
  return {
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
    profileImage
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    ...backgroundStyle,
    paddingHorizontal: 24
  },
  title: {
    color: '#EEE',
    fontFamily: 'Poppins-Bold',
    fontSize: 36
  },
  imagePicker: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  profile: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  defaultProfileBackground: {
    width: 100,
    height: 100
  },
  defaultProfile: {
    width: 80,
    height: 80,
    position: 'absolute',
    left: 10,
    top: 10,
    borderRadius: 120
  },
  modelSelector: {
    marginTop: 16,
    height: 48,
    justifyContent: 'center'
  },
  selectText: {
    color: '#EEE'
  },
  date: {
    borderWidth: 1,
    borderColor: '#EEE',
    marginTop: 16,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center'
  },
  dateText: {
    color: '#EEE',
    textAlign: 'center',
    fontSize: 16
  },
  button: {
    marginBottom: 16,
    marginTop: 16
  }
})

export default connect(mapStateToProps, {
  userUpdate,
  userCreate
})(UserDetails)
