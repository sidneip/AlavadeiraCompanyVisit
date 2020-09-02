import React, { Component } from 'react';

import { View, FlatList, StyleSheet, RefreshControl, ActivityIndicator, AsyncStorage, SectionList } from 'react-native';
import { ListItem, Header, Button, Text, Icon} from 'react-native-elements'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetch } from '../../store/ducks/visit'
import { navigate } from '~/services/navigation';
import { DrawerActions } from 'react-navigation-drawer';
import _ from 'lodash'
import NestedListView, {NestedRow} from 'react-native-nested-listview'
import colors from '../../styles/colors'
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
    this.visitOfTheTime = this.visitOfTheTime.bind(this);
  }
  componentDidMount(){
    this.props.fetch()
    let visits = _.chain(this.props.visits)
        // Group the elements of Array based on `color` property
        .groupBy("trajectory")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => ({ title: key, data: _.groupBy(value, (visit) => {return `${visit.address.cep}-${visit.address.number}`}) }))
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

  visitOfTheTime(visit){
    let visits = _.filter(this.state.visits, (group) => { return group.title == visit[0].trajectory})[0].data
    const firstVisits = visits.slice(0,4)
    const firstVisitsFlatted = _.flatten(firstVisits);
    const firstVisitsIds = _.map(firstVisitsFlatted, (visit) => {return visit.id})
    const visitOfTime = firstVisitsIds.includes(visit[0].id)

    if(visitOfTime){
      return { name: 'check', color: 'green' }
    }else{
      return { name: 'directions-car' }
    }
  }

  render() {
    return(
      <View styles={styles.container}>
        <Button
          title="Atualizar"
          containerStyle={{width: '100%', marginTop: 10}}
          onPress={() => this.props.fetch()}
        />

        <Header
          backgroundColor={colors.primary}
          centerComponent={{ text: 'A Lavadeira', style: { color: '#fff', fontSize: 20 } }}
          leftComponent={<Icon color="#fff" name="menu" onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} />}
        />
        {this.props.loading &&
          <ActivityIndicator  style={styles.loading}  size="large"  color="#0000ff" />
        }
        <NestedListView
          data={this.state.visits}
          getChildrenName={(node) => 'data'}
          // onNodePressed={(node) => alert('Selected node')}
          renderNode={(node, level) => (
            <NestedRow
              level={level}
              style={styles.row}
            >
              {level==1 ? 
                (
                  <View style={{flex: 1, height: 20, width: '110%', marginLeft: -10, backgroundColor: colors.secondary}}>
                    <Text style={{marginLeft: 10}} h3>{node.title} - {level}</Text>
                  </View>
                ) :
                (
                <View style={{flex: 1, height: 500}}>
                  <ListItem
                    title={`${node['0'].address.street} - ${node['0'].address.number}`}
                    subtitle={_.compact(Object.keys(node).map((k) => node[k].id ? node[k].customer.name : null )).toString()}
                    leftIcon={this.visitOfTheTime(node)}
                    onPress={() => { navigate('Visits', {address: `${node['0'].address.cep}-${node['0'].address.number}`})}}
                    bottomDivider
                    chevron
                    />
                </View>
                )
              }
            </NestedRow>
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { visits: _.filter(state.visitReducer.visits, (visit) => { return !visit.visited }), loading: state.visitReducer.loading }
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
