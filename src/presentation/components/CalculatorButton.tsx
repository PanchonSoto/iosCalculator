import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { colors, styles } from '../../config/theme/app-theme';

interface Props {
    label: string;
    color?: string;
    doubleSize?: boolean;
    blackText?: boolean;
}


const CalculatorButton = ({
    label,
    color = colors.darkGray,
    doubleSize = false,
    blackText = false
}:Props) => {
  return (
    <View style={{ flex: doubleSize ? 2 : 1 }}>
        <Pressable 

         style={ ({pressed}) =>({
             ...styles.button,
             backgroundColor: color,
             opacity: (pressed) ? 0.8 : 1,
             width: doubleSize ? 'auto' : 80
            })}
        >
            <Text style={{
                ...styles.btnText,
                color: (blackText) ? 'black':'white'
            }}>{label}</Text>
        </Pressable>
    </View>
  )
}

export default CalculatorButton;
