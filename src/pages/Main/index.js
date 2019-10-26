import React, { Component } from 'react';

import { View, FlatList, StyleSheet, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import { ListItem, Header, Button } from 'react-native-elements'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetch } from '../../store/ducks/visit'
import { navigate } from '~/services/navigation';
// import { Container } from './styles';

class Main extends Component {
  static navigationOptions = {
    title: 'Visitas'
  };

  constructor(props){
    super(props);
    this.state = {
      visits: []
    }
  }
  componentDidMount(){
    this.props.fetch()
    console.log('montou')
  }

  renderItem({item}) {
    return(
      <ListItem
        title={item.customer.name}
        subtitle={item.trajectory}
        leftIcon={{ name: 'directions-car' }}
        onPress={() => { navigate('Visit', {visitId: item.id, customName: item.customer.name})}}
        bottomDivider
        chevron
      />
    )
  }

  render() {
    return(
      <View styles={styles.container}>
        {this.props.loading &&
          <ActivityIndicator  style={styles.loading}  size="large"  color="#0000ff" />
        }

        <FlatList 
        data={this.props.visits}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { visits: state.visitReducer.visits, loading: state.visitReducer.loading }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetch }, dispatch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    marginTop:'50%'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
