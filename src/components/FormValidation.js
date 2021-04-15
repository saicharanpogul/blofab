import Toast from 'react-native-simple-toast'

export const isFirstNameSet = firstName => {
  if (firstName) {
    return true
  }
  Toast.show('First Name is required.', Toast.SHORT)
  return false
}

export const isLastNameSet = lastName => {
  if (lastName) {
    return true
  }
  Toast.show('Last Name is required.', Toast.SHORT)
  return false
}

export const isCareOfSet = careOf => {
  if (careOf) {
    return true
  }
  Toast.show('Care Of is required.', Toast.SHORT)
  return false
}

export const isContactNumberSet = contactNumber => {
  if (contactNumber && contactNumber.length === 10) {
    return true
  }
  Toast.show('Contact Number is required and should be 10 digits.', Toast.SHORT)
  return false
}

export const isBloodGroupSet = bloodGroup => {
  if (bloodGroup) {
    return true
  }
  Toast.show('Blood Group is required.', Toast.SHORT)
  return false
}

export const isGenderSet = gender => {
  if (gender) {
    return true
  }
  Toast.show('Gender is required.', Toast.SHORT)
  return false
}

export const isDOBSet = DOB => {
  if (DOB) {
    return true
  }
  Toast.show('Date of Birth is required.', Toast.SHORT)
  return false
}

export const isWeightSet = weight => {
  if (weight) {
    return true
  }
  Toast.show('Weight is required.', Toast.SHORT)
  return false
}

export const isMaritalStatusSet = maritalStatus => {
  if (maritalStatus) {
    return true
  }
  Toast.show('Marital Status is required.', Toast.SHORT)
  return false
}

export const isEducationSet = education => {
  if (education) {
    return true
  }
  Toast.show('Education is required.', Toast.SHORT)
  return false
}

export const isOccupationSet = Occupation => {
  if (Occupation) {
    return true
  }
  Toast.show('Occupation is required.', Toast.SHORT)
  return false
}

export const isAddressSet = address => {
  if (address) {
    return true
  }
  Toast.show('Address is required.', Toast.SHORT)
  return false
}
