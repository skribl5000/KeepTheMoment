import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View, 
    TouchableOpacity, Text, Image, ImageBackground } from "react-native";
import Parse from "parse/react-native";

export const UserRegistration = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, updateConfirmPassword] = useState("");

  function setConfirmPassword(passwordText){
    updateConfirmPassword(passwordText)
    console.log(confirmPassword === password)
  }

  const doUserRegistration = async function () {
    const usernameValue = username;
    const passwordValue = password;
    return await Parse.User.signUp(usernameValue, passwordValue)
      .then((createdUser) => {
        // Parse.User.signUp returns the already created ParseUser object if successful
        Alert.alert(
          'Success!',
          `User ${createdUser.getUsername()} was successfully created!`,
        );
        return true;
      })
      .catch((error) => {
        // signUp can fail if any parameter is blank or failed an uniqueness check on the server
        Alert.alert('Error!', error.message);
        return false;
      });
  };

  return (
      <ImageBackground source={{uri: 'https://i.imgur.com/2Cs8tf3.jpeg'}} 
      style={{flex:1, width:null, height:null, opacity:0.8, justifyContent: 'center',alignItems: 'center',}}>
          <Image source={require('../assets/logo.png')} style={styles.loginImage}/>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Номер телефона"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
        keyboardType={'phone-pad'}
        dataDetectorTypes={'phoneNumber'}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Пароль"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        // value={confirmPassword}
        placeholder={"Подтвердите пароль"}
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={()=> doUserRegistration()}>
        <Text>Создать аккаунт</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={{color:'white', fontWeight:'600'}}>Уже есть аккаунт?</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 280,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius:10,
    padding:15,
  },
  containter:{
      justifyContent:'center',
      alignItems:'center'
  },
  signUpButton:{
    width:'50%',
    marginTop:10,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent:'center',
    alignItems:'center'
  },
  loginImage:{
      marginVertical:20,
  },
  loginButton:{
      marginVertical:10,
      color:'white',
  }
});