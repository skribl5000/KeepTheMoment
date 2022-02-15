import React, {useState, useEffect} from 'react';
import { ImageBackground, Text, View, StyleSheet, ScrollView, TextInput} from 'react-native';
import Parse from 'parse/react-native';
import {EventLine} from '../components/EventLine'
import { TouchableOpacity } from 'react-native-gesture-handler';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// Parse.setAsyncStorage(AsyncStorage);
// //You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
// Parse.initialize('ulZE3dxCgf2CcpcyJ85Y9d12D0fwCmVJKFSa9wfq','0C5bsea6ut27hLctE1NnrtLKAh037ZMPK16DeV8h');
// Parse.serverURL = 'https://parseapi.back4app.com/';

export const EventsScreen = ({navigation}, userName) =>{
    const [username, setUsername] = useState(userName);
    const [events, setEvents] = useState([])
  // useEffect is called after the component is initially rendered and
  // after every other render

  const doUserLogOut = async function (navigation) {
    return await Parse.User.logOut()
      .then(async () => {
        // To verify that current user is now empty, currentAsync can be used
        const currentUser = await Parse.User.currentAsync();
        if (currentUser === null) {
          console.log('Success!', 'No user is logged in anymore!');
        }
        // Navigation dispatch calls a navigation action, and popToTop will take
        // the user back to the very first screen of the stack
        navigation.navigate('Login');
        return true;
      })
      .catch((error) => {
        console.log('Error!', error.message);
        return false;
      });
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Since the async method Parse.User.currentAsync is needed to
    // retrieve the current user data, you need to declare an async
    // function here and call it afterwards
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
    }, [username]);

    useEffect(() => {
        // Since the async method Parse.User.currentAsync is needed to
        // retrieve the current user data, you need to declare an async
        // function here and call it afterwards
        async function getUserEvents() {
            setLoading(true)
          // This condition ensures that username is updated only if needed
            const currentUser = await Parse.User.currentAsync();
            if (events.length == 0){
                let eventsQuery = new Parse.Query("Event");
                eventsQuery.equalTo('User', currentUser);
                let eventsResult = await eventsQuery.find(); 
                // console.log(eventsResult)
                let res = []
                eventsResult.forEach(event=>{
                    const eventDict = {
                        name: event.get('eventName'),
                        date: event.get('eventDate'),
                        event: event 
                    } 
                    res.push(eventDict)
                })
                setEvents(res);
        } 
        setLoading(false);
        }
        getUserEvents();
        }, [events]);

    return (
          <ImageBackground source={require('../assets/background_image.jpg')} 
                          style={{flex:1, width:null, height:null, opacity:0.8,
                           justifyContent: 'center',alignItems: 'center'}}>
                  <View style={styles.eventsHeader}>
                      <TouchableOpacity
                      onPress={() => doUserLogOut(navigation)}
                      ><Text>Quit</Text></TouchableOpacity>
                      </View>
                    <View style={styles.searchField}><TextInput placeholder={'Search'} style={{color:'#000'}}/></View>
                  <ScrollView 
                    style={styles.eventsContainer} 
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'
                  >
                    {events.map(eventObject => 
                    <EventLine 
                      eventObj={eventObject} 
                      navigation={navigation} 
                      key={eventObject.name}
                    />)}

                    {/* TODO: spinner. */}
                    
                    {loading ? <Text>Loading..</Text>: null} 
                  </ScrollView>
          </ImageBackground>
    );
  }
  const styles = StyleSheet.create({
      eventsContainer:{
          flex:1,
        //   height: '50%',
          width: '100%',
        //   backgroundColor: '#fff',
        //   opacity: 0.5,
          marginBottom:'25%'
      },
      eventElement:{

      },
      eventsHeader:{
          paddingVertical: 35,
          marginTop: 10
      },
      searchField:{
          backgroundColor: 'gray',
          width: '73%',
          paddingVertical: 10,
          opacity: 0.2,
          borderRadius: 20,
          justifyContent: 'center',
          paddingLeft: 10,
          marginBottom: 20,
          marginRight: 40,
      }
  });
  