import React, { Component } from 'react';

import { View, StyleSheet, BackHandler } from 'react-native';
import { Button, Text, Card, Icon, ListItem } from 'react-native-elements'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import _ from 'lodash'
import { sendCheckin, deliverItem, collectItem, finishVisit } from '../../store/ducks/visit' 
import styles from './style'
import { NavigationActions } from 'react-navigation'
// import { Container } from './styles';

class Visit extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Visita ${navigation.getParam('customName')}`
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

  readItem(action){
    this.setState({showCamera: !this.state.showCamera, action: action})
  }

  sendCheckin(){
    this.props.sendCheckin([this.props.visit.id], (new Date).toTimeString())
  }

  readCollectItem(data){
    this.props.collectItem(this.props.visit.id, data)
  }

  readDeliverItem(data){
    this.props.deliverItem(this.props.visit.id, data)
  }

  barcodeRecognized(data){
    if(data.barcodes.length > 0){
      switch (this.state.action) {
        case 'collect':
          this.readCollectItem(data.barcodes[0].data)
          break;
        case 'deliver':
          this.readDeliverItem(data.barcodes[0].data)
          break;
        default:
          alert('Tente novamente.')
          break;
      }
      this.setState({showCamera: false})
    }
  }

  itemStatusIcon(code){
    if(this.props.visit.delivered && _.contains(this.props.visit.delivered, code)){
      return { name: 'check', type: 'feather', color: 'green' }
    }else{
      return { name: 'alert-circle', type: 'feather', color: 'red' }
    }
  }

  deliverableTitle(code){
    const item = _.findLast(this.props.visit.deliverables, function(item) {
      return item.barcode.toString() == code.toString()
    })
    console.log(item)
    if(item && item.loaded){
      return "Carregado" 
    }else{
      return ''
    }
  }

   render() {
    return (
      <View style={styles.container}>
        {this.props.visit && this.props.visit.checkin &&
          <Button
            title="CONFIRMAR VISITA"
            containerStyle={{width: '100%', marginTop: 10}}
            onPress={() => this.props.finishVisit(this.props.visit.id)}
          />
        }
        {console.log(this.props.visit)}
        {this.props.visit && !this.props.visit.checkin && this.props.visit.delivery_status == 'started' &&
          <Button
            title="Marcar Chegada"
            containerStyle={{width: '100%', marginTop: 10}}
            onPress={() => this.sendCheckin()}
          />
        }
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
                    rightIcon={this.itemStatusIcon(delivery.barcode)}
                    rightTitle={this.deliverableTitle(delivery.barcode)}
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
          onPress={() => this.readItem('close')}
        />
        </View>
        }
        <View style={styles.footerButtons}>
        <Button
          title="Entregar"
          containerStyle={{width: '50%'}}
          onPress={() => this.readItem('deliver')}
        />
        <Button
          title="Coletar"
          containerStyle={{paddingLeft: 10, width: '50%'}}
          onPress={() => this.readItem('collect')}
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
  bindActionCreators({ sendCheckin, deliverItem, collectItem, finishVisit }, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visit);
