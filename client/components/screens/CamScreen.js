import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { fetchPictures, incrementPicIndex } from '../../actions/actions';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos/';

class CamScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  
  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };
  
  onPictureSaved = async photo => {
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${PHOTOS_DIR}${this.props.currentAlbum}/${Date.now()}.jpg`,
    });
    this.props.incrementPicIndex();
  }
  
  renderCamera() {
    return (
        <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
          <View style={styles.content}>
            <View style={styles.bottomIcons}>
            <TouchableOpacity onPress={this.takePicture}>
              <MaterialCommunityIcons name="camera-iris" style={styles.takePicBtn} />
            </TouchableOpacity>
            </View>
          </View>
        </Camera>
    );
  }

  render() {
    const { hasCameraPermission, focusedScreen } = this.state;
    if (hasCameraPermission === null) {
      return <View></View>
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return this.renderCamera();
    } 
  }
}

const mapStateToProps = (state) => ({
  currentAlbum: state.current_album,
  picIndex: state.picIndex
});
const mapDispatchToProps = (dispatch) => ({
  fetchPictures: (pictures) => dispatch(fetchPictures(pictures)),
  incrementPicIndex: () => dispatch(incrementPicIndex())
});

export default connect(mapStateToProps, mapDispatchToProps)(CamScreen);

const styles = StyleSheet.create({
  header: { 
    backgroundColor: 'transparent', 
    left: 0, 
    top: 10, 
    zIndex: 100, 
    alignItems: 'center' 
  },
  headerView: { 
    flexDirection: 'row', 
    flex: 1, 
    justifyContent: 'space-between'
  },
  text: {
    color: 'rgb(255,255,255)'
  },
  icon: {
    color: 'rgb(255,255,255)'
  },
  content: {
    flexDirection: 'row', 
    flex: 2, 
    justifyContent: 'space-between', 
    paddingHorizontal:10, 
    marginBottom: 15, 
    alignItems: 'flex-end'
  },
  bottomIcons: {
    flex: 1, 
    justifyContent: 'space-around', 
    alignItems: 'center'
  },
  takePicBtn: {
    color: 'rgb(255,255,255)', 
    fontSize: 70
  }
});