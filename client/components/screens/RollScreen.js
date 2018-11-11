import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { fetchAlbums, renderAlbum } from '../../actions/actions';
import Icon from 'react-native-vector-icons/Ionicons';

class RollScreen extends Component {

  componentWillMount = async () => {

  };

  handlePress = (album) => {
    this.props.renderAlbum(album);
    this.props.navigation.navigate('Album');
  }

  renderAlbum = album => {
    const albumName = album.slice(0, album.lastIndexOf("_"));
    return <TouchableHighlight onPress={() => this.handlePress(album)} underlayColor="white" style={styles.rowContainer}>
      {(this.props.currentAlbum === album) ?
        <View style={styles.rowCurrentAlbum} >
          <Image source={require('../../assets/film.png')} style={styles.rollThumbnail} />
          <Text style={styles.titleCurrentAlbum}>{albumName.toUpperCase()}</Text>
          {/* <Icon name='ios-arrow-forward' size={24} /> */}
        </View> :
        <View style={styles.row} >
        <Image source={{ uri: 'https://static.wixstatic.com/media/2175dd_00a6e67d3bfc4af1ba9e9c423bd467f2~mv2.jpeg/v1/fill/w_808,h_354,al_c,q_80,usm_0.66_1.00_0.01/2175dd_00a6e67d3bfc4af1ba9e9c423bd467f2~mv2.jpeg' }} style={styles.thumbnail} />
        <Text style={styles.title}>{albumName.toUpperCase()}</Text>
        {/* <Icon name='ios-arrow-forward' size={24} /> */}
      </View> 
      }
    </TouchableHighlight>;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/bg-reversed.jpg')} style={styles.backgroundImage} />
        <View style={styles.wraper}>
          <FlatList
            data={this.props.albums}
            extraData={this.state}
            keyExtractor={(item, index) => item}
            renderItem={({ item, separators }) => this.renderAlbum(item)}
          />
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  albums: state.albums,
  currentAlbum: state.currentAlbum,
  developingAlbum: state.developingAlbum,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: (albums) => dispatch(fetchAlbums(albums)),
  renderAlbum: (album) => dispatch(renderAlbum(album)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RollScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  wraper: {
    flex: 1,
    marginTop: 10,
    // backgroundColor: 'rgb(255, 255, 255)',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: (Dimensions.get('window').height / 5) - 12,
  },
  thumbnail: {
    height: '100%',
    width: (Dimensions.get('window').width) * 0.3,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: 'rgb(255, 255, 255)',
    borderRadius: 10,
  },
  rowCurrentAlbum: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'rgb(255, 255, 255)',
    borderBottomWidth: 4,    
    alignItems: 'center',
  },
  rollThumbnail: {
    height: '70%',
    width: '25%',
    // height: (Dimensions.get('window').height)*0.2,
    // width: (Dimensions.get('window').width)*0.2 ,
    resizeMode: 'contain',
  },
  rowContainer: {
    marginVertical: 5,
    height: (Dimensions.get('window').height / 5),
    backgroundColor: 'rgba(255, 255, 255, .5)',
  },
  title: {
    color: 'rgb(255, 255, 255)',
    letterSpacing: 2,
    paddingRight: 10,    
  },
  titleCurrentAlbum: {
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Montserrat-ExtraBold',
    letterSpacing: 2,
    paddingRight: 10,
  },
});