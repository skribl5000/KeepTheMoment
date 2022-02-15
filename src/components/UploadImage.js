import  React, {useState} from  'react';
import {View, Button, Image, StyleSheet, Alert} from  'react-native';

import * as ImagePicker from 'expo-image-picker';
import Parse from 'parse/react-native.js';
import * as FileSystem from 'expo-file-system';

const  UploadImage = ({props}) => {
    // const currentEvent = JSON.parse(props.event)
    const eventName = props.eventName
    // console.log(currentEvent);

    const [image, setImage] = useState(null);
    async function upload() {
        // 1. Create a file
    const base64 = await    FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' });
    const fileName = image.uri.substring(image.uri.lastIndexOf('/') + 1, image.uri.length)
    const parseFile = new  Parse.File(fileName, {base64});

    try  {
      const responseFile = await  parseFile.save();

      const Gallery = Parse.Object.extend('Gallery');
      const gallery = new  Gallery();
      gallery.set('picture', responseFile);

    //   let eventQuery = new Parse.Query('Event');
    //   eventQuery.equalTo('eventName', eventName);
    //   let currentEvent = await eventQuery.first();
    //   console.log(currentEvent);
      
    //   gallery.set('Event', currentEvent)
  
    //   let galeryRelations = gallery.relation('Event');
    //   galeryRelations.add([currentEvent])
    // TODO: relation with current Event.
    // TODO: set current user as Owner to object.

      await gallery.save();
      setImage(null);
      Alert.alert('The file has been saved to Back4app.');
    } catch (error) {
        console.log(
          'The file either could not be read, or could not be saved to Back4app.',
        );
        console.log(error)
        setImage(null);
      }
}

let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImage(pickerResult);
  }

// This will open phone image library
function pickImage() {
    openImagePickerAsync();
}

return (
  <View>
	<Button
	  onPress={pickImage}
	  title="Pick an image from gallery"
	  color="#841584" />
	  {image && image.cancelled == false && 
        <View>
            <Image source={ {uri: image.uri} } style={styles.currentImage}/>

            <Button title="Upload" color="green" onPress={upload} />
        </View>}
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    height:  400,
    justifyContent:  'center',
    alignItems:  'center',
  },
  currentImage: {
	width:  250,
	height:  250,
	resizeMode:  'cover',
	alignSelf:  'center',
  },
});

export  default  UploadImage;