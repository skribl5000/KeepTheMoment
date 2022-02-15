import Parse from 'parse/react-native';
import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image
} from 'react-native';

export const UserLogin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const doUserLogIn = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    return await Parse.User.logIn(usernameValue, passwordValue)
      .then(async (loggedInUser) => {
        const currentUser = await Parse.User.currentAsync();
        console.log(loggedInUser === currentUser);
        return true;
      })
      .catch((error) => {
        return false;
      });
  };

  return (
      <View style={styles.containter}>
          <Image source={require('../assets/logo.png')} style={styles.loginImage}/>
        <TextInput
          style={styles.input}
          value={username}
          keyboardType={'phone-pad'}
          placeholder={'Номер телефона'}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder={'Пароль'}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => {
          doUserLogIn();
          navigation.navigate('Events')
        }
        } style={styles.signUpButton}>
            <Text>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.passwordResetButton} onPress={() => {}}>
                    <Text style={styles.passwordResetText}>Забыли пароль?</Text>
          </TouchableOpacity>
      </View>
  );
};

const getCurrentUser = async function () {
  const currentUser = await Parse.User.currentAsync();
  return currentUser;
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
    },
    passwordResetButton:{
        alignItems: "flex-end",
        paddingHorizontal: 10,
      },
      passwordResetText:{
        color: '#fff',
        fontWeight: '600',
      },
  });