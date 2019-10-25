import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { navigate } from '~/services/navigation';

// import { Container } from './styles';

class Visit extends Component {
  constructor(props){
    super(props);
    this.state = {
      visitId: props.navigation.getParam('visitId')
    }
  }
  render() {
    console.log(this.props.visit)
    return (
      <View style={styles.container}>
        <View style={styles.footerButtons}>
        <Button
          title="Outline button"
          type="outline"
        />
        <Button
          title="Outline button"
          type="outline"
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
  footerButtons: {
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
