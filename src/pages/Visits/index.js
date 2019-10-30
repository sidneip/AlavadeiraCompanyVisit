import React, { Component } from 'react';

import { View, StyleSheet, FlatList, BackHandler } from 'react-native';
import { Button, Text, Card, Icon, ListItem } from 'react-native-elements'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import _ from 'lodash'
import { sendCheckin, deliverItem, collectItem, finishVisit } from '../../store/ducks/visit' 
import styles from './style'
import { navigate } from '~/services/navigation';
import { NavigationActions } from 'react-navigation'

// import { Container } from './styles';

class Visits extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Visitas',
      drawerLabel: () => null
    };
  };
  constructor(props){
    super(props);
    this.state = {
      visitId: props.navigation.getParam('address'),
      showCamera: false,
      action: '',
      collecteds: []
    }
  }

   readItem(action){
    this.setState({showCamera: !this.state.showCamera, action: action})
  }

  sendCheckin(){
    this.props.sendCheckin(this.props.visit.id, (new Date).toTimeString())
  }

  readCollectItem(data){
    this.props.collectItem(this.props.visit.id, data)
  }

  readDeliverItem(data){
    this.props.deliverItem(this.props.visit.id, data)
  }

  renderItem(item){
    console.log(item)
    return(
      <ListItem
        title={item.customer.name}
        subtitle={`${item.address.street} - ${item.address.number}`}
        leftIcon={{ name: 'directions-car' }}
        onPress={() => { navigate('Visit', {visitId: item.id, customName: item.customer.name})}}
        bottomDivider
        chevron
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={this.props.visits}
          renderItem={({item}) => { return this.renderItem(item)}}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {visits: state.visitReducer.visits.filter(item => `${item.address.cep}-${item.address.number}` == props.navigation.getParam('address'))}
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ sendCheckin, deliverItem, collectItem, finishVisit }, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visits);
