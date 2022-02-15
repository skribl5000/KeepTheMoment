import React, {useState, useEffect} from  'react';
import {Text, Image, FlatList, StyleSheet, RefreshControl, TouchableWithoutFeedBack} from 'react-native';

import Parse from 'parse/react-native.js';

// import ImageBrowser from 'react-native-interactive-image-gallery'

class Images extends React.PureComponent{
  render() {
    const imageURLs= this.props.images.map(
      (img, index) => ({
        URI: img.uri,
        thumbnail: img.thumbnail,
        id: String(index),
        title: img.title,
        description: img.description
      })
    )
    return <ImageBrowser images={imageURLs} />
  }
}

const Gallery = () => {
const [images, setImages] = useState([]);

useEffect(() => {
  const fetchImages = async () => {
	let query = new Parse.Query('Gallery');
	const results = await query.find();
	setImages(results);
  };
  
  fetchImages();
}, []);

const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const fetchImages = async () => {
        let query = new Parse.Query('Gallery');
        const results = await query.find();
        setImages(results);
      };
      
    fetchImages(); 
    setRefreshing(false);
  }, []);

return (
    // TODO: pagination from top to bottom.
  <FlatList
    refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        />
    }
    style={styles.container}
	contentContainerStyle={styles.listContent}
	data={images}
	horizontal={false}
	numColumns={3} // FIXME: doesn't work correctly with 1 or 2 images in a line.
	ListEmptyComponent={() =>  <Text>No images uploaded.</Text>}
	renderItem={({item}) => 
	  <Image source={ {uri: item.get('picture').url()} } style={styles.imageItem}/>
	}
	keyExtractor={(item) => item.id}
  />
  );
};

const  styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#f5f5f5',
    width: '100%',
    // flexDirection: 'row'
  },
  listContent: {
	justifyContent: 'flex-start',
	alignItems: 'flex-start'
  },
  imageItem: {
    width: '33%',
	height: 100,
	resizeMode: 'cover',
	marginHorizontal: .5,
	marginVertical: .5
  },
});

export default Gallery;