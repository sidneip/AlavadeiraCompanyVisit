import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Icon } from 'react-native-elements'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';

// import { Container } from './styles';

class Visit extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Visita ${navigation.getParam('visitId', 'A Nested Details Screen').toString()} - ${navigation.getParam('customName')}`,
    };
  };
  constructor(props){
    super(props);
    this.state = {
      visitId: props.navigation.getParam('visitId'),
      showCamera: false,
      action: '',
      collecteds: []
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.visitData}>
          <Text h3> Visita: {this.props.visit.id}</Text>
          <Card title="Entregas">
            {
              this.props.visit.deliverables.map((delivery, i) => {
                return (
                  <View key={i} style={styles.user}>
                    <View>
                      <Icon
                        reverse
                        name='shopping-bag'
                        type='feather'
                        color='#517fa4'
                      />

                      <Text>{delivery.barcode}</Text>
                    </View>
                  </View>
                );
              })
            }
          </Card>
        </View>
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
  visitData: {
    flex: 1,
    width: '100%'
  },
  cameraView: {
    flex: 1,
    width: '100%',
    height: 100,
  }, 
  camera: {
    flex: 1,
    marginTop: 10,
    top: 10,
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
  return {visit: state.visitReducer.visits.filter(item => item.id == props.navigation.getParam('visitId'))[0]}
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);


export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Visit);
