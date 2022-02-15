import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventScreen } from './EventScreen';
import { EventsScreen} from './EventsScreen';

export const StartScreen = ({navigation}) =>{

  const [event, setEvent] = useState('');
  const [username, setUsername] = useState('');
  const [eventObj, setEventObj] = useState('');

    useEffect(() => {
      AsyncStorage.getItem('eventSession', (error, result) => {
        if (!error && result !== '') {
          setEvent(result);
        }
      });

      AsyncStorage.getItem('eventObj', (error, result) => {
        if (!error && result !== '' && result != 'undefinded' && result != null) {
          setEventObj(result);
        }
      });

      async function getCurrentUser() {
        // This condition ensures that username is updated only if needed
        if (username === '') {
          const currentUser = await Parse.User.currentAsync();
          if (currentUser !== null) {
            setUsername(currentUser.getUsername());
          }
        }
      }

      getCurrentUser();
    }, [event, username, eventObj])

    if(username !== 'null'){
          if (event !== null){
            // render exact event from current session
            return <EventScreen 
                    navigation={navigation} 
                    eventName = {event}
                    event={eventObj}
                  />
          }
          else{
            // render event chose screen
            return <EventsScreen navigation={navigation}/>
          }
        }
      else{
        // login/signup screen rendering.
        return (
          <ImageBackground source={require('../assets/background_image.jpg')} 
                          style={{flex:1, width:null, height:null, opacity:0.8, justifyContent: 'center',alignItems: 'center',}}>
                  <Image source={require('../assets/logo.png')} style={styles.loginImage}/>
                  <TouchableOpacity style={styles.userActionButton} onPress={() => navigation.navigate('Login')}><Text>Вход</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.userActionButton} onPress={() => navigation.navigate('Registration')}><Text>Регистрация</Text></TouchableOpacity>
                   <TouchableOpacity style={styles.passwordResetButton} onPress={() => navigation.navigate('PasswordReset')}>
                       <Text style={styles.passwordResetText}>Забыли пароль?</Text>
                   </TouchableOpacity>
          </ImageBackground>
    );
      }
    ;
    
  }

const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    userActionButton:{
      marginVertical:8,
      alignItems: "center",
      backgroundColor: "#fff",
      paddingVertical: 20,
      width: 280,
      borderRadius: 20,
    },
    passwordResetButton:{
      alignItems: "flex-end",
      paddingHorizontal: 10,
    },
    passwordResetText:{
      color: '#fff',
      fontWeight: '600',
    },
    logo:{
      marginTop: '75%',
      marginBottom:'15%',
    }
  });
  