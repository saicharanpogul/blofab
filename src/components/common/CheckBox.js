import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { CheckedIcon, UncheckedIcon } from '../../assets/icons'
import { useField } from 'formik'

const CheckBox = ({ title, ...props }) => {
  const [field, meta, helpers] = useField(props.name)
  const { value } = meta
  const { setValue } = helpers
  return (
    <View>
      <View style={styles.checkBox}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={() => (value ? setValue(false) : setValue(true))}
          {...field}
          activeOpacity={1}>
          <Image
            style={styles.icon}
            source={value ? CheckedIcon : UncheckedIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

export default CheckBox

const styles = StyleSheet.create({
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24
  },
  icon: {
    width: 20,
    height: 20
  },
  title: {
    color: '#EEE',
    marginStart: 10,
    textAlign: 'auto',
    width: 310
  }
})
