import React, { Component } from 'react';

import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { ListItem, Header } from 'react-native-elements'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetch } from '../../store/ducks/visit'
import { navigate } from '~/services/navigation';
// import { Container } from './styles';

class Main extends Component {
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
        onPress={() => { navigate('Visit')}}
        bottomDivider
        chevron
      />
    )
  }

  render() {
    return(
      <View styles={ {flex:1, paddingTop:22}}>
         {this.props.loading && 
          <ActivityIndicator size="large" alignItems="center" justifyContent="center"  color="#0000ff" />
        }

        <FlatList 
        data={this.props.visits}
        renderItem={this.renderItem} 
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
