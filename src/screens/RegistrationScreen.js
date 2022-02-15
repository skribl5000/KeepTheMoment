import { StyleSheet, Text, View, KeyboardAvoidingView,
     Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import React from "react";
import {UserRegistration} from '../components/UserRegistration'

export const RegistrationScreen = ({navigation}) =>{
    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <UserRegistration navigation={navigation}/>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );

}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    inner: {
      // padding: 24,
      flex: 1,
      // justifyContent: "space-around"
    },
    textInput: {
      height: 40,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 36
    },
  });
  