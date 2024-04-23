import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { colors, styles } from '../../config/theme/app-theme'
import CalculatorButton from '../components/CalculatorButton'
import { useCalculator } from '../hooks/useCalculator'

export const CalculatorScreen = () => {

  const { 
    number, prevNumber, buildNumber, toggleSign, 
    clean, deleteOperation,
    divideOp, multiplyOp, subtractOp, addOp,
    calculateResult
  } = useCalculator();

  return (
    <View style={styles.containerCal}>
      <View style={{ paddingHorizontal:30, paddingBottom:20 }}>
        <Text
         adjustsFontSizeToFit
         numberOfLines={1}
         style={styles.mainResult}
        >
          {number}
        </Text>
        <Text
         adjustsFontSizeToFit
         numberOfLines={1} 
         style={styles.subResult}>
          { (prevNumber==='0') ? '' : prevNumber }
        </Text>
      </View>

      <View style={styles.row}>
        <CalculatorButton onPress={()=>clean()} blackText label='C' color={colors.lightGray}/>
        <CalculatorButton onPress={()=>toggleSign()} blackText label='+/-' color={colors.lightGray}/>
        <CalculatorButton onPress={()=>deleteOperation()} blackText label='del' color={colors.lightGray}/>
        <CalculatorButton onPress={ divideOp } label='÷' color={colors.orange}/>
      </View>

      <View style={styles.row}>
        <CalculatorButton onPress={()=>buildNumber('7')} label='7' />
        <CalculatorButton onPress={()=>buildNumber('8')} label='8' />
        <CalculatorButton onPress={()=>buildNumber('9')} label='9' />
        <CalculatorButton onPress={ multiplyOp } label='x' color={colors.orange}/>
      </View>

      <View style={styles.row}>
        <CalculatorButton onPress={()=>buildNumber('4')} label='4' />
        <CalculatorButton onPress={()=>buildNumber('5')} label='5' />
        <CalculatorButton onPress={()=>buildNumber('6')} label='6' />
        <CalculatorButton onPress={ subtractOp } label='-' color={colors.orange}/>
      </View>

      <View style={styles.row}>
        <CalculatorButton onPress={()=>buildNumber('1')} label='1' />
        <CalculatorButton onPress={()=>buildNumber('2')} label='2' />
        <CalculatorButton onPress={()=>buildNumber('3')} label='3' />
        <CalculatorButton onPress={ addOp } label='+' color={colors.orange}/>
      </View>

      <View style={styles.row}>
        <CalculatorButton onPress={()=>buildNumber('0')} label='0' doubleSize/>
        <CalculatorButton onPress={()=>buildNumber('.')} label='.' />
        <CalculatorButton onPress={calculateResult} label='=' color={colors.orange}/>
      </View>

    </View>
  )
}
