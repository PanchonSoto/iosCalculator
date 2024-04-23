import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from '../../../config/theme/app-theme'

export const CalculatorScreen = () => {
  return (
    <View style={styles.containerCal}>
      <View style={{ paddingHorizontal:30, paddingBottom:20 }}>
        <Text style={styles.mainResult}>1500</Text>
        <Text style={styles.subResult}>15</Text>
      </View>

      <View style={styles.row}>
        <Pressable style={styles.button}>
          <Text style={styles.btnText}>1</Text>
        </Pressable>
      </View>

    </View>
  )
}
