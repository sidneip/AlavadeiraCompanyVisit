import React, { Component } from 'react';

import { View, FlatList, StyleSheet, RefreshControl, ActivityIndicator, AsyncStorage, SectionList } from 'react-native';
import { ListItem, Header, Button, Text, Icon} from 'react-native-elements'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetch } from '../../store/ducks/visit'
import { navigate } from '~/services/navigation';
import { DrawerActions } from 'react-navigation-drawer';
import _ from 'lodash'
// import { Container } from './styles';

class Main extends Component {
  static navigationOptions = {
    title: 'Visitas'
  };

  constructor(props){
    super(props);
    this.state = {
      visits: [],
      refreshing: false
    }
  }
  componentDidMount(){
    this.props.fetch()
    let visits = _.chain(this.props.visits)
        // Group the elements of Array based on `color` property
        .groupBy("trajectory")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => ({ title: key, data: value }))
        .orderBy(value => {value.data.priority})
        .value()
    this.setState({visits: visits})
  }

  renderItem({item}) {
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

  onRefresh(){
    this.props.fetch()
  }

  render() {
    return(
      <View styles={styles.container}>
        <Header
          leftComponent={<Icon name="menu" onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} />}
        />
        {this.props.loading &&
          <ActivityIndicator  style={styles.loading}  size="large"  color="#0000ff" />
        }

        <SectionList
        sections={this.state.visits}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }

        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text h3>{title}</Text>
        )}
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
