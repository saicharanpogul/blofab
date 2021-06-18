import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { backgroundStyle } from '../components/Styles'
import { Input, Switch, Button } from '../components/common'
import { Formik } from 'formik'
import * as yup from 'yup'
import Toast from 'react-native-simple-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { setVisited } from '../actions'

const medicalHistoryForm = yup.object({
  historyOfBloodTransfusion: yup.string().required('Required'),
  weightMoreThan45: yup.boolean(),
  sleptLastNight: yup.boolean(),
  takingAnyMedicines: yup.string().required('Required'),
  consumedAlcohol: yup.boolean(),
  anyMedicalCondition: yup.string().required('Required')
})

const HealthForm = ({ navigation, setVisited }) => {
  const warnings = {
    historyOfBloodTransfusion: 'Date and reason (e.g: 04/05/2021, donation)',
    weightMoreThan45: 'Did you weight more than 45 Kgs?',
    sleptLastNight: 'Did you sleep well last night?',
    takingAnyMedicines:
      'Are you taking any medicine? If yes please mention them here.',
    consumedAlcohol: 'Have you consumed alcohol in last 24 hours?',
    anyMedicalCondition:
      'Mention any and every medical condition you have/had in last 7 days/15 days/1 month/3 months/6 months/1 year.'
  }
  return (
    <KeyboardAwareScrollView
      style={styles.backgroundStyle}
      enableOnAndroid={true}>
      <View style={styles.view}>
        <Text style={styles.title}>Medical History Form</Text>
        <View>
          <Formik
            initialValues={{
              historyOfBloodTransfusion: '',
              weightMoreThan45: false,
              sleptLastNight: false,
              takingAnyMedicines: '',
              consumedAlcohol: false,
              anyMedicalCondition: ''
            }}
            validationSchema={medicalHistoryForm}
            onSubmit={(
              {
                historyOfBloodTransfusion,
                weightMoreThan45,
                sleptLastNight,
                takingAnyMedicines,
                consumedAlcohol,
                anyMedicalCondition
              },
              onSubmitProps
            ) => {
              onSubmitProps.resetForm()
              setVisited({ visited: true })
              navigation.navigate('Donation', {
                historyOfBloodTransfusion,
                weightMoreThan45,
                sleptLastNight,
                takingAnyMedicines,
                consumedAlcohol,
                anyMedicalCondition
              })
            }}>
            {props => (
              <View>
                <Input
                  placeholderText="History of blood transfusion"
                  label="History of blood transfusion"
                  defaultValue=""
                  onChangeText={value =>
                    props.setFieldValue('historyOfBloodTransfusion', value)
                  }
                  warning={
                    !props.errors.historyOfBloodTransfusion
                      ? warnings.historyOfBloodTransfusion
                      : undefined
                  }
                  alert={
                    props.errors.historyOfBloodTransfusion
                      ? props.errors.historyOfBloodTransfusion
                      : undefined
                  }
                />
                <Switch
                  title="Weight more than 45"
                  value={props.values.weightMoreThan45}
                  onValueChange={value =>
                    props.setFieldValue('weightMoreThan45', value)
                  }
                  warning={
                    !props.errors.weightMoreThan45
                      ? warnings.weightMoreThan45
                      : null
                  }
                  alert={
                    props.errors.weightMoreThan45
                      ? props.errors.weightMoreThan45
                      : undefined
                  }
                />
                <Switch
                  title="Sleep last night"
                  value={props.values.sleptLastNight}
                  onValueChange={value =>
                    props.setFieldValue('sleptLastNight', value)
                  }
                  warning={
                    !props.errors.sleptLastNight
                      ? warnings.sleptLastNight
                      : null
                  }
                  alert={
                    props.errors.sleptLastNight
                      ? props.errors.sleptLastNight
                      : undefined
                  }
                />
                <Input
                  placeholderText="Are you on any medication?"
                  label="Are you on any medication?"
                  defaultValue=""
                  onChangeText={value =>
                    props.setFieldValue('takingAnyMedicines', value)
                  }
                  warning={
                    !props.errors.takingAnyMedicines
                      ? warnings.takingAnyMedicines
                      : undefined
                  }
                  alert={
                    props.errors.takingAnyMedicines
                      ? props.errors.takingAnyMedicines
                      : undefined
                  }
                />
                <Switch
                  title="Consumed Alcohol?"
                  value={props.values.consumedAlcohol}
                  onValueChange={value =>
                    props.setFieldValue('consumedAlcohol', value)
                  }
                  warning={
                    !props.errors.consumedAlcohol
                      ? warnings.consumedAlcohol
                      : null
                  }
                  alert={
                    props.errors.consumedAlcohol
                      ? props.errors.consumedAlcohol
                      : undefined
                  }
                />
                <Input
                  placeholderText="Any medical condition?"
                  label="Any medical condition?"
                  defaultValue=""
                  onChangeText={value =>
                    props.setFieldValue('anyMedicalCondition', value)
                  }
                  warning={
                    !props.errors.anyMedicalCondition
                      ? warnings.anyMedicalCondition
                      : null
                  }
                  alert={
                    props.errors.anyMedicalCondition
                      ? props.errors.anyMedicalCondition
                      : undefined
                  }
                />
                <Button title="SUBMIT" onButtonPress={props.handleSubmit} />
              </View>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default connect(null, { setVisited })(HealthForm)

const styles = StyleSheet.create({
  backgroundStyle: {
    ...backgroundStyle,
    padding: 24
  },
  view: {
    marginBottom: 48
  },
  title: {
    color: '#EEE',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24
  }
})
