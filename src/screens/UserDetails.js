import React, { useState } from 'react'
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
import { defaultProfile, defaultProfileBackground } from '../assets/images'
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
    value: 'male'
  },
  {
    key: '2',
    label: 'Female',
    value: 'female'
  },
  {
    key: '3',
    label: 'Other',
    value: 'other'
  }
]

const maritalStatusOptions = [
  {
    key: '1',
    label: 'Single',
    value: 'single'
  },
  {
    key: '2',
    label: 'Engaged',
    value: 'engaged'
  },
  {
    key: '3',
    label: 'Married',
    value: 'married'
  },
  {
    key: '4',
    label: 'Widowed',
    value: 'widowed'
  },
  {
    key: '5',
    label: 'Divorced',
    value: 'divorced'
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
  userUpdate,
  userCreate
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [dob, setDob] = useState(false)
  const [profile, setProfile] = useState(null)
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
      console.log(response)
    })
  }
  const onButtonPress = () => {
    if (
      isFirstNameSet(firstName) &&
      isLastNameSet(lastName) &&
      isCareOfSet(careOf) &&
      isContactNumberSet(contactNumber) &&
      isBloodGroupSet(bloodGroup) &&
      isGenderSet(gender) &&
      isDOBSet(dateOfBirth) &&
      isWeightSet(weight) &&
      isMaritalStatusSet(maritalStatus) &&
      isEducationSet(education) &&
      isOccupationSet(occupation) &&
      isAddressSet(address)
    ) {
      userCreate({
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
        maritalStatus
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
            source={defaultProfileBackground}
          />
          <Image
            style={styles.defaultProfile}
            source={profile ? { uri: profile } : defaultProfile}
          />
        </View>
      </TouchableOpacity>
      <View>
        <Input
          placeholderText="First Name"
          inputValue={firstName}
          onChangeText={value => userUpdate({ prop: 'firstName', value })}
        />
        <Input
          placeholderText="Last Name"
          inputValue={lastName}
          onChangeText={value => userUpdate({ prop: 'lastName', value })}
        />
        <Input
          placeholderText="C/O"
          inputValue={careOf}
          onChangeText={value => userUpdate({ prop: 'careOf', value })}
          autoCapitalize="words"
        />
        <Input
          placeholderText="Contact Number"
          keyboardType="numeric"
          inputValue={contactNumber}
          onChangeText={value => userUpdate({ prop: 'contactNumber', value })}
        />
        <ModalSelector
          data={bloodGroupsOptions}
          initValue="A+"
          selectTextStyle={styles.selectText}
          selectStyle={styles.modelSelector}
          value={bloodGroup}
          onChange={value => userUpdate({ prop: 'bloodGroup', value })}
        />
        <ModalSelector
          data={genderOptions}
          initValue="Male"
          selectTextStyle={styles.selectText}
          selectStyle={styles.modelSelector}
          value={gender}
          onChange={value => userUpdate({ prop: 'gender', value })}
        />
        <TouchableOpacity style={styles.date} onPress={showDatePicker}>
          <Text style={styles.dateText}>{dob ? dob : 'Date of Birth'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Input
          placeholderText="Weight (in kgs)"
          keyboardType="numeric"
          inputValue={weight}
          onChangeText={value => userUpdate({ prop: 'weight', value })}
        />
        <ModalSelector
          data={maritalStatusOptions}
          initValue="Single"
          selectTextStyle={styles.selectText}
          selectStyle={styles.modelSelector}
          value={maritalStatus}
          onChange={value =>
            userUpdate({ prop: 'maritalStatus', value: value.value })
          }
        />
        <Input
          placeholderText="Education"
          inputValue={education}
          onChangeText={value => userUpdate({ prop: 'education', value })}
        />
        <Input
          placeholderText="Occupation"
          inputValue={occupation}
          onChangeText={value => userUpdate({ prop: 'occupation', value })}
        />
        <Input
          placeholderText="Address"
          inputValue={address}
          onChangeText={value => userUpdate({ prop: 'address', value })}
          autoCapitalize="sentences"
          multiline
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
    maritalStatus
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
    maritalStatus
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

export default connect(mapStateToProps, { userUpdate, userCreate })(UserDetails)
