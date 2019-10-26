import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Icon, ListItem } from 'react-native-elements'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';

import styles from './style'

// import { Container } from './styles';

class Visit extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Visita ${navigation.getParam('customName')}`,
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

  readDeliveryItem(){
    this.setState({showCamera: !this.state.showCamera})
  }

  barcodeRecognized(data){
    console.log(data)
    if(data.barcodes.length > 0){
      this.setState({
        collecteds: [...this.state.collecteds, data.barcodes[0].data]
      })
      this.setState({showCamera: false})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.showCamera && 
        <View style={styles.visitData}>
          <Card title="Entregas" >
            {
              this.props.visit.deliverables.map((delivery, i) => {
                return (
                  <ListItem
                    key={i}
                    roundAvatar
                    title={delivery.barcode}
                    subtitle="teste"
                    leftIcon={{ name: 'shopping-bag', type: 'feather', color: '#517fa4' }}
                  />
                );
              })
            }
          </Card>
        </View>
        }
        {this.state.showCamera && 
        <View style={styles.cameraView}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.camera}  
            onGoogleVisionBarcodesDetected={this.barcodeRecognized.bind(this)}
          >
          </RNCamera>
          <Button
          title="Fechar"
          containerStyle={{flex: 1, flexWrap: 'nowrap', justifyContent: 'flex-end', alignItems: 'center'}}
          onPress={() => this.readDeliveryItem()}
        />
        </View>
        }
        <View style={styles.footerButtons}>
        <Button
          title="Entregar"
          containerStyle={{width: '50%'}}
          onPress={() => this.readDeliveryItem()}
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

const mapStateToProps = (state, props) => {
  return {visit: state.visitReducer.visits.filter(item => item.id == props.navigation.getParam('visitId'))[0]}
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);


export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Visit);
