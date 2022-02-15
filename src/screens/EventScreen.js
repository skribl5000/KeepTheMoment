import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import React, {useState} from 'react';
import {ImageBackground, ScrollView} from 'react-native'
import {Wish} from '../components/Wish'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UploadImage from '../components/UploadImage'
import Gallery from '../components/Gallery'



import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Button
} from 'react-native';

function ScheduleScreen({navigation}) {
  return (
    <View style={styles.containter}>
    <Text>Schedule</Text>
  </View>
  );
}
function PhotosScreen({navigation, event, eventName}) {
  return (
    <View style={styles.containter}>
    <UploadImage props={{active:false, event:event, eventName: eventName}}/>
    <Gallery/>
  </View>
  );
}
function PostsScreen({navigation}) {
  return (
    <View style={styles.containter}>
    <Text>Posts Screen</Text>
  </View>
  );
}
function TablesScreen({navigation}) {
  return (
    <View style={styles.containter}>
    <Text>Tables Screen</Text>
  </View>
  );
}
function WishListScreen({navigation}) {
  const wishes = [0,1,2,3,4,5,6,7];
  return (
    <ImageBackground source={require('../assets/background_image.jpg')} 
                          style={styles.backgroundImage}
                          >
    <ScrollView 
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      paddingTop: 30}}>
                    {wishes.map(wish => 
                    <Wish key={wish}/>)}
    </ScrollView>
  </ImageBackground>
  );
}

const Tab = createBottomTabNavigator();

export const EventScreen = ({route, navigation, event, eventName}) => {
    if (typeof(eventName) != 'undefined'){
        if (typeof(eventName) == Object){
            // console.log(eventName)
            eventName = eventName['_W']
        }
    }
    if (typeof(eventName) == 'undefined'){
        // console.log(eventName)
        eventName = route.params['eventName']
    }

    if (typeof(event) != 'undefined'){
      if (typeof(event) == Object){
        event.log(event)
        event = event['_W']
      }
    }
    if (typeof(event) == 'undefined'){
        console.log(event)
        event = route.params['event']
    }


    function leaveEvent(navigation){
      AsyncStorage.setItem('eventSession', '');
      navigation.reset({
          index: 0,
          routes: [{name: 'Events'}],
        });
    }

    function leaveEventButton(navigation){
      return (
        <TouchableOpacity
        style={styles.leaveEventBtn}
        onPress={() => leaveEvent(navigation)}
        >
          <Image
            source={require('../assets/leave_event.png')}
            style={styles.leaveEventImage}
          />
        </TouchableOpacity>
      )
    }
  return (
    
      <Tab.Navigator 
      screenOptions={{
        tabBarStyle: { borderRadius:20},
        tabBarBackground: () => (
          <Image source={require('../assets/background_image.jpg')}/>
        )
      }}
      // screenOptions={{
      //   headerShown: false
      // }}
      >  
        <Tab.Screen name="Наш день" component={ScheduleScreen} navigation={navigation} 
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/tab_bar_icons/schedule.png')}
              />
         ),
         headerRight: () => (leaveEventButton(navigation)),        
        }}
        />
        <Tab.Screen name="Фотографии" children={()=><PhotosScreen event={event} eventName={eventName}/>}navigation={navigation} 
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/tab_bar_icons/photos.png')                  
              }/>
         ),
         headerRight: () => (leaveEventButton(navigation)),             
        }}/>
        <Tab.Screen name="Лента" component={PostsScreen} navigation={navigation} 
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/tab_bar_icons/photos.png')                  
              }/>
         ),
         headerRight: () => (leaveEventButton(navigation)),               
        }}
        />
        <Tab.Screen name="Зал" component={TablesScreen} navigation={navigation} 
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/tab_bar_icons/tables.png')                  
              }/>
         ),
         headerRight: () => (leaveEventButton(navigation)),             
        }}
        />
        <Tab.Screen name="Подарки" component={WishListScreen} navigation={navigation} 
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/tab_bar_icons/gifts.png')                  
              }/>
         ),
         headerRight: () => (leaveEventButton(navigation)),             
        }}
        />

      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    containter:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    bottomTabIcon:{
      width: 30,
      height: 30
    },
    leaveEventImage:{
      flex: 1,
      resizeMode: 'contain'
    },
    leaveEventBtn:{
      height: '60%',
      marginRight: 7
    },
    backgroundImage:{
      flex:1,
      opacity:0.8,
      justifyContent: 'center',
      alignItems: 'center'},
      addPhotoBtn:{
        marginRight: 20,
        borderColor: '#000',
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 6

      },
  }
  );