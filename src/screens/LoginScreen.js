import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard, ImageBackground, Text} from 'react-native';
import {UserLogin} from '../components/UserLogin'

export const LoginScreen = ({navigation}) =>{
    return (
        <ImageBackground source={{uri: 'https://i.imgur.com/2Cs8tf3.jpeg'}} 
                          style={{flex:1, width:null, height:null, opacity:0.8, justifyContent: 'center',alignItems: 'center',}}>
                  
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <UserLogin navigation={navigation}/>
            </View>
          </TouchableWithoutFeedback>
          
        </KeyboardAvoidingView>
        </ImageBackground>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: "space-around"
    },
    textInput: {
      height: 40,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 36
    },
  });
