import React from 'react'
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EventLine = ({eventObj, navigation}) =>{
    
    return (
        <TouchableOpacity 
                key={eventObj.name} 
                style={styles.lineArea} 
                onPress={()=> {
                    // check access to event
                    AsyncStorage.setItem('eventSession', eventObj.name);
                    AsyncStorage.getItem('eventSession', (err, result) => {
                    });
                    
                    AsyncStorage.setItem('eventObj', JSON.stringify(eventObj.event));
                    AsyncStorage.getItem('eventObj', (err, result) => {
                    });

                    navigation.navigate('Event', 
                        {event: eventObj.event,
                        eventName: eventObj.name}
                    )
                }}
                delayPressIn={100} 
                delayPressOut={100} 
                delayLongPress={100}>
                    <Text>{eventObj.name}</Text>
                    <Text>{eventObj.date.toISOString().slice(0, 10)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
       lineArea:{
           borderStartColor: '#000',
           marginVertical: 0,
           borderColor: 'gray',
           borderWidth:0.2,
        //    width: '0%',
           opacity:0.8,
           alignItems: 'flex-start',
           justifyContent: 'center',
            height: 65,
            // borderRadius: 15,
            backgroundColor: "#fff",
            paddingLeft: '2%',
      },
    }
)