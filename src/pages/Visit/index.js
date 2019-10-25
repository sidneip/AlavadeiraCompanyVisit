import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';

// import { Container } from './styles';

class Visit extends Component {
  constructor(props){
    super(props);
    this.state = {
      visitId: props.navigation.getParam('visitId'),
      showCamera: true,
      action: ''
    }
  }
  render() {
    console.log(this.props.visit)
    return (
      <View style={styles.container}>
        {this.state.showCamera && 
        <View style={styles.cameraView}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
              width: '100%',
            }}  
            onGoogleVisionBarcodesDetected={this.barcodeRecognized}
          >
          </RNCamera>
        </View>
        }
        <View style={styles.footerButtons}>
        <Button
          title="Entregar"
          containerStyle={{width: '50%'}}
        />
        <Button
          title="Coletar"
          containerStyle={{paddingLeft: 10, width: '50%'}}
        />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cameraView: {
    flex: 1,
    width: '100%',
    top: 0,
    height: 100
  }, 
  camera: {
    flex: 1,
    height: 20,
  },
  footerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 5
  }
})
const mapStateToProps = (state, props) => {
  return {visit: state.visitReducer.visits.filter(item => item.id == props.navigation.getParam('visitId'))}
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);


export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Visit);
