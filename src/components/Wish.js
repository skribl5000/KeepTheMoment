import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity,
    Platform, TouchableWithoutFeedback, Keyboard, ImageBackground, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Wish = ({wishObj}) =>{
    
    return (
        <TouchableOpacity>
            <View style={styles.wishStyle}>
                <Text>Wish</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
      wishStyle:{
          width: 150,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
          backgroundColor: '#C4C4C4',
          borderRadius:10,
          opacity: 0.9,
      }
    }
)