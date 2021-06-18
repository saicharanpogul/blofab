import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { backgroundStyle } from '../components/Styles'
import { Button, CheckBox, Switch, Spinner } from '../components/common'
import { CheckIcon } from '../assets/icons'
import Toast from 'react-native-simple-toast'
import { connect } from 'react-redux'
import { userGet, optForDonation } from '../actions'
import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup'

const donationSchema = yup.object({
  consent: yup.string().required('required')
})

const Donation = ({
  navigation,
  userGet,
  firstName,
  lastName,
  userID,
  username,
  gender,
  bloodGroup,
  route,
  visited,
  optForDonation
}) => {
  const [womenForm, setWomenForm] = useState({
    abortion: null,
    breastFeeding: null,
    periods: null,
    pregnant: null
  })
  const [womenFormSubmitted, setWomenFormSubmitted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    userGet()
  })

  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <Spinner size="large" color="FF2052" />
      </View>
    )
  }

  const onPressYes = () => {
    navigation.navigate('HealthForm')
  }
  const renderFemaleForm = () => {
    return (
      <View style={styles.forWomen}>
        <Text style={styles.women}>For Women: </Text>
        <Formik
          initialValues={{
            abortion: false,
            breastFeeding: false,
            periods: false,
            pregnant: false
          }}
          onSubmit={({ abortion, breastFeeding, periods, pregnant }) => {
            console.log(abortion, breastFeeding, periods, pregnant)
            setWomenForm({ abortion, breastFeeding, periods, pregnant })
            setWomenFormSubmitted(true)
          }}>
          {props => (
            <View>
              <Switch
                title="Abortion(in last 6 months)"
                value={props.values.abortion}
                onValueChange={value => props.setFieldValue('abortion', value)}
                warning="Did you abortion in last 6 months?"
              />
              <Switch
                title="Breast feeding"
                value={props.values.breastFeeding}
                onValueChange={value =>
                  props.setFieldValue('breastFeeding', value)
                }
                warning="Breast feeding: 12 Months after Delivery"
              />
              <Switch
                title="Periods"
                value={props.values.periods}
                onValueChange={value => props.setFieldValue('periods', value)}
                warning="Are you in Periods?"
              />
              <Switch
                title="Pregnant"
                value={props.values.pregnant}
                onValueChange={value => props.setFieldValue('pregnant', value)}
                warning="In the last 12 months have you been pregnant?"
              />
              <Button title="SUBMIT" onButtonPress={props.handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    )
  }
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      style={styles.backgroundStyle}
      enableResetScrollToCoords={false}
      extraHeight={100}>
      <View style={{ marginBottom: 48 }}>
        <Text style={styles.title}>Donation</Text>
        {firstName ? (
          <View>
            <View style={styles.nameView}>
              <Text style={styles.name}>
                {firstName && lastName ? `${firstName} ${lastName}` : username}
              </Text>
              {isSubmitted ? renderLoader() : null}
            </View>
            <View style={styles.health}>
              <Text style={styles.action}>Are you in good health?</Text>
              <TouchableOpacity onPress={onPressYes}>
                <View style={styles.check}>
                  <Image style={styles.checkIcon} source={CheckIcon} />
                  <Text style={styles.yes}>Yes</Text>
                </View>
              </TouchableOpacity>
            </View>
            {gender === 'Female' && womenForm.abortion === null
              ? renderFemaleForm()
              : null}
            <View>
              <Formik
                initialValues={{
                  consent: false
                }}
                validationSchema={donationSchema}
                onSubmit={({ consent }, onSubmitProps) => {
                  if (visited) {
                    if (consent) {
                      setIsSubmitted(true)
                      if (gender === 'Female') {
                        if (womenFormSubmitted) {
                          optForDonation({
                            donorId: userID,
                            bloodGroup,
                            gender,
                            medicalHistory: {
                              historyOfBloodTransfusion:
                                route.params.historyOfBloodTransfusion,
                              weightMoreThan45: route.params.weightMoreThan45,
                              sleptLastNight: route.params.sleptLastNight,
                              takingAnyMedicines:
                                route.params.takingAnyMedicines,
                              consumedAlcohol: route.params.consumedAlcohol,
                              anyMedicalCondition:
                                route.params.anyMedicalCondition
                            },
                            womenForm,
                            consent,
                            setIsSubmitted: setIsSubmitted
                          })
                          onSubmitProps.resetForm()
                          setWomenForm({
                            abortion: null,
                            breastFeeding: null,
                            periods: null,
                            pregnant: null
                          })
                        } else {
                          Toast.show('Please submit the for women form.')
                        }
                      } else {
                        optForDonation({
                          donorId: userID,
                          bloodGroup,
                          gender,
                          medicalHistory: {
                            historyOfBloodTransfusion:
                              route.params.historyOfBloodTransfusion,
                            weightMoreThan45: route.params.weightMoreThan45,
                            sleptLastNight: route.params.sleptLastNight,
                            takingAnyMedicines: route.params.takingAnyMedicines,
                            consumedAlcohol: route.params.consumedAlcohol,
                            anyMedicalCondition:
                              route.params.anyMedicalCondition
                          },
                          consent,
                          setIsSubmitted: setIsSubmitted
                        })
                        onSubmitProps.resetForm()
                        setWomenForm({
                          abortion: null,
                          breastFeeding: null,
                          periods: null,
                          pregnant: null
                        })
                      }
                    } else {
                      Toast.show('Please read & accept the donor consent.')
                    }
                  } else {
                    Toast.show('Please confirm that you are in good health.')
                  }
                }}>
                {props => (
                  <View>
                    {/* <Text style={styles.donation}>Submit form for 🩸 donation</Text> */}
                    <CheckBox
                      name="consent"
                      title="I am Voluntary giving blood and it is non-remunerative and not compelled by anybody. I have been informed and understood the procedure and risk of giving blood. The medical history which I have is true and accurate. I understand the questions asked are for any protection as well as to protect the recipient of my blood donation. I am also aware that the blood is screened for transmissible diseases."
                      error={props.errors.consent}
                    />
                    {!isSubmitted ? (
                      <Button
                        title="Apply for donation"
                        onButtonPress={props.handleSubmit}
                      />
                    ) : (
                      renderLoader()
                    )}
                  </View>
                )}
              </Formik>
            </View>
          </View>
        ) : username ? (
          <View>
            <Text style={styles.name}>
              {firstName && lastName ? `${firstName} ${lastName}` : username}
            </Text>
            <Text style={styles.profileUpdate}>
              Please update your Profile!
            </Text>
          </View>
        ) : (
          renderLoader()
        )}
      </View>
    </KeyboardAwareScrollView>
  )
}

const mapStateToProps = ({ userData, isMedicalFormFilled }) => {
  const { firstName, lastName, userID, gender, bloodGroup, username } = userData
  const { visited } = isMedicalFormFilled
  return {
    firstName,
    lastName,
    userID,
    username,
    gender,
    bloodGroup,
    visited
  }
}
export default connect(mapStateToProps, { userGet, optForDonation })(Donation)

const styles = StyleSheet.create({
  backgroundStyle: {
    ...backgroundStyle,
    padding: 24
  },
  loader: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#EEE',
    fontFamily: 'Poppins-Bold',
    fontSize: 24
  },
  nameView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  name: {
    color: '#FF2052',
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    marginTop: 24
  },
  health: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center'
  },
  check: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#EEE',
    borderRadius: 5,
    alignItems: 'center',
    marginStart: 16,
    padding: 2
  },
  checkIcon: {
    width: 25,
    height: 25
  },
  action: {
    color: '#EEE',
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },
  yes: {
    color: '#32CD32',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 2
  },
  forWomen: {
    marginTop: 24
  },
  women: {
    color: '#EEE',
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },
  donation: {
    color: '#EEE',
    marginTop: 24,
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },
  profileUpdate: {
    color: '#C4C4C4',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14
  }
})
